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


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class QuestionAViewSet(viewsets.ModelViewSet):
    queryset = QuestionTypeA.objects.all()
    serializer_class = QuestionASerializer

class QuestionBViewSet(viewsets.ModelViewSet):
    queryset = QuestionTypeB.objects.all()
    serializer_class = QuestionBSerializer


@api_view(['POST'])
def find_categories(request):
    serializer = ResponseSerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(category_analysis(serializer.data), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def best_match(request):
    serializer = matchSerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(solution_analysis(serializer.data), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)