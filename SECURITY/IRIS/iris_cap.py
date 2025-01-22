import cv2
import os
import time
import numpy as np

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video stream.")
    exit()

# Load pre-trained Haar cascades for face and eye detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Set camera exposure for better low-light capture
cap.set(cv2.CAP_PROP_EXPOSURE, -5)  # Experiment with values (-5 to 0 for exposure adjustment)

# Variables
captured_images = []
start_time = time.time()
timeout = 10  # Time window for capturing images (in seconds)
max_eye_distance = 100  # Maximum allowable distance between eyes for accurate capture

# Function to evaluate image quality (focusing on alignment and clarity)
def evaluate_image(frame, face, eyes):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    x, y, w, h = face
    eye_x_positions = [e[0] for e in eyes]
    eye_center_x = sum(eye_x_positions) / len(eye_x_positions)

    # Check if eyes are within a specified distance from the center of the face
    if abs(eye_center_x - w / 2) < max_eye_distance:
        return True
    return False

while True:
    # Read the current frame from the video stream
    ret, frame = cap.read()

    if not ret:
        print("Error: Failed to grab frame.")
        break

    # Convert to grayscale for better detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization) for better visibility in low light
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    gray = clahe.apply(gray)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    print(f"Faces detected: {len(faces)}")  # Diagnostic logging

    if len(faces) == 1:  # If exactly one face is detected
        for (x, y, w, h) in faces:
            # Draw rectangle around the face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

            # Region of interest (ROI) for eyes
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = frame[y:y + h, x:x + w]

            # Detect eyes within the face ROI
            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=5, minSize=(20, 20))

            print(f"Eyes detected: {len(eyes)}")  # Diagnostic logging

            # Capture image if exactly two eyes are detected and if the alignment is good
            if len(eyes) == 2 and evaluate_image(frame, (x, y, w, h), eyes):
                # Draw a green circle around the eyes if correctly detected
                for (ex, ey, ew, eh) in eyes:
                    center = (x + ex + ew // 2, y + ey + eh // 2)
                    cv2.circle(frame, center, 30, (0, 255, 0), 2)  # Green circle for correct alignment

                # Store the frame as an image to evaluate later
                captured_images.append(frame)
                print("Image captured and saved temporarily.")
                break

    # Display the captured frame
    cv2.imshow('Iris Capture', frame)

    # Break the loop when the 'q' key is pressed or after timeout
    if cv2.waitKey(1) & 0xFF == ord('q') or time.time() - start_time > timeout:
        break

# After the capture process, evaluate the best image based on alignment
if captured_images:
    best_image = None
    for img in captured_images:
        if evaluate_image(img, (x, y, w, h), eyes):
            best_image = img
            break

    if best_image is not None:
        # Save the best image with a unique filename
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        filename = f'iris_image_{timestamp}.jpg'
        cv2.imwrite(filename, best_image)
        print(f"Best image saved as {filename}")
    else:
        print("No good image found.")
else:
    print("No images were captured.")

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()
