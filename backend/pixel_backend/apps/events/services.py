from config.db import events_collection

def create_event(data):
    event = {
        "id": data.get("id"),
        "name": data.get("name"),
        "cover": data.get("cover")
    }

    result = events_collection.insert_one(event)
    event["_id"] = result.inserted_id
    return event


def get_events():
    events = list(events_collection.find())

    for event in events:
        event["_id"] = str(event["_id"])

    return events