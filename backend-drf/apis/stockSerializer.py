from rest_framework import serializers

class stockSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=10)
