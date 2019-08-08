from django.conf.urls import url
from django.views.static import serve

from auditSystem.settings import FILE_ROOT

urlpatterns = [
    # 处理 media 信息，用于图片获取
    url(r'^static/media/uploadFile/(?P<path>.*)$', serve, {"document_root": FILE_ROOT}),
]
