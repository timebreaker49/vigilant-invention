from django.urls import path
from . import views    
from . import activation_view
    
urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('signup/', views.UserProfileView.create_user_profile, name='signup'),
    path('getuser/', views.UserProfileView.get_user, name='getuser'),
    path('activate/<uidb64>/<token>/', activation_view.ActivationView.as_view(), name='activate'),
]