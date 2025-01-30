from flask import Flask, request, jsonify, render_template_string
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)

# Load Hugging Face's Question-Answering Model
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Predefined context for the e-voting platform
# Updated Predefined Context for the e-Voting Platform
CONTEXT = """
Remote voting allows eligible Indian citizens to cast their votes online from anywhere. 
To be eligible, you must be a registered voter, at least 18 years old, and meet the platform's residency requirements. 
NRI (Non-Resident Indian) citizens can also register if they hold a valid passport.

Registration can be completed online by submitting valid identification documents, such as a government-issued ID or passport. 
You can check your registration status on the platform using your voter ID or registered email. 
Registration deadlines may vary by state, so check the official election commission website for details.

To cast your vote, log in to the platform on election day, follow the instructions, and submit your vote. 
Once submitted, your vote is encrypted and securely transmitted to ensure confidentiality. 
Votes cannot be changed after submission, and multiple voting attempts will be flagged.

The counting process is fully automated and monitored by election officials. 
Voter verification is conducted using a secure database to prevent fraud.

For accessibility, the platform supports screen readers and multilingual options to assist visually impaired and regional-language speakers.

The last date for registration is January 31, 2025. 
For more assistance, contact support@voting.gov or call 123-456-7890.
"""


# Embedded HTML for chatbot UI
INDEX_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Page</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #d4d4de;
      color: white;
      display: flex;
      flex-direction: column;
      height: 100vh; /* Ensures the chat takes full viewport height */
      overflow: hidden; /* Prevent body scrolling */
    }

    .chat-container {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex;
      gap: 15px;
      overflow-y: auto; /* Enable vertical scrolling */
      max-height: 100%; /* Prevents overflow outside the container */
      scrollbar-width: thin; /* Firefox custom scrollbar */
      scrollbar-color: #292940 #d4d4de;
    }

    .chat-container::-webkit-scrollbar {
      width: 8px; /* Scrollbar width */
    }

    .chat-container::-webkit-scrollbar-track {
      background: #d4d4de; /* Track color */
    }

    .chat-container::-webkit-scrollbar-thumb {
      background-color: #292940; /* Thumb color */
      border-radius: 10px;
      border: 2px solid #d4d4de;
    }

    .chat-bubble {
      max-width: 60%;
      padding: 15px;
      border-radius: 15px;
      line-height: 1.5;
    }

    .robot {
      align-self: flex-start;
      background-color: #292940;
      position: relative;
    }

    .robot::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #292940;
    }

    .user {
      align-self: flex-end;
      background-color: #3e3e50;
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user::before {
      content: "";
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #3e3e50;
    }

    .chat-input {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      background-color: #8282a2;
      border-top: 1px solid #21213f;
    }

    .chat-input input {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 20px;
      background-color: #292940;
      color: white;
      outline: none;
      font-size: 14px;
    }

    .chat-input .icons {
      display: flex;
      gap: 15px;
      margin-left: 15px;
    }

    .chat-input .icons img {
      width: 28px;
      height: 28px;
      cursor: pointer;
    }

    .avatar {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-message {
      text-align: right;
      background-color: #d1e7dd;
      color: #155724;
      margin: 5px 0;
      padding: 8px 12px;
      border-radius: 10px;
      display: inline-block;
    }

    .bot-message {
      text-align: left;
      background-color: #e2e3e5;
      color: #41464b;
      margin: 5px 0;
      padding: 8px 12px;
      border-radius: 10px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="chat-container" id="chat-container">
    <!-- Messages will be dynamically added here -->
  </div>

  <div class="chat-input">
    <input id="message" type="text" placeholder="Message..." onkeypress="sendMessageOnEnter(event)">
    <div class="icons">
      <img src="/static/upload.jpg" alt="Send" onclick="sendMessage()">
    </div>
  </div>

  <script>
    const chatContainer = document.getElementById("chat-container");

    function appendMessage(sender, message) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${sender}`;
        if (sender === "robot") {
            bubble.innerHTML = `
              <div class="avatar">
                <img src="/static/AI.jpg" alt="Robot Icon">
                <p>${message}</p>
              </div>`;
        } else {
            bubble.innerHTML = `
              <div class="user-avatar">
                <img src="/static/human.jpg" alt="User Icon">
              </div>
              <p>${message}</p>`;
        }
        chatContainer.appendChild(bubble);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Keep scroll at the bottom
    }

    async function sendMessage() {
    const input = document.getElementById("message");
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Append user message to chat
    appendMessage("user", userMessage);

    // Simulate bot typing
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-bubble robot";
    typingIndicator.innerHTML = `<div class="avatar">
        <img src="/static/AI.jpg" alt="Robot Icon">
        <p>Typing...</p>
    </div>`;
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        // Send message to Flask backend
        const response = await fetch("/get_response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Remove typing indicator
        chatContainer.removeChild(typingIndicator);

        // Append bot response
        appendMessage("robot", data.response);

    } catch (error) {
        console.error("Error fetching response:", error);
        chatContainer.removeChild(typingIndicator);
        appendMessage("robot", "Error: Unable to connect to the chatbot.");
    }

    // Clear input field
    input.value = "";
}


    function sendMessageOnEnter(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }
  </script>
</body>
</html>

"""

# Function to generate a chatbot response
def chatbot_response(user_input):
    try:
        print(f"User Input Received: {user_input}")  # Debug print

        # Define keyword-based responses
        responses = {
            "remote voting": "Remote voting allows eligible Indian citizens to cast their votes online from anywhere.",
            "Distant voting": "Distant voting allows eligible Indian citizens to cast their votes online from anywhere.",
            "DIGIVOTE": "DIGIVOTE platform allows eligible Indian citizens to cast their votes online from anywhere.",
            "eligibility": "To be eligible, you must be a registered voter, at least 18 years old, and meet the platform's residency requirements.",

            # Registration status checking queries (Separate from 'register')
            "check registration": "Visit the official election website and enter your voter ID to check your registration status.",
            "registration status": "To check your registration status, enter your voter ID on the online portal.",
            "am i registered": "You can verify your registration by entering your voter ID or registered email on the website.",

            # Registration-related queries
            "register": "You can register by submitting valid identification documents such as a government-issued ID or passport.",
            "registration process": "To register, submit valid identification documents such as a government-issued ID or passport.",
            "how to register": "Visit the official voting website, upload your ID, and follow the registration steps.",
        
            # Voting process
            "how to vote": "To cast your vote, log in to the platform on election day, follow the instructions, and submit your vote.",
            "vote process": "First get the DV id then Log in to the voting platform on election day and follow the provided instructions to vote.",

            # Security & confidentiality
            "security": "Once submitted, your vote is encrypted and securely transmitted to ensure confidentiality.",
            "safe": "Your vote is encrypted and securely transmitted to protect confidentiality.",

            # Important dates
            "deadline": "The last date for registration is January 31, 2025.",
            "last date": "The deadline for voter registration is January 31, 2025.",

            # Support & help
            "contact": "For more assistance, contact support@voting.gov or call 123-456-7890.",
            "support": "If you need help, reach out to support@voting.gov or call 123-456-7890.",
            "faq": "You can find more information in the FAQ section of our official voting website."
        }

        # Define greetings responses
        greetings = {
            "hello": "Hello! How can I assist you with remote voting today?",
            "hi": "Hi there! How can I help you with your voting queries?",
            "hii": "Hii there! How can I help you with your voting queries?",
            "hey": "Hey! What can I assist you with today?",
            "good morning": "Good morning! How can I help you with voting-related questions?",
            "good afternoon": "Good afternoon! What would you like to know about remote voting?",
            "good evening": "Good evening! Let me know if you have any questions about e-voting."
        }

        # Convert user input to lowercase for better matching
        user_input = user_input.lower()

        # Check for greeting responses
        for greeting, response in greetings.items():
            if greeting in user_input:
                return response

        # Check for predefined responses using keyword matching
        for keyword, response in responses.items():
            if keyword in user_input:
                return response

        # If no match, use the Hugging Face model as a fallback
        result = qa_pipeline(question=user_input, context=CONTEXT)
        print(f"Pipeline Result: {result}")  # Debug print

        if result['score'] > 0.3:
            return result['answer']
        else:
            return handle_fallback(user_input)

    except Exception as e:
        print(f"❌ Error in chatbot_response: {e}")
        return "Sorry, I couldn't process your request. Please try again later."



# Fallback handling function
def handle_fallback(user_input):
    user_input = user_input.lower()

    # Check for common fallback keywords
    if "register" in user_input or "registration" in user_input:
        return "To register, submit valid identification documents such as a government-issued ID. You can register online on our platform."

    elif "check " in user_input or "registration status" in user_input or "am i registered" in user_input:
        return "To check your registration status, enter your voter ID or registered email on the election portal."


    elif "how can i vote" in user_input or "how to vote" in user_input:
        return "To cast your vote, log in to the platform on election day and follow the instructions provided."

    elif "security" in user_input or "safe" in user_input or "secure" in user_input:
        return "Your vote is encrypted and securely transmitted to ensure confidentiality."

    elif "store" in user_input or "transparency" in user_input:
        return "Your vote is stored using Blockchain technology."


    elif "deadline" in user_input or "last date" in user_input:
        return "The last date for registration is January 31, 2025."

    elif "contact" in user_input or "support" in user_input:
        return "You can contact support at support@voting.gov or call 123-456-7890."

    else:
        return "I'm not sure how to answer that. Please check the FAQ or contact support."


# Serve the chatbot UI (index.html embedded in Python)
@app.route("/")
def index():
    return render_template_string(INDEX_HTML)

# API route for chatbot interaction
@app.route("/get_response", methods=["POST"])
def get_response():
    try:
        user_input = request.json.get("message")
        print(f"User Input from API: {user_input}")  # Debug print

        bot_response = chatbot_response(user_input)
        print(f"Bot Response Sent: {bot_response}")  # Debug print

        return jsonify({"response": bot_response})
    except Exception as e:
        print(f"❌ ERROR in get_response: {e}")  # Full error output
        return jsonify({"response": "Sorry, there was an error processing your request."})

if __name__ == "__main__":
    app.run(debug=True)
