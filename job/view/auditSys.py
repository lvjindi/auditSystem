from django.core.exceptions import ValidationError
from django.shortcuts import render

from account.decorators import office_head_required
from job.models import Job, Table, Question
from job.serializers import TableSerializer, QuestionSerializer, JobSerializer
from utils.api.api import APIView, validate_serializer


class JobPublicAPI(APIView):
    @office_head_required
    def get(self, request):
        return render(request, 'jobPublic.html')

    @office_head_required
    def post(self, request):
        try:
            data = request.data
            job = Job.objects.create(department=data['department'], position=data['position'],
                                     deadline=data['deadline'], salary=data['salary'],
                                     describe=data['describe'], requirement=data['requirement'],
                                     table_id=data['table_id'], created_by=request.user)
            return self.success(JobSerializer(job).data)
        except ValidationError as e:
            print(e)
            return self.error(msg=str(e))


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

    @office_head_required
    def get(self, request):
        table_id = request.GET.get('id')
        table = Question.objects.filter(table_id=table_id)
        return self.success(self.paginate_data(request, table, QuestionSerializer))

    @office_head_required
    def delete(self, request):
        question_id = request.GET.get('id')
        if question_id:
            Question.objects.filter(id=question_id).delete()
            return self.success()


class JobTemplate(APIView):
    def get(self, request):
        return render(request, 'jobTemplate.html')
