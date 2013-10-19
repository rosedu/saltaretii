from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView

from django.contrib import admin
admin.autodiscover()

from frontend.api import RoutesResource

routes_resource = RoutesResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hike.views.home', name='home'),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^api/', include(routes_resource.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
