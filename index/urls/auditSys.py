from django.conf.urls import url

from index.view.auditSys import IndexAPI

urlpatterns = [
    url(r"^index/?$", IndexAPI.as_view(), name="user_index_api"),

]
