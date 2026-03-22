from config.db import users_collection

def create_user(data):
    user = {
        "name": data.get("name"),
        "email": data.get("email"),
        "picture": data.get("picture"),
        "domain": data.get("domain")
    }

    existing = users_collection.find_one({"email": user["email"]})

    if existing:
        existing["_id"] = str(existing["_id"])
        return existing

    result = users_collection.insert_one(user)
    user["_id"] = result.inserted_id
    return user


def get_users():
    users = list(users_collection.find())

    for user in users:
        user["_id"] = str(user["_id"])

    return users