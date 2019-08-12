# -*- coding: utf-8 -*-

from rest_framework import serializers

from account.serializers import UserRegisterSerializer


class TableSerializer(serializers.Serializer):
    created_by = UserRegisterSerializer()
    title = serializers.CharField(max_length=64)


class JobSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    position = serializers.CharField(max_length=64)
    department = serializers.CharField(max_length=2)
    salary = serializers.CharField(max_length=64)
    table= TableSerializer()
    created_by = UserRegisterSerializer()
    create_time = serializers.DateTimeField()
    last_update_time = serializers.DateTimeField()

    #
    # deadline = serializers.DateTimeField()
    #
    # describe = serializers.CharField(max_length=64 * 64)
    # requirement = serializers.CharField(max_length=64 * 64)


class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    table = TableSerializer()
    title = serializers.CharField(max_length=256)
    answer_type = serializers.CharField(max_length=10)
