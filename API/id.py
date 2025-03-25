#Chances of collision is rare but not impossible. So, it is better to check in the database if the id is unique or not.
#run this code and check in the database if the id is unique or not
#If it is unique then you can use this id for the new user other create a new id.
import uuid
import datetime

def generate_unique_id():
     timestamp_part = datetime.datetime.now().strftime("%y%m%d%f")[-6:]  # Last 6 digits of microseconds
     unique_part = uuid.uuid4().hex[:4].upper()  # First 4 characters of UUID
     new_id = f"DV{timestamp_part}{unique_part}"

print(generate_unique_id())
