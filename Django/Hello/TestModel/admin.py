from django.contrib import admin

# Register your models here.

from TestModel.models import Test
 

class Testadmin(admin.ModelAdmin):
    list_display = ('name', 'age','time','when')
# Register your models here.
admin.site.register(Test,Testadmin)



