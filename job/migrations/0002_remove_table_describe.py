# Generated by Django 2.2.3 on 2019-08-02 05:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='table',
            name='describe',
        ),
    ]
