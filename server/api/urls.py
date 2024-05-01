from django.urls import path

from api.views import TopicList


urlpatterns = [
    path('topics/', TopicList.as_view()),   
]