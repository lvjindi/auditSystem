# -*- coding: utf-8 -*-

from rest_framework import serializers

from account.serializers import UserRegisterSerializer


class JobSerializer(serializers.Serializer):
    created_by = UserRegisterSerializer()
    department = serializers.CharField(max_length=2)
    position = serializers.CharField(max_length=64)
    deadline = serializers.DateTimeField()
    salary = serializers.CharField(max_length=64)
    describe = serializers.CharField(max_length=64 * 64)
    requirement = serializers.CharField(max_length=64 * 64)


class TableSerializer(serializers.Serializer):
    created_by = UserRegisterSerializer()
    title = serializers.CharField(max_length=64)


class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    table = TableSerializer()
    title = serializers.CharField(max_length=256)
    answer_type = serializers.CharField(max_length=10)
