from rest_framework import serializers

from api.models import Topic

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'title', 'content', 'created_at', 'updated_at')