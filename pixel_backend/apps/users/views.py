from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import create_user, get_users, update_username as update_username_service


# 🔐 ALLOWED DOMAINS
ALLOWED_DOMAINS = ["sait.ac.in", "saip.ac.in"]

# 🔥 ADMIN EMAILS
ADMIN_EMAILS = [
    "kanishkk52@gmail.com",
    "altatrescue@gmail.com",
    "yashadlakpc@gmail.com",
    "biku.patel45@gmail.com"
]


# 🔥 LOGIN / CREATE USER (SECURED)
@api_view(['POST'])
def login_user(request):

    email = request.data.get("email")
    name = request.data.get("name")
    picture = request.data.get("picture")

    # ❌ VALIDATION
    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        domain = email.split("@")[1]
    except:
        return Response({"error": "Invalid email format"}, status=400)

    # 🔒 ALLOW ADMIN OR DOMAIN USERS
    if email not in ADMIN_EMAILS and domain not in ALLOWED_DOMAINS:
        return Response({"error": "Unauthorized domain"}, status=403)

    # ✅ CREATE / FETCH USER
    user = create_user({
        "email": email,
        "name": name,
        "picture": picture
    })

    if not user or "error" in user:
        return Response({"error": "User creation failed"}, status=400)

    # 🔥 ADD ADMIN FLAG
    is_admin = email in ADMIN_EMAILS

    # ✅ FINAL RESPONSE
    return Response({
        "_id": str(user.get("_id")),
        "email": user.get("email"),
        "name": user.get("name"),
        "picture": user.get("picture"),
        "isAdmin": is_admin
    })


# 🔥 FETCH ALL USERS
@api_view(['GET'])
def fetch_users(request):
    return Response(get_users())


# 🔥 UPDATE USERNAME (SECURED)
@api_view(['POST'])
def update_username(request):

    email = request.data.get("email")
    username = request.data.get("username")

    # ❌ VALIDATION
    if not email or not username:
        return Response({"error": "Email and username required"}, status=400)

    if len(username.strip()) < 2:
        return Response({"error": "Username too short"}, status=400)

    # 🔒 CHECK USER EXISTS
    users = get_users()
    exists = any(u["email"] == email for u in users)

    if not exists:
        return Response({"error": "User not found"}, status=404)

    # ✅ UPDATE
    user = update_username_service(email, username)

    return Response({
        "_id": str(user.get("_id")),
        "email": user.get("email"),
        "name": user.get("name"),
        "picture": user.get("picture"),
        "isAdmin": email in ADMIN_EMAILS
    })