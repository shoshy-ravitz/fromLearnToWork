from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from functions import encode_file_to_base64, analyze_resume, check_answer_with_gamini, evaluate_interview_with_gemini

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
    Evaluate the overall interview using Gemini.
    Takes a list of questions from the C# application, processes them using Gemini,
    and returns the overall mark and feedback for the interview.
    """
    try:
        # Parse the incoming JSON data
        data = request.json
        # if not data or not isinstance(data, list):
        #     return jsonify({"error": "Invalid input. A list of questions is required."}), 400

        # Validate the structure of each question

        print("data:",data)
        for question in data:
            if not all(key in question for key in ["Question", "UserAnswer", "AiFeedback", "Mark"]):
                return jsonify({"error": "Each question must include 'question', 'userAnswer', 'aiFeedback', and 'mark'."}), 400

        # Prepare the questions for evaluation
        questions = [
            {
                "question": q["Question"],
                "answer": q["UserAnswer"],
                "feedback": q["AiFeedback"],
                "mark": q["Mark"]
            }
            for q in data
        ]
        print("questions:",questions)
        # Use the evaluate_interview_with_gemini function to process the questions
        result = evaluate_interview_with_gemini(questions)
        print("result:----------------------------------",result)
        # Check for errors in the result
        # if "error" in result:
        #     return jsonify({"error": result["error"]}), 500

        # Return the result
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)