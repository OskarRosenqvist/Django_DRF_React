from jobboard.users.models import User
from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs")
    company_name = models.CharField(max_length=50)
    company_website = models.URLField()
    company_logo = models.ImageField(blank=True, null=True, upload_to="company_logos/")
    location = models.CharField(max_length=50)
    remote = models.BooleanField(default=False)
    salary = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.title
