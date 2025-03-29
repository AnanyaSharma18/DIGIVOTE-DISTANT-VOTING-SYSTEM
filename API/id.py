import uuid
import datetime

def generate_unique_id():
    timestamp_part = datetime.datetime.now().strftime("%y%m%d%f")[-6:]  # Last 6 digits of microseconds
    unique_part = uuid.uuid4().hex[:4].upper()  # First 4 characters of UUID
    new_id = f"DV{timestamp_part}{unique_part}"
    return new_id  # Return the generated ID

print(generate_unique_id())  
