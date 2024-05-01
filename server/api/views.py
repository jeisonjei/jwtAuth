from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from api.serializers import TopicSerializer
from rest_framework import permissions

from api.models import Topic

class TopicList(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer