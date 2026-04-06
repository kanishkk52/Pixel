from config.db import posts_collection

def get_posts():
    posts = list(posts_collection.find())

    for post in posts:
        post["_id"] = str(post["_id"])

    return posts


def create_post(data):
    post = {
        "title": data.get("title"),
        "text": data.get("text"),
        "image": data.get("image"),
        "likes": 0,
        "comments": [],
        "created_at": None
    }

    result = posts_collection.insert_one(post)

    post["_id"] = result.inserted_id
    return post