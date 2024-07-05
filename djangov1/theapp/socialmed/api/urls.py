from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserView, LogoutView, RefreshView
#from .views import login_view

#login_router = DefaultRouter()
#login_router.register('login', LoginInfoViewSet, basename='login')

# Include the router's URLs into the urlpatterns
urlpatterns = [
    #path('', include(login_router.urls)),
 #   path('verify/', login_view, name='verify'),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('refresh/', RefreshView.as_view())
]

