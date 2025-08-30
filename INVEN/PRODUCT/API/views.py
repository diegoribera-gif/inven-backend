from rest_framework import viewsets
from PRODUCT.models import Producto
from PRODUCT.API.serializers import ProductoSerializer
from .serializers import ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer