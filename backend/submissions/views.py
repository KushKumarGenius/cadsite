import json

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import SignUpSubmission


def _client_ip(request):
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def _bad(msg: str, status: int = 400):
    return JsonResponse({"ok": False, "error": msg}, status=status)


@csrf_exempt
@require_POST
def ingest_signup(request):
    """
    Server-to-server only: Next.js proxies here with X-Ingest-Key.
    Never expose the ingest key to browsers.
    """
    key = request.headers.get("X-Ingest-Key", "")
    if not settings.SIGNUP_INGEST_KEY or key != settings.SIGNUP_INGEST_KEY:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return _bad("Invalid JSON")

    student_name = (data.get("studentName") or "").strip()
    parent_name = (data.get("parentName") or "").strip()
    grade = (data.get("grade") or "").strip()
    email = (data.get("email") or "").strip()
    prior_cad_knowledge = (data.get("priorCadKnowledge") or "").strip()
    why_join = (data.get("why") or "").strip()

    if len(student_name) > 200 or len(parent_name) > 200:
        return _bad("Name too long")
    if not student_name or not parent_name or not grade or not email or not why_join:
        return _bad("Missing required fields")
    try:
        validate_email(email)
    except ValidationError:
        return _bad("Invalid email")
    if len(why_join) > 8000:
        return _bad("Why join too long")
    if len(prior_cad_knowledge) > 8000:
        return _bad("Prior CAD field too long")

    SignUpSubmission.objects.create(
        student_name=student_name,
        parent_name=parent_name,
        grade=grade,
        email=email,
        prior_cad_knowledge=prior_cad_knowledge,
        why_join=why_join,
        submitted_from_ip=_client_ip(request),
    )

    return JsonResponse({"ok": True})
