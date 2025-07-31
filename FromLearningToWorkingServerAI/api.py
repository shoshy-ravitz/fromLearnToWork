# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from dotenv import load_dotenv
# import os
# import requests
# from functions import  analyze_resume, check_answer_with_gamini, evaluate_interview_with_gemini
# from result_on_resume import analyze_resume_with_genai, extract_text_from_pdf, highlight_text_in_pdf

# # הגדרת Flask
# app = Flask(__name__)
# CORS(app)
# load_dotenv()


# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "Welcome to the API. Use the appropriate endpoints to interact with the service."}), 200

# @app.route("/create_interview", methods=["POST"])
# def create_interview():
#     """
#     הורדת קובץ מ-AWS, ניתוחו באמצעות Gemini, והחזרת 10 שאלות.
#     """

#     print("1 Received request to create interview")
#     data = request.json
#     resume_url = data.get("resume_url")  # URL של קובץ ה-AWS
#     print("2 resume_url:", resume_url)
#     if not resume_url:
#         return jsonify({"error": "No resume URL provided"}), 400

#     temp_path = "temp_resume.pdf"

#     try:
#         # הורדת הקובץ מ-AWS
#         print("3 Downloading resume from URL:", resume_url)
#         response = requests.get(resume_url)
#         if response.status_code != 200:
#             return jsonify({"error": f"Failed to download the resume file. Status code: {response.status_code}"}), 500
#         print("4 Resume downloaded successfully, saving to temporary file.")
#         # שמירת הקובץ באופן זמני
#         with open(temp_path, "wb") as file:
#             file.write(response.content)
#         print("5 Temporary file created at:", temp_path)
#         # ניתוח הקובץ באמצעות Gemini
#         questions = analyze_resume(temp_path)
#         print("type of question:",type(questions))
#         print("questions::::::::::::::::",questions)
#         # החזרת התוצאה
#         return jsonify({"questions": questions}), 200

#     except Exception as e:
#         print("Error occurred:", str(e))
#         return jsonify({"error": str(e)}), 500

#     finally:
#         # מחיקת הקובץ הזמני
#         if os.path.exists(temp_path):
#             os.remove(temp_path)


# @app.route("/check_answer", methods=["POST"])
# def check_answer():
#     data = request.json
#     question = data.get('Question')
#     answer = data.get('Answer')
    
#     if not question or not answer:
#         return jsonify({"error": "Question and answer must be provided"}), 400

#     result = check_answer_with_gamini(question, answer)

#     return result, 200


# @app.route("/result_of_interview", methods=["POST"])
# def result_of_interview():
#     """
#     Evaluate the overall interview using Gemini.
#     Takes a list of questions from the C# application, processes them using Gemini,
#     and returns the overall mark and feedback for the interview.
#     """
#     try:
#         # Parse the incoming JSON data
#         data = request.json
#         # if not data or not isinstance(data, list):
#         #     return jsonify({"error": "Invalid input. A list of questions is required."}), 400

#         # Validate the structure of each question

#         for question in data:
#             if not all(key in question for key in ["Question", "Answer", "Feedback", "Mark"]):
#                 return jsonify({"error": "Each question must include 'question', 'Answer', 'Feedback', and 'mark'."}), 400

#         # Prepare the questions for evaluation
#         questions = [
#             {
#                 "question": q["Question"],
#                 "answer": q["Answer"],
#                 "feedback": q["Feedback"],
#                 "mark": q["Mark"]
#             }
#             for q in data
#         ]
   
#         # Use the evaluate_interview_with_gemini function to process the questions
#         result = evaluate_interview_with_gemini(questions)
   
#         # Check for errors in the result
#         # if "error" in result:
#         #     return jsonify({"error": result["error"]}), 500

#         # Return the result
#         return jsonify(result), 200

#     except Exception as e:
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


# @app.route("/result_on_resume", methods=["POST"])
# def result_on_resume():
#     print("Received request to highlight resume")
#     data = request.json
#     resume_url = data.get("resume_url")
#     topics = data.get("questions", [])

#     if not resume_url or not topics:
#         return jsonify({"error": "Resume URL and topics must be provided"}), 400

#     temp_input_path = "temp_resume.pdf"
#     temp_output_path = "highlighted_resume.pdf"

#     try:
#         response = requests.get(resume_url)
#         if response.status_code != 200:
#             return jsonify({"error": "Failed to download the resume file"}), 500

#         with open(temp_input_path, "wb") as file:
#             file.write(response.content)

#         resume_text = extract_text_from_pdf(temp_input_path)

#         analyzed_topics = analyze_resume_with_genai(resume_text, topics)
#         print("analyzed_topics", analyzed_topics)

#         highlight_text_in_pdf(temp_input_path, temp_output_path, analyzed_topics)

#         return send_file(temp_output_path, as_attachment=True)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         try:
#             if os.path.exists(temp_input_path):
#                 os.remove(temp_input_path)
#             if os.path.exists(temp_output_path):
#                 os.remove(temp_output_path)
#         except Exception as cleanup_error:
#             print(f"Error during cleanup: {cleanup_error}")

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import logging
from functions import analyze_resume, check_answer_with_gemini, evaluate_interview_with_gemini
from result_on_resume import analyze_resume_with_genai, extract_text_from_pdf, highlight_text_in_pdf

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize Flask app
app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the API. Use the appropriate endpoints to interact with the service."}), 200

@app.route("/create_interview", methods=["POST"])
def create_interview():
    """
    Download file from AWS, analyze it using Gemini, and return 10 questions.
    """
    logging.info("1 Received request to create interview")
    data = request.json
    resume_url = data.get("resume_url")  # URL of the AWS file
    logging.info("2 resume_url: %s", resume_url)
    if not resume_url:
        return jsonify({"error": "No resume URL provided"}), 400

    temp_path = "temp_resume.pdf"

    try:
        # Download the file from AWS
        logging.info("3 Downloading resume from URL: %s", resume_url)
        response = requests.get(resume_url)
        if response.status_code != 200:
            return jsonify({"error": f"Failed to download the resume file. Status code: {response.status_code}"}), 500
        logging.info("4 Resume downloaded successfully, saving to temporary file.")
        # Save the file temporarily
        with open(temp_path, "wb") as file:
            file.write(response.content)
        logging.info("5 Temporary file created at: %s", temp_path)
        # Analyze the file using Gemini
        questions = analyze_resume(temp_path)
        logging.info("Type of questions: %s", type(questions))
        logging.info("Questions: %s", questions)
        # Return the result
        return jsonify({"questions": questions}), 200

    except Exception as e:
        logging.error("Error occurred: %s", str(e))
        return jsonify({"error": str(e)}), 500

    finally:
        # Delete the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.route("/check_answer", methods=["POST"])
def check_answer():
    data = request.json
    question = data.get('Question')
    answer = data.get('Answer')
    
    if not question or not answer:
        return jsonify({"error": "Question and answer must be provided"}), 400

    result = check_answer_with_gemini(question, answer)

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

        for question in data:
            if not all(key in question for key in ["Question", "Answer", "Feedback", "Mark"]):
                return jsonify({"error": "Each question must include 'Question', 'Answer', 'Feedback', and 'Mark'."}), 400

        # Prepare the questions for evaluation
        questions = [
            {
                "question": q["Question"],
                "answer": q["Answer"],
                "feedback": q["Feedback"],
                "mark": q["Mark"]
            }
            for q in data
        ]
   
        # Use the evaluate_interview_with_gemini function to process the questions
        result = evaluate_interview_with_gemini(questions)
   
        return jsonify(result), 200

    except Exception as e:
        logging.error("An unexpected error occurred: %s", str(e))
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route("/result_on_resume", methods=["POST"])
def result_on_resume():
    logging.info("Received request to highlight resume")
    data = request.json
    resume_url = data.get("resume_url")
    topics = data.get("questions", [])

    if not resume_url or not topics:
        return jsonify({"error": "Resume URL and topics must be provided"}), 400

    temp_input_path = "temp_resume.pdf"
    temp_output_path = "highlighted_resume.pdf"

    try:
        response = requests.get(resume_url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to download the resume file"}), 500

        with open(temp_input_path, "wb") as file:
            file.write(response.content)

        resume_text = extract_text_from_pdf(temp_input_path)

        analyzed_topics = analyze_resume_with_genai(resume_text, topics)
        logging.info("Analyzed topics: %s", analyzed_topics)

        highlight_text_in_pdf(temp_input_path, temp_output_path, analyzed_topics)

        return send_file(temp_output_path, as_attachment=True)

    except Exception as e:
        logging.error("Error occurred: %s", str(e))
        return jsonify({"error": str(e)}), 500

    finally:
        try:
            if os.path.exists(temp_input_path):
                os.remove(temp_input_path)
            if os.path.exists(temp_output_path):
                os.remove(temp_output_path)
        except Exception as cleanup_error:
            logging.error("Error during cleanup: %s", cleanup_error)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
