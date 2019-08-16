# -*- coding: utf-8 -*-

from django.contrib import auth
from django.contrib.auth import login
from django.http import HttpResponseRedirect
from django.shortcuts import render

from account.models import User
from account.serializers import UserRegisterSerializer
from utils.api.api import APIView, validate_serializer


class UserLoginAPI(APIView):
    def get(self, request):
        return render(request, 'auditSys/login.html')

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect('index')
        else:
            return self.error('账户或密码错误')


class UserRegisterAPI(APIView):
    def get(self, request):
        return render(request, 'auditSys/register.html')

    @validate_serializer(UserRegisterSerializer)
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        real_name = request.POST.get('realName')
        department = request.POST.get('department')
        email = request.POST.get('email')
        if User.objects.filter(username=username).exists():
            return self.error('Username already exists')
        if User.objects.filter(email=email).exists():
            return self.error('Email already exists')
        user = User.objects.create(username=username, email=email, real_name=real_name, department=department)
        user.set_password(password)
        user.save()
        return HttpResponseRedirect('login')


class LogoutAPI(APIView):
    def get(self, request):
        auth.logout(request)
        return self.success()


class RoleAPI(APIView):
    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            data = [user.role, user.username]
            return self.success(data)
        else:
            data = [None]
            return self.success(data)
