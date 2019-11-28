from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'solution', views.SolutionViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'company', views.CompanyViewSet)
router.register(r'QuestionTypeA', views.QuestionAViewSet)
router.register(r'QuestionTypeB', views.QuestionBViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('find_categories/', views.find_categories),
    path('best_match/', views.best_match),
]