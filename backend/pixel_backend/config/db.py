from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["pixel_db"]   # 🔥 IMPORTANT

# collections
users_collection = db["users"]
posts_collection = db["posts"]
events_collection = db["events"]
images_collection = db["images"]
newsletters_collection = db["newsletters"]