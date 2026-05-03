from django.db import models


class SignUpSubmission(models.Model):
    """Stored only in Django admin — public site never lists these."""

    student_name = models.CharField(max_length=200)
    parent_name = models.CharField(max_length=200)
    grade = models.CharField(max_length=40)
    email = models.EmailField()
    prior_cad_knowledge = models.TextField(blank=True)
    why_join = models.TextField()
    submitted_from_ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.student_name} ({self.email}) @ {self.created_at:%Y-%m-%d %H:%M}"
