from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from functions import encode_file_to_base64, analyze_resume, check_answer_with_gamini

# הגדרת Flask
app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route("/create_interview", methods=["POST"])
def create_interview():
    """
    הורדת קובץ מ-AWS, ניתוחו באמצעות Gemini, והחזרת 10 שאלות.
    """
    print("create_interview")
    
    data = request.json
    resume_url = data.get("resume_url")  # URL של קובץ ה-AWS
  
    if not resume_url:
        return jsonify({"error": "No resume URL provided"}), 400

    temp_path = "temp_resume.pdf"

    try:
        # הורדת הקובץ מ-AWS
        response = requests.get(resume_url)
        if response.status_code != 200:
            return jsonify({"error": f"Failed to download the resume file. Status code: {response.status_code}"}), 500

        # שמירת הקובץ באופן זמני
        with open(temp_path, "wb") as file:
            file.write(response.content)

        # ניתוח הקובץ באמצעות Gemini
        questions = analyze_resume(temp_path)

        # החזרת התוצאה
        return jsonify({"questions": questions}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        # מחיקת הקובץ הזמני
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.route("/check_answer", methods=["POST"])
def check_answer():
    data = request.json
    question = data.get('Question')
    answer = data.get('Answer')
    
    if not question or not answer:
        return jsonify({"error": "Question and answer must be provided"}), 400

    result = check_answer_with_gamini(question, answer)
    print("check_answer--------------")
    print(result)
    return result, 200


@app.route("/result_of_interview", methods=["POST"])
def result_of_interview():
    """
    Calculate the overall result of the interview using Gemini.
    """
    data = request.json
    feedback_list = data.get("feedback_list")  # List of feedback strings

    if not feedback_list or not isinstance(feedback_list, list):
        return jsonify({"error": "Feedback list must be provided as a list"}), 400

    # Prepare the prompt for Gemini
    prompt = (
        "Based on the following feedback from an interview, provide the following:\n"
        "1. An overall mark for the interview between 0 and 100.\n"
        "2. A summary of what was good in the interview.\n"
        "3. A summary of what needs improvement.\n\n"
        "Feedback:\n"
    )
    prompt += "\n".join(f"- {feedback}" for feedback in feedback_list)

    # Send the prompt to Gemini
    response_text = analyze_resume(prompt)

    # Return the response from Gemini
    return jsonify({"result": response_text}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)