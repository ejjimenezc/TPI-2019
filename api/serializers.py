from rest_framework import serializers
from api.models import *
from datetime import datetime

class Response(object):
    def __init__(self, name, response):
        self.name = name
        self.response = response

class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CategoryQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryQuestion
        fields = '__all__'

class SolutionQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionQuestion
        fields = '__all__'

class ResponseSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    response = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return Response(**validated_data)
