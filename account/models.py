# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import AbstractBaseUser


# Create your models here.

class UserManager(models.Manager):
    use_in_migrations = True

    def get_by_natural_key(self, username):
        return self.get(**{"{}__iexact".format(self.model.USERNAME_FIELD): username})


class Role(object):
    SUPER_ADMIN = 'Super Admin'
    OFFICE_HEAD = 'Office Head'
    DEAN = 'Dean'
    HEADMASTER_OFFICE = 'Headmaster Office'
    SECRETARY = 'Secretary'
    DIRECTOR = 'Directory'
    APPLICANT = 'Applicant'
    REGULAR_USER = 'Regular User'


class Department(object):
    COMPUTER = '0'


class User(AbstractBaseUser):
    RoleType = (
        (Role.SUPER_ADMIN, u'超级管理员'),
        (Role.OFFICE_HEAD, u'办公室主任'),
        (Role.DEAN, u'院长'),
        (Role.HEADMASTER_OFFICE, u'校办'),
        (Role.SECRETARY, u'秘书'),
        (Role.DIRECTOR, u'主任'),
        (Role.APPLICANT, u'申请者'),
        (Role.REGULAR_USER, u'普通用户'),
    )
    DepartmentType = (
        (Department.COMPUTER, u'计算机与信息科学学院'),

    )
    username = models.CharField(unique=True, max_length=64)
    email = models.TextField()
    real_name = models.TextField()
    role = models.TextField(choices=RoleType, default='Regular User')
    department = models.TextField(choices=DepartmentType)
    is_disabled = models.BooleanField(default=True)
    create_time = models.DateTimeField(auto_now_add=True, null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def is_super_admin(self):
        return self.role == Role.SUPER_ADMIN

    def is_office_head(self):
        return self.role == Role.OFFICE_HEAD or self.role == Role.SUPER_ADMIN

    def is_dean(self):
        return self.role == Role.DEAN or self.role == Role.SUPER_ADMIN

    def is_headmaster_office(self):
        return self.role == Role.HEADMASTER_OFFICE or self.role == Role.SUPER_ADMIN

    def is_secretary(self):
        return self.role == Role.SECRETARY or self.role == Role.SUPER_ADMIN

    def is_director(self):
        return self.role == Role.DIRECTOR or self.role == Role.SUPER_ADMIN

    def is_applicant(self):
        return self.role == Role.APPLICANT or self.role == Role.SUPER_ADMIN

    class Meta:
        db_table = 'audit_sys_user'
        ordering = ['id']
