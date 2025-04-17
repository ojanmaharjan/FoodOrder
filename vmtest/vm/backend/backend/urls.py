from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from myapp import views
router = routers.DefaultRouter()    
router.register(r'tasks',views.LoginView, 'task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # adjust 'myapp' to your actual app name
]
