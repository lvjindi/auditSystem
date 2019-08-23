# -*- coding: utf-8 -*-
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from auditSystem import settings


class UserManager(BaseUserManager):
    use_in_migrations = True

    def get_by_natural_key(self, username):
        return self.get(**{"{}__iexact".format(self.model.USERNAME_FIELD): username})

    def create_user(self, username, email, department, real_name, password=None):
        user = User.objects.create(username=username, email=email, department_id=department, real_name=real_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password):
        # user = self.create_user(username=username, password=password, department_id=0)
        user = User.objects.create(username=username, department_id=1)
        user.set_password(password)
        user.save()
        user.is_admin = True
        user.save(using=self._db)
        return user


# Create your models here.
class Role(models.Model):
    """
    角色
    """
    name = models.CharField('名称', max_length=50)
    description = models.CharField('描述', max_length=50, default='')

    label = models.CharField('标签', max_length=50, blank=True, default='{}',
                             help_text='因为角色信息也可能是从别处同步过来， 为保证对应关系，同步时可以在此字段设置其他系统中相应的唯一标识,字典的json格式')
    create_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_update_time = models.DateTimeField('更新时间', auto_now=True)
    is_deleted = models.BooleanField('已删除', default=False)

    class Meta:
        db_table = 'audit_sys_role'


class Department(models.Model):
    """
    部门
    """
    name = models.CharField('名称', max_length=50, help_text='部门名称')
    parent_dept_id = models.IntegerField('上级部门id', blank=True, default=0)
    # leader = models.CharField('部门leader', max_length=50, blank=True, default='', help_text='部门的leader, loonuser表中的用户名')
    # approver = models.CharField('审批人', max_length=100, blank=True, default='',
    #                             help_text='loonuser表中的用户名, 逗号隔开多个user。当工作流设置为leader审批时， 优先以审批人为准，如果审批人为空，则取leader')
    label = models.CharField('标签', max_length=50, blank=True, default='',
                             help_text='因为部门信息一般是从别处同步过来， 为保证对应关系，同步时可以在此字段设置其他系统中相应的唯一标识')

    create_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_update_time = models.DateTimeField('更新时间', auto_now=True)
    is_deleted = models.BooleanField('已删除', default=False)

    class Meta:
        db_table = 'audit_sys_department'

    def __str__(self):
        return self.name


class User(AbstractBaseUser):
    username = models.CharField(unique=True, max_length=64)
    email = models.TextField()
    real_name = models.TextField()
    role = models.ForeignKey(Role, on_delete=None, default=1)
    department = models.ForeignKey(Department, on_delete=None)
    is_disabled = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    create_time = models.DateTimeField(auto_now_add=True, null=True)
    last_update_time = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()

    @property
    def is_staff(self):
        return self.is_active

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_perms(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def is_super_admin(self):
        return self.role.name == 'Super Admin'

    def is_office_head(self):
        return self.role.name == 'Office Head' or self.role.name == 'Super Admin'

    def is_dean(self):
        return self.role.name == 'Dean' or self.role.name == 'Super Admin'

    def is_headmaster_office(self):
        return self.role.name == 'Headmaster Office' or self.role.name == 'Super Admin'

    def is_secretary(self):
        return self.role.name == 'Secretary' or self.role.name == 'Super Admin'

    def is_director(self):
        return self.role.name == 'Directory' or self.role.name == 'Super Admin'

    def is_applicant(self):
        return self.role.name == 'Applicant' or self.role.name == 'Super Admin'

    class Meta:
        db_table = 'audit_sys_user'
        ordering = ['id']

    def __str__(self):
        return self.username
