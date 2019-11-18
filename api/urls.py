from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'solution', views.SolutionViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'company', views.CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test/', views.new_test),
]