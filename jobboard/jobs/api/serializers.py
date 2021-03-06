from jobboard.jobs.models import Job
from rest_framework import serializers


class JobSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()

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
            'sponsored',
            'is_owner',

        )
        read_only_fields = (
            'id',
            'date_created',
            'user',
        )

    def get_is_owner(self, obj):
        user = self.context["request"].user
        return obj.user == user
