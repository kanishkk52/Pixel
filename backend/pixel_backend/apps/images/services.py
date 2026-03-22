from config.db import images_collection

def add_image(data):
    image = {
        "event_id": data.get("event_id"),
        "url": data.get("url"),
        "uploaded_by": data.get("uploaded_by")
    }

    result = images_collection.insert_one(image)
    image["_id"] = result.inserted_id
    return image


def get_images(event_id):
    images = list(images_collection.find({"event_id": event_id}))

    for img in images:
        img["_id"] = str(img["_id"])

    return images