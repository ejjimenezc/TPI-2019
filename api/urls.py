from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'solution', views.SolutionViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'brand', views.BrandViewSet)
router.register(r'CategoryQuestion', views.QuestionAViewSet)
router.register(r'SolutionQuestion', views.QuestionBViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('find_categories/', views.find_categories),
    path('best_match/', views.best_match),
]