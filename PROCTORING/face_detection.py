import cv2
import time

# Load Haar cascade for face and eye detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")

# Initialize video capture
cap = cv2.VideoCapture(0)
missing_face_start = None  # Track time when the face disappears

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    if len(faces) == 0:
        if missing_face_start is None:
            missing_face_start = time.time()  # Start timer if face disappears
        elif time.time() - missing_face_start > 3:  # Alert if gone for >3 sec
            cv2.putText(frame, "Face not detected!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            print("Alert: No face detected for more than 3 seconds!")
    else:
        missing_face_start = None  # Reset timer if face is detected
        print(f"Face detected: {len(faces)}")
    
    if len(faces) > 1:
        cv2.putText(frame, "Error: Multiple faces detected!", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        print("Error: Multiple faces detected!")
    
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = frame[y:y + h, x:x + w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        
        if len(eyes) > 0:
            print(f"Eyes detected: {len(eyes)}")
        
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
    
    cv2.imshow('Face Detection', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
