from django.contrib import admin

from .models import SignUpSubmission


@admin.register(SignUpSubmission)
class SignUpSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "student_name",
        "parent_name",
        "grade",
        "email",
    )
    list_filter = ("created_at", "grade")
    search_fields = ("student_name", "parent_name", "email", "why_join", "prior_cad_knowledge")
    readonly_fields = ("created_at", "submitted_from_ip")
    ordering = ("-created_at",)

    fieldsets = (
        (None, {"fields": ("student_name", "parent_name", "grade", "email")}),
        ("Responses", {"fields": ("prior_cad_knowledge", "why_join")}),
        ("Meta", {"fields": ("created_at", "submitted_from_ip")}),
    )
