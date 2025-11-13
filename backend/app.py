from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from flask_cors import CORS
import pandas as pd
import requests
from textblob import TextBlob
import os

# ✅ Step 1: Create Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174"]}}, supports_credentials=True)

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask backend!"})

# ✅ Step 2: Allow React frontend (CORS fix)
CORS(app, resources={r"/*": {"origins": "*"}})

# ✅ Step 3: Upload folder setup
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Step 4: Home route
@app.route('/')
def home():
    return jsonify({"message": "🚀 Flask backend is running successfully!"})


# ✅ Step 5: File upload + clean data + AI Forecast Feature
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        import numpy as np
        from sklearn.linear_model import LinearRegression

        # Read CSV
        df = pd.read_csv(filepath)
        df.dropna(inplace=True)
        df.drop_duplicates(inplace=True)
        df.reset_index(drop=True, inplace=True)

        # Save cleaned file
        cleaned_path = os.path.join(UPLOAD_FOLDER, f'cleaned_{file.filename}')
        df.to_csv(cleaned_path, index=False)

        # Basic summary
        summary = {
            'rows': len(df),
            'columns': len(df.columns),
            'columns_list': df.columns.tolist(),
            'preview': df.head(10).to_dict(orient='records')
        }

        # ✅ Step: AI Forecast Feature
        forecast_text = "AI Forecast unavailable — no numeric data found."
        trend_data = None

        try:
            numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
            if len(numeric_cols) > 0:
                col = numeric_cols[0]
                y = df[col].values
                X = np.arange(len(y)).reshape(-1, 1)

                if len(y) > 3:
                    model = LinearRegression()
                    model.fit(X, y)
                    next_val = model.predict([[len(y)]])[0]
                    trend = "increasing 📈" if next_val > y[-1] else "decreasing 📉"

                    forecast_text = (
                        f"🧠 AI Forecast Feature: Predicted next value for '{col}' "
                        f"is {next_val:.2f}, showing a {trend} trend."
                    )

                    trend_data = {
                        "labels": [f"Data {i+1}" for i in range(len(y))] + ["Predicted"],
                        "values": y.tolist() + [float(next_val)]
                    }

        except Exception as e:
            forecast_text = f"AI Forecast failed: {str(e)}"

        summary["forecast"] = forecast_text
        summary["trend_data"] = trend_data

        return jsonify({'message': 'File cleaned successfully!', 'summary': summary})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ✅ Step 6: Configure Database (for email scheduling)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emails.db'
db = SQLAlchemy(app)

# ✅ Step 7: Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'anjumshah940@gmail.com'  # your Gmail
app.config['MAIL_PASSWORD'] = 'mtdatmkazdmhbxvz'        # your app password
mail = Mail(app)


# ✅ Step 8: Email Table
class ScheduledEmail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipient = db.Column(db.String(100))
    subject = db.Column(db.String(200))
    message = db.Column(db.Text)
    scheduled_time = db.Column(db.DateTime)
    sent = db.Column(db.Boolean, default=False)


# ✅ Step 9: Create Database
with app.app_context():
    db.create_all()


# ✅ Step 10: Background Scheduler for sending emails
scheduler = BackgroundScheduler()
scheduler.start()

def send_scheduled_emails():
    with app.app_context():
        now = datetime.now()
        emails = ScheduledEmail.query.filter_by(sent=False).all()
        for email in emails:
            if email.scheduled_time <= now:
                msg = Message(email.subject, sender=app.config['MAIL_USERNAME'], recipients=[email.recipient])
                msg.body = email.message
                mail.send(msg)
                email.sent = True
                db.session.commit()
                print(f"✅ Email sent to {email.recipient}")

scheduler.add_job(func=send_scheduled_emails, trigger="interval", seconds=60)


# ✅ Step 11: API to schedule email
@app.route('/schedule', methods=['POST'])
def schedule_email():
    data = request.get_json()
    recipient = data.get('recipient')
    subject = data.get('subject')
    message = data.get('message')
    scheduled_time_str = data.get('scheduled_time')

    # Fix for React datetime input
    if "T" in scheduled_time_str:
        scheduled_time = datetime.strptime(scheduled_time_str, "%Y-%m-%dT%H:%M")
    else:
        scheduled_time = datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")

    new_email = ScheduledEmail(
        recipient=recipient,
        subject=subject,
        message=message,
        scheduled_time=scheduled_time
    )
    db.session.add(new_email)
    db.session.commit()

    return jsonify({"message": "📧 Email scheduled successfully!"})


# ✅ Step 12: Get all emails
@app.route('/emails', methods=['GET'])
def get_emails():
    emails = ScheduledEmail.query.all()
    return jsonify([{
        "recipient": e.recipient,
        "subject": e.subject,
        "message": e.message,
        "scheduled_time": e.scheduled_time.strftime("%Y-%m-%d %H:%M:%S"),
        "sent": e.sent
    } for e in emails])


# ✅ Step 13: Mental Health Chatbot (Emotion Analyzer)
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please tell me how you're feeling 💬"})

    analysis = TextBlob(user_message)
    polarity = analysis.sentiment.polarity

    if polarity > 0.5:
        reply = "😊 I'm glad to hear that! Keep spreading positivity 💫"
    elif polarity > 0:
        reply = "🙂 Sounds like things are going okay. Keep going, you're doing great!"
    elif polarity == 0:
        reply = "😐 I'm here to listen. Sometimes it helps just to talk it out."
    elif polarity > -0.5:
        reply = "😔 I'm sorry to hear that. Remember, bad days don’t define you 💛."
    else:
        reply = "💔 It seems you're feeling really low. Try talking to someone you trust or take a deep breath — you’re not alone."

    return jsonify({"reply": reply})


# ✅ Step 14: Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
