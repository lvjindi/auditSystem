from django.shortcuts import render

from utils.api.api import APIView


class IndexAPI(APIView):
    def get(self, request):
        return render(request, 'index.html')
