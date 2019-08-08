from django.conf.urls import url

from account.view.auditSys import UserLoginAPI, UserRegisterAPI, RoleAPI, LogoutAPI

urlpatterns = [
    url(r"^login/?$", UserLoginAPI.as_view(), name="user_login_api"),
    url(r"^register/?$", UserRegisterAPI.as_view(), name="user_register_api"),
    url(r"^logout/?$", LogoutAPI.as_view(), name="user_logout_api"),
    url(r"^role/?$", RoleAPI.as_view(), name="user_role_api"),
]
