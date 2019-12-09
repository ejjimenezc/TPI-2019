from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import *

@admin.register(Solution)
class SolutionAdmin(ImportExportModelAdmin):
    pass

@admin.register(CategoryQuestion)
class CategoryQuestionAdmin(ImportExportModelAdmin):
    pass

@admin.register(SolutionQuestion)
class SolutionQuestionAdmin(ImportExportModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(Brand)
class BrandAdmin(ImportExportModelAdmin):
    pass
