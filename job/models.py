from django.db import models

# Create your models here.
from account.models import Department, User


class AnswerCategory(object):
    FILE = 'File'
    IMAGE = 'Image'
    TEXT = 'Text'
    TEXT_AREA = 'Text Area'


class Table(models.Model):
    created_by = models.ForeignKey(User, on_delete=None, null=True)
    title = models.TextField(null=True)
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'audit_sys_table'


class Job(models.Model):
    DepartmentType = (
        (Department.COMPUTER, u'计算机与信息科学学院'),
    )
    created_by = models.ForeignKey(User, on_delete=None)
    department = models.TextField(choices=DepartmentType)
    position = models.TextField()
    deadline = models.DateTimeField(null=True)
    salary = models.TextField(null=True)
    describe = models.TextField(null=True)
    requirement = models.TextField(null=True)
    table = models.OneToOneField(Table, on_delete=models.CASCADE, null=True)
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'audit_sys_job'


class Question(models.Model):
    AnswerType = (
        (AnswerCategory.FILE, u'文件'),
        (AnswerCategory.IMAGE, u'图片'),
        (AnswerCategory.TEXT, u'单项输入'),
        (AnswerCategory.TEXT_AREA, u'矩阵输入'),
    )
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    title = models.TextField()
    answer_type = models.TextField(choices=AnswerType)
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'audit_sys_question'


class Answer(models.Model):
    applicant = models.ForeignKey(User, on_delete=None)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'audit_sys_answer'
