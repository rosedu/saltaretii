# myapp/api.py
from tastypie.resources import ModelResource, ALL
from frontend.models import Route


class RoutesResource(ModelResource):
    class Meta:
        queryset = Route.objects.all()
        resource_name = 'routes'
        list_allowed_methods = ['get', 'post']
        filtering = {
            'end': ALL,
            'start': ALL,
            'routes': ALL,
        }
