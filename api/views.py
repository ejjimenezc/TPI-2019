from api.models import *
from api.serializers import *
from rest_framework import viewsets,status
from rest_framework.decorators import api_view
from rest_framework.response import Response


class SolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


@api_view(['POST'])
def new_test(request):
    print("Data: ",request.data)
    serializer = ResponseSerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(test_analysis(serializer.data), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)