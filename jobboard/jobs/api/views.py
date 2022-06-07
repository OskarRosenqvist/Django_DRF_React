from jobboard.jobs.models import Job
from jobboard.jobs.api.serializers import JobSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
# from rest_framework.permissions import AllowAny


class JobListView(ListAPIView):
    # queryset = Job.objects.all()
    serializer_class = JobSerializer
    # permission_classes = (AllowAny, )

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobCreateView(CreateAPIView):
    serializer_class = JobSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobUpdateView(UpdateAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)
