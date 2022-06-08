from jobboard.jobs.models import Job
from rest_framework import serializers


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            'id',
            'title',
            'company_name',
            'company_website',
            'company_logo',
            'location',
            'remote',
            'salary',
            'date_created',
            'user',
            'available',

        )
        read_only_fields = (
            'id',
            'date_created',
            'user',
        )
