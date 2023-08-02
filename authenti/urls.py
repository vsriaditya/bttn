from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.user_login, name='login'),
    path('api/check-authentication/', views.check_authentication, name='auth'),
]
