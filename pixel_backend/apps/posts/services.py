from config.db import posts_collection, fs
from bson import ObjectId
from datetime import datetime


# 🔥 GET POSTS
def get_posts():
    posts = list(posts_collection.find())

    result = []

    for post in posts:
        file_id = post.get("file_id")

        result.append({
            "_id": str(post["_id"]),
            "title": post.get("title"),
            "text": post.get("text"),

            # 🔥 FIXED URL
            "image_url": f"http://127.0.0.1:8000/api/images/file/{file_id}/" if file_id else None,

            "likes": post.get("likes", 0),
            "comments": post.get("comments", []),
            "created_at": post.get("created_at")
        })

    return result


# 🔥 CREATE POST
def create_post(file, data):
    try:
        file_id = None

        if file:
            file_bytes = file.read()

            file_id = fs.put(
                file_bytes,
                filename=file.name,
                content_type=file.content_type
            )

        post = {
            "title": data.get("title"),
            "text": data.get("caption"),   # keep your mapping
            "file_id": str(file_id) if file_id else None,
            "likes": 0,
            "comments": [],
            "created_at": datetime.utcnow()
        }

        result = posts_collection.insert_one(post)

        post["_id"] = str(result.inserted_id)

        return post

    except Exception as e:
        print("❌ Create post error:", e)
        return None


# 🔥 DELETE POST (NEW)
def delete_post(post_id):
    try:
        post = posts_collection.find_one({"_id": ObjectId(post_id)})

        if not post:
            return False

        # 🔥 DELETE IMAGE FROM GRIDFS
        if post.get("file_id"):
            try:
                fs.delete(ObjectId(post["file_id"]))
            except Exception as e:
                print("GridFS delete error:", e)

        # 🔥 DELETE FROM DB
        posts_collection.delete_one({"_id": ObjectId(post_id)})

        return True

    except Exception as e:
        print("❌ Delete post error:", e)
        return False