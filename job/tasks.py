from celery.task import task
from django.http import HttpResponse
import time

from job.models import Job


@task()
def changeStatus(id, dealyTime):
    print(dealyTime.seconds)
    time.sleep(dealyTime.seconds)
    try:
        job = Job.objects.get(id=id)
    except Job.DoesNotExist:
        return HttpResponse({"error": "Job does not exist!", "data": ""})
    job.status = False
    job.save()
    return True
