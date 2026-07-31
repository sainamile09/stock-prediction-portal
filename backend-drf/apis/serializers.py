from rest_framework import serializers

class stockSerializer(serializers.ModelSerializer):
    ticker = serializers.CharField(max_length=20)
