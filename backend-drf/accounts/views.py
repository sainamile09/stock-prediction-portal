from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.permissions import AllowAny
from accounts.Serializers import UserSerializers
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView 
from rest_framework.response import Response


# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        response={
            'status':'Request was Permitted'
        }
        return Response(response)
