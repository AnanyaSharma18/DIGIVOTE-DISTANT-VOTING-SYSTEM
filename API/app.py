import cv2
import pytesseract
import numpy as np
import re
import requests
import tkinter as tk
from tkinter import filedialog, messagebox
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import os
import sys
import platform
import subprocess
import json

def preprocess_image(image_path):
    """Preprocess the image to improve OCR accuracy."""
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image.")
        return None

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    _, binary = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    cv2.imwrite("preprocessed_debug.png", binary)

    return binary

def extract_text(image):
    """Extract text using Tesseract OCR."""
    if image is None:
        return ""
    custom_config = r'--oem 3 --psm 6 -l eng'
    return pytesseract.image_to_string(image, config=custom_config)

def extract_pincode(text):
    """Extract 6-digit pincode."""
    match = re.search(r'\b\d{6}\b', text)
    return match.group() if match else None

def get_location_from_pincode(pincode):
    """Fetch state and district name from a pincode API."""
    url = f"https://api.postalpincode.in/pincode/{pincode}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data and data[0]['Status'] == "Success":
                post_office = data[0]['PostOffice'][0]
                return post_office['State'], post_office['District']
    except requests.RequestException as e:
        print(f"Error fetching location for pincode: {e}")
    return None, None

def get_coordinates_from_district(district_name):
    """Get latitude and longitude of a district."""
    if not district_name:
        return None, None

    geolocator = Nominatim(user_agent="district_locator", timeout=10)
    try:
        location = geolocator.geocode(f"{district_name}, India")
        if location:
            return location.latitude, location.longitude
    except Exception as e:
        print(f"Error geocoding district {district_name}: {e}")
    return None, None

def get_windows_location():
    """
    Comprehensive location detection for Windows with multiple fallback methods:
    1. Windows Location Service
    2. WMI (Windows Management Instrumentation)
    3. Registry GPS Coordinates
    4. IP-based geolocation
    """
    try:
        # Method 1: PowerShell Windows Location Service (Existing Method)
        powershell_script = '''
        Add-Type -AssemblyName System.Device
        $GeoWatcher = New-Object System.Device.Location.GeoCoordinateWatcher
        $GeoWatcher.Start()

        # Wait a few seconds for location to be determined
        Start-Sleep -Seconds 3

        if ($GeoWatcher.Status -eq 'Ready') {
            $Coordinate = $GeoWatcher.Position.Location
            @{
                Latitude = $Coordinate.Latitude
                Longitude = $Coordinate.Longitude
            } | ConvertTo-Json
        } else {
            $null
        }
        '''

        try:
            result = subprocess.run(
                ['powershell', '-Command', powershell_script], 
                capture_output=True, 
                text=True, 
                timeout=5
            )

            if result.returncode == 0:
                try:
                    location_data = json.loads(result.stdout.strip())
                    if location_data and 'Latitude' in location_data and 'Longitude' in location_data:
                        latitude = location_data['Latitude']
                        longitude = location_data['Longitude']
                        
                        print(f"Location detected via Windows Location Service:")
                        print(f"Coordinates: {latitude}, {longitude}")
                        return latitude, longitude
                except (json.JSONDecodeError, TypeError):
                    print("No location data from Windows Location Service")
        except Exception as e:
            print(f"PowerShell Location Service error: {e}")

        # Method 2: WMI Location Detection
        try:
            import wmi
            c = wmi.WMI()
            gps_locations = c.Win32_PnPEntity(PNPClass='GPS')
            
            if gps_locations:
                for location in gps_locations:
                    try:
                        # This might require specific GPS device drivers
                        latitude = location.Latitude
                        longitude = location.Longitude
                        
                        if latitude and longitude:
                            print("Location detected via WMI GPS:")
                            print(f"Coordinates: {latitude}, {longitude}")
                            return latitude, longitude
                    except Exception:
                        continue
        except ImportError:
            print("WMI module not available")
        except Exception as e:
            print(f"WMI Location detection error: {e}")

        # Method 3: Registry GPS Coordinates Check
        try:
            import winreg
            try:
                # Check specific registry keys for location data
                key_paths = [
                    (winreg.HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Location"),
                    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Location")
                ]

                for hive, path in key_paths:
                    try:
                        key = winreg.OpenKey(hive, path)
                        try:
                            latitude = float(winreg.QueryValueEx(key, "Latitude")[0])
                            longitude = float(winreg.QueryValueEx(key, "Longitude")[0])
                            
                            if latitude and longitude:
                                print("Location detected via Registry:")
                                print(f"Coordinates: {latitude}, {longitude}")
                                return latitude, longitude
                        except FileNotFoundError:
                            continue
                    except FileNotFoundError:
                        continue
            except Exception as reg_error:
                print(f"Registry location check error: {reg_error}")
        except ImportError:
            print("Windows registry access not available")

        # Method 4: IP-based geolocation (existing method)
        try:
            response = requests.get('https://ipapi.co/json/', timeout=10)
            if response.status_code == 200:
                data = response.json()
                
                latitude = data.get('latitude')
                longitude = data.get('longitude')
                
                if latitude and longitude:
                    city = data.get('city', 'Unknown')
                    region = data.get('region', 'Unknown')
                    
                    print(f"Location detected via ipapi.co: {city}, {region}")
                    print(f"Coordinates: {latitude}, {longitude}")
                    
                    return latitude, longitude
        
        except requests.RequestException as e:
            print(f"Location detection error with ipapi.co: {e}")

        # Comprehensive failure
        print("\n--- LOCATION NOT FOUND ---")
        print("Unable to detect location coordinates through multiple methods.")
        return None

    except Exception as unexpected_error:
        print(f"Unexpected error in comprehensive location detection: {unexpected_error}")
        return None

def get_accurate_location():
    """Wrapper for location detection to maintain consistent interface."""
    system = platform.system()
    
    if system == "Windows":
        return get_windows_location()
    
    # Fallback for non-Windows systems using ipapi.co
    try:
        response = requests.get('https://ipapi.co/json/', timeout=10)
        if response.status_code == 200:
            data = response.json()
            
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            
            if latitude and longitude:
                city = data.get('city', 'Unknown')
                region = data.get('region', 'Unknown')
                
                print(f"Location detected via ipapi.co: {city}, {region}")
                print(f"Coordinates: {latitude}, {longitude}")
                
                return latitude, longitude
    
    except requests.RequestException as e:
        print(f"Location detection error with ipapi.co: {e}")
    
    print("\n--- LOCATION NOT FOUND ---")
    print("Unable to detect location coordinates.")
    
    return None

def calculate_distance(coord1, coord2):
    """Calculate distance between two coordinates using geopy."""
    if None in coord1 or None in coord2:
        return None
    return geodesic(coord1, coord2).kilometers

def upload_and_extract_pincode():
    """Extracts pincode, finds district coordinates, and calculates distance."""
    root = tk.Tk()
    root.withdraw()
    
    file_path = filedialog.askopenfilename(
        title="Select an Image", 
        filetypes=[("Image Files", "*.jpg;*.jpeg;*.png;*.bmp;*.tiff")]
    )
    
    if not file_path:
        messagebox.showinfo("Info", "No file selected.")
        return

    processed_image = preprocess_image(file_path)
    if processed_image is None:
        messagebox.showerror("Error", "Image preprocessing failed.")
        return

    extracted_text = extract_text(processed_image)
    pincode = extract_pincode(extracted_text)

    if pincode:
        print(f"\nExtracted Pincode: {pincode}")
        state, district = get_location_from_pincode(pincode)
        
        if state and district:
            print(f"State: {state}")
            print(f"District: {district}")

            # Get district coordinates
            district_coords = get_coordinates_from_district(district)
            if district_coords and all(district_coords):
                print(f"Coordinates of {district}: Latitude = {district_coords[0]}, Longitude = {district_coords[1]}")
            else:
                messagebox.showwarning("Warning", f"Coordinates for {district} not found.")
                return

            # Get live location
            live_coords = get_accurate_location()
            if live_coords and all(live_coords):
                print(f"\nYour Location: Latitude = {live_coords[0]}, Longitude = {live_coords[1]}")

                # Calculate distance
                distance_km = calculate_distance(district_coords, live_coords)
                if distance_km is not None:
                    result_message = f"Distance between your location and {district}: {distance_km:.2f} km"
                    print(result_message)
                    messagebox.showinfo("Distance Calculation", result_message)
                else:
                    messagebox.showwarning("Warning", "Unable to calculate distance.")
            else:
                messagebox.showwarning("Warning", "Unable to fetch your location. Distance cannot be calculated.")
        else:
            messagebox.showwarning("Warning", "Could not determine location for the pincode.")
    else:
        messagebox.showwarning("Warning", "No valid pincode found in the image.")

# Run the function
if __name__ == "__main__":
    upload_and_extract_pincode()