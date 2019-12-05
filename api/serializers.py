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


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class QuestionASerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeA
        fields = '__all__'

class QuestionBSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeB
        fields = '__all__'

class ResponseSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    response = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return Response(**validated_data)


class matchSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    response = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return Response(**validated_data)