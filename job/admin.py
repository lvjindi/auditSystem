from django.contrib import admin

# Register your models here.
from job.models import Job, Table, Question, Answer


class JobAdmin(admin.ModelAdmin):
    list_display = (
        'department', 'position', 'table_id', 'deadline', 'salary', 'status', 'account', 'create_time',
        'last_update_time',
        'created_by')
    ordering = ('-id',)
    search_fields = ('department',)
    actions_on_top = True
    list_per_page = 30


class TableAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'create_time', 'last_update_time')
    list_per_page = 30
    ordering = ('-id',)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'answer_type', 'table_id', 'create_time', 'last_update_time')
    list_per_page = 30
    ordering = ('-id',)


admin.site.register(Job, JobAdmin)
admin.site.register(Table, TableAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
