from django.conf.urls import url

from job.view.auditSys import JobPublicAPI, TableAPI, TableNameAPI, CreateTableAPI, QuestionAPI, JobTemplate

urlpatterns = [
    url(r"^jobPublic/?$", JobPublicAPI.as_view(), name="job_public_api"),
    url(r"^tableName/?$", TableNameAPI.as_view(), name="table_name_api"),
    url(r"^table/?$", TableAPI.as_view(), name="table_api"),
    url(r"^createTable/?$", CreateTableAPI.as_view(), name="create_table_api"),
    url(r"^question/?$", QuestionAPI.as_view(), name="question_api"),
    url(r"^jobTemplate/?$", JobTemplate.as_view(), name="job_template_api"),
]
