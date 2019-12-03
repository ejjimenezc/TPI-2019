from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import *

@admin.register(Solution)
class SolutionAdmin(ImportExportModelAdmin):
    pass

@admin.register(QuestionTypeA)
class QuestionTypeAAdmin(ImportExportModelAdmin):
    pass

@admin.register(QuestionTypeB)
class QuestionTypeBAdmin(ImportExportModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(Company)
class CompanyAdmin(ImportExportModelAdmin):
    pass
