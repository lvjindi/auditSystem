from django.conf.urls import url

from job.view.auditSys import JobPublicAPI, TableAPI, TableNameAPI, CreateTableAPI, QuestionAPI, \
    JobManagementAPI, JobAPI, TableTemplate, JobTemplate

urlpatterns = [
    url(r"^jobPublic/?$", JobPublicAPI.as_view(), name="job_public_api"),
    url(r"^tableName/?$", TableNameAPI.as_view(), name="table_name_api"),
    url(r"^table/?$", TableAPI.as_view(), name="table_api"),
    url(r"^createTable/?$", CreateTableAPI.as_view(), name="create_table_api"),
    url(r"^question/?$", QuestionAPI.as_view(), name="question_api"),
    url(r"^tableTemplate/?$", TableTemplate.as_view(), name="table_template_api"),
    url(r"^jobTemplate/?$", JobTemplate.as_view(), name="job_template_api"),
    url(r"^jobManagement/?$", JobManagementAPI.as_view(), name="job_management_api"),
    url(r"^job/?$", JobAPI.as_view(), name="job_api"),
]
