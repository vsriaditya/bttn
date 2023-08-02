from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework_simplejwt import authentication

from authenti.serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import  RefreshToken


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)

            # Generate the JWT access token and refresh token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Return the access token in the response
            return Response({'access_token': access_token}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([authentication.JWTAuthentication])
def check_authentication(request):
    return Response({'message': 'Authenticated'}, status=status.HTTP_200_OK)
