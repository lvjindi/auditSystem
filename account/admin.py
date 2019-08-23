from django.contrib import admin

# Register your models here.
from account.models import User, Department, Role


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'real_name', 'role_id', 'department_id', 'is_disabled', 'create_time',
        'last_update_time')


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent_dept_id', 'label', 'create_time', 'last_update_time')


class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'create_time', 'last_update_time')


admin.site.register(User, UserAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Role, RoleAdmin)
