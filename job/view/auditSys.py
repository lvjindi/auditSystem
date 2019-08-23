from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.blocking import BlockingScheduler
from django.utils.datetime_safe import datetime
from django.core.exceptions import ValidationError

from django.shortcuts import render
from django.utils import timezone

from account.decorators import office_head_required, login_required
from job.models import Job, Table, Question
from job.serializers import TableSerializer, QuestionSerializer, JobSerializer
from job.tasks import changeStatus
from utils.api.api import APIView, validate_serializer


class JobManagementAPI(APIView):
    def get(self, request):
        return render(request, 'jobManagement.html')


class JobPublicAPI(APIView):
    @office_head_required
    def get(self, request):
        return render(request, 'jobPublic.html')


class JobAPI(APIView):

    def get(self, request):
        id = request.GET.get('id')
        if id:
            try:
                job = Job.objects.get(id=id, is_deleted=False)
                job.department = job.get_department_display()
                job.status = job.get_status_display()
                job.deadline = job.deadline.strftime('%Y-%m-%d %H:%m')
                job.create_time = job.create_time.strftime('%Y-%m-%d %H:%m')
                job.last_update_time = job.last_update_time.strftime('%Y-%m-%d %H:%m')
                return self.success(JobSerializer(job).data)
            except Job.DoesNotExist:
                return self.error("Job does not exist")
        else:
            if request.user.is_authenticated:
                if request.user.role == 'Office Head':
                    job = Job.objects.filter(created_by=request.user, is_deleted=False).order_by('-id')

                else:
                    job = Job.objects.filter(is_deleted=False).order_by('-id')
            else:
                job = Job.objects.filter(is_deleted=False).order_by('-id')

            for item in job:
                # item.department = item.get_department_display()
                item.status = item.get_status_display()
                if item.deadline != None:
                    item.deadline = item.deadline.strftime('%Y-%m-%d %H:%M')
                item.create_time = item.create_time.strftime('%Y-%m-%d %H:%M')
                item.last_update_time = item.last_update_time.strftime('%Y-%m-%d %H:%M')
            return self.success(self.paginate_data(request, job, JobSerializer))

    @office_head_required
    def post(self, request):
        try:
            data = request.data
            """ BlockingScheduler 阻塞式调度器
                BackgroundScheduler 后台调度器
            """

            create_time = datetime.now()
            "deadline为''时，不执行定时任务"
            if data['deadline'] != '':
                deadline = datetime.strptime(data['deadline'].replace('T', ' '), '%Y-%m-%d %H:%M')
                if str(create_time) > data['deadline']:
                    raise ValidationError("任务截至时间不能早于当前时间")
                else:
                    job = Job.objects.create(department_id=data['department'], position=data['position'],
                                             deadline=data['deadline'], salary=data['salary'],
                                             describe=data['describe'], requirement=data['requirement'],
                                             other=data['other'],
                                             table_id=data['table_id'], created_by=request.user)
                    sched = BackgroundScheduler()
                    task = sched.add_job(self.change_job_status, 'date', run_date=deadline, args=[job.id])
                    sched.start()
                    job.task_id = task.id
                    job.save()
                    print(task.id)
            else:
                job = Job.objects.create(department_id=data['department'], position=data['position'],
                                         deadline=None, salary=data['salary'],
                                         describe=data['describe'], requirement=data['requirement'],
                                         other=data['other'],
                                         table_id=data['table_id'], created_by=request.user)
            return self.success(JobSerializer(job).data)

        except ValidationError as e:
            print(e)
            return self.error(msg=str(e))

    def change_job_status(self, id):
        print('start')
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return self.error("Job does not exist!")
        job.status = True
        job.save()

    @office_head_required
    def put(self, request):
        try:
            data = request.data
            job_id = request.GET.get('id')
            if job_id:
                try:
                    job = Job.objects.get(id=job_id)
                except Job.DoesNotExist:
                    return self.error("Job does not exist")
            for k, v in data.items():
                setattr(job, k, v)
            job.save()
            if job.task_id != '':
                pass
            return self.success(JobSerializer(job).data)
        except Exception as e:
            return self.error("error")

    @office_head_required
    def delete(self, request):
        job_id = request.GET.get('id')
        if job_id:
            try:
                job = Job.objects.get(id=job_id)
                table = Table.objects.get(id=job.table_id)
                question = Question.objects.filter(table=table.id)
                setattr(table, "is_deleted", True)
                question.update(is_deleted=True)
                setattr(job, "is_deleted", True)
                table.save()
                job.save()
                return self.success()
            except Job.DoesNotExist:
                return self.error("Job does not exist")


class TableNameAPI(APIView):
    @office_head_required
    def get(self, request):
        return render(request, 'tableName.html')


class TableAPI(APIView):
    @office_head_required
    def get(self, request):
        table_id = request.GET.get('id')
        if table_id:
            try:
                table = Table.objects.get(id=table_id)
                return self.success(TableSerializer(table).data)
            except Table.DoesNotExist:
                return self.error("表格不存在")
        else:
            table = Table.objects.all()
            return self.success(self.paginate_data(request, table, TableSerializer))

    @office_head_required
    def post(self, request):
        title = request.POST.get('title')
        table = Table.objects.create(title=title, created_by=request.user)
        table.save()
        return self.success(table.id)


class CreateTableAPI(APIView):
    @office_head_required
    def get(self, request):
        return render(request, 'createTable.html')


class QuestionAPI(APIView):
    @office_head_required
    # @validate_serializer(QuestionSerializer)
    def post(self, request):
        id = request.POST.get('id')
        type = request.POST.get('type')
        title = request.POST.get('title')
        try:
            question = Question.objects.create(table_id=id, answer_type=type, title=title)
            return self.success(QuestionSerializer(question).data)
        except Exception:
            return self.error("Error")

    @office_head_required
    # @validate_serializer(QuestionSerializer)
    def put(self, request):
        data = request.data
        try:
            question = Question.objects.get(id=data['id'])
            setattr(question, 'answer_type', data['type'])
            setattr(question, 'title', data['title'])
            question.save()
            return self.success(QuestionSerializer(question).data)
        except Question.DoesNotExist:
            return self.error('Question does not exist')
        except Exception:
            return self.error("Error")

    @login_required
    def get(self, request):
        table_id = request.GET.get('id')

        table = Question.objects.filter(table_id=table_id, is_deleted=False)
        return self.success(self.paginate_data(request, table, QuestionSerializer))

    @office_head_required
    def delete(self, request):
        question_id = request.GET.get('id')
        if question_id:
            question = Question.objects.filter(id=question_id)
            question.update(is_deleted=True)
            return self.success()


class TableTemplate(APIView):
    def get(self, request):
        return render(request, 'tableTemplate.html')


class JobTemplate(APIView):
    def get(self, request):
        id = request.GET.get('id')
        try:
            job = Job.objects.get(id=id)
            job.account = job.account + 1
            job.save()
            return render(request, 'jobTemplate.html')
        except Job.DoesNotExist:
            return self.error("Job does not exist")
