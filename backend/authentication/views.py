from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import UserProfileSerializer
from .models import UserProfile
from .activation_view import ActivationView

class HomeView(APIView):
    
    # permission_classes = (IsAuthenticated, ) -- can use to block requests
    def get(self, request):
        content = {
            'message': 'Welcome to the JWT Authentication page with Django + React!'
        }
        
        return Response(content)        

class LogoutView(APIView):
    
    # permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        print(request.data)
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(viewsets.ModelViewSet):    
    
    @csrf_exempt
    @api_view(['POST'])
    def create_user_profile(request):
        user = User.objects.create_user(
            username=request.data['username'], 
            email=request.data['email'], 
            password=request.data['password'])
        user.set_password(request.data['password'])
        user.is_active = False
        user.save()
        ActivationView._send_email_verification(request, user)
        return Response(status=status.HTTP_201_CREATED)

    @csrf_exempt
    @api_view(['POST'])
    def get_user_profile(request):
        user = User.objects.get(username=request.data['username'])
        profile = UserProfile.objects.get(user=user.id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    
    