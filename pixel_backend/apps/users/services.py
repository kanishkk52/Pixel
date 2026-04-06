from config.db import users_collection


# 🔥 CREATE / LOGIN USER
def create_user(data):

    email = data.get("email")

    # ❌ BLOCK INVALID REQUEST
    if not email:
        return {"error": "Email required"}

    existing = users_collection.find_one({"email": email})

    if existing:
        existing["_id"] = str(existing["_id"])
        return existing

    user = {
        "name": "",
        "email": email,
        "picture": data.get("picture"),
        "domain": data.get("domain"),
        "ring": data.get("ring", "")
    }

    result = users_collection.insert_one(user)
    user["_id"] = str(result.inserted_id)

    return user

# 🔥 GET ALL USERS
def get_users():
    users = list(users_collection.find())

    for user in users:
        user["_id"] = str(user["_id"])

    return users


# 🔥 UPDATE USERNAME (NEW)
def update_username(email, username):

    users_collection.update_one(
        {"email": email},
        {"$set": {"name": username}}
    )

    user = users_collection.find_one({"email": email})

    if user:
        user["_id"] = str(user["_id"])

    return user