from django.conf import settings
from jobboard.jobs.models import Job
from jobboard.jobs.api.serializers import JobSerializer
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class JobListView(ListAPIView):
    # queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobCreateView(CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobDetailview(RetrieveAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.all()


class JobUpdateView(UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobDeleteView(DestroyAPIView):
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.all()
