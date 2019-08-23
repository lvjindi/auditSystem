# -*- coding: utf-8 -*-

from rest_framework import serializers


class UserRegisterSerializer(serializers.Serializer):
    # id = serializers.IntegerField()
    username = serializers.CharField(max_length=16)
    password = serializers.CharField(min_length=8)
    email = serializers.EmailField(max_length=64)
    real_name = serializers.CharField(max_length=200)
    department = serializers.CharField(max_length=2)


class DepartmentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=32)
