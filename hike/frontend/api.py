# myapp/api.py
from tastypie.resources import ModelResource
from frontend.models import Route


class RoutesResource(ModelResource):
    class Meta:
        queryset = Route.objects.all()
        resource_name = 'routes'
