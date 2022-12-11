from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView

class TestView(APIView):

    def get(self, request, format=None):
        return Response({"hello": "world"})


