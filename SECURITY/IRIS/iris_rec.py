import cv2
import time

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video stream.")
    exit()

# Load pre-trained Haar cascades for face and eye detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Set camera exposure for better low-light capture (values may vary per camera)
cap.set(cv2.CAP_PROP_EXPOSURE, -5)

# Variables
start_time = time.time()
timeout = 10  # Time window for capturing images (in seconds)

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

    print(f"Faces detected: {len(faces)}")  # Log the number of detected faces

    if len(faces) == 1:  # If exactly one face is detected
        for (x, y, w, h) in faces:
            # Draw rectangle around the face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

            # Region of interest (ROI) for eyes
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = frame[y:y + h, x:x + w]

            # Detect eyes within the face ROI
            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=5, minSize=(20, 20))

            print(f"Eyes detected: {len(eyes)}")  # Log the number of detected eyes

            # Capture image if exactly two eyes are detected
            if len(eyes) == 2:
                # Draw green circles around the eyes
                for (ex, ey, ew, eh) in eyes:
                    center = (x + ex + ew // 2, y + ey + eh // 2)
                    cv2.circle(frame, center, 30, (0, 255, 0), 2)

                # Save the image with a timestamp
                timestamp = time.strftime("%Y%m%d_%H%M%S")
                filename = f'iris_image_{timestamp}.jpg'
                cv2.imwrite(filename, frame)  # Save the image
                print(f"Image captured and saved as {filename}")

                # Exit the loop after capturing the image
                break

    # Display the frame
    cv2.imshow('Iris Capture', frame)

    # Break the loop when 'q' is pressed or after timeout
    if cv2.waitKey(1) & 0xFF == ord('q') or time.time() - start_time > timeout:
        break

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()
