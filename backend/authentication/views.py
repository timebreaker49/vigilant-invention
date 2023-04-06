from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

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
        
class UserProfileView(APIView):
    
    @csrf_exempt
    @api_view(['POST'])
    def create_user_profile(request):
        user = User.objects.create_user(
            username=request.data['username'], 
            email=request.data['email'], 
            password=request.data['password'])
        user.set_password(request.data['password'])
        user.save()
        return Response(status=status.HTTP_201_CREATED)