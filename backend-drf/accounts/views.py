from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.permissions import AllowAny
from accounts.Serializers import UserSerializers
from django.contrib.auth.models import User


# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]
