import stripe
import datetime
from django.conf import settings
from rest_framework.response import Response
# Stripe webhook imports
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.http import HttpResponse
# ----------------------
from jobboard.jobs.models import Job, SponsoredJobPost
from jobboard.jobs.api.serializers import JobSerializer
from jobboard.jobs.api.permissions import IsJobOwner
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


stripe.api_key = settings.STRIPE_SECRET_KEY


class JobListView(ListAPIView):
    # queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        return Job.objects.filter(available=True).order_by("-date_created")


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
    permission_classes = (IsAuthenticated, IsJobOwner)

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, IsJobOwner)

    def get_queryset(self):
        return Job.objects.all()


class SponsoredJobCountView(APIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        job_count = Job.objects.filter(available=True, sponsored=True).count()
        return Response({"job_count": job_count})


class CreatePaymentView(APIView):
    permission_classes = (IsAuthenticated, IsJobOwner)

    def post(self, request, *args, **kwargs):
        try:
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=10000,  # 100 usd
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
                metadata={
                    'job_id': request.data["job_id"],
                },
            )
            return Response({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return Response({"error": str(e)}, status=403)


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        pass
        # session = event['data']['object']
        # customer_email = session["customer_details"]["email"]
        # line_items = stripe.checkout.Session.list_line_items(session["id"])
        #
        # stripe_price_id = line_items["data"][0]["price"]["id"]
        # price = Price.objects.get(stripe_price_id=stripe_price_id)
        # product = price.product
        #
        # send_mail(
        #     subject="Here is your product",
        #     message=f"Thanks for your purchase. The URL is: {product.url}",
        #     recipient_list=[customer_email],
        #     from_email="your@email.com"
        # )

    elif event["type"] == "payment_intent.succeeded":
        intent = event['data']['object']

        # stripe_customer_id = intent["customer"]
        # stripe_customer = stripe.Customer.retrieve(stripe_customer_id)
        # customer_email = stripe_customer['email']
        # price_id = intent["metadata"]["price_id"]
        job_id = intent["metadata"]["job_id"]

        job = Job.objects.get(id=job_id)
        job.sponsored = True
        job.save()
        SponsoredJobPost.objects.create(
            job=job,
            date_until=datetime.date.today() + datetime.timedelta(days=7),
            stripe_payment_intent_id=intent["id"],
        )
        send_mail(
            subject="Your sponsored job post",
            message=f"Thanks for your purchase. Your job: {job.title} is now sponsored.",
            recipient_list=[job.user.email],
            from_email="your@email.com"
        )

    return HttpResponse(status=200)
