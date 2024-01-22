from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from backend import views

urlpatterns = [
    path("token/",views.MyTokenObtainPairView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view()),
    path("testapi/", views.testAPIEndPoint, name="test"),
    path("dashboard",views.dashboard)
]