import base64
import json  # ייבוא ספריית JSON
from doctest import debug
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
gemini_api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyA1_-pRQQz89muAzUCFH1AFPDxyNkG5ctI')


def encode_file_to_base64(file_path):
    """ ממיר קובץ לבסיס 64 """
    with open(file_path, "rb") as file:
        return base64.b64encode(file.read()).decode("utf-8")


def analyze_resume(resume_file_path):
    client = genai.Client(api_key=gemini_api_key)
    model = "gemini-2.0-flash"

    encoded_resume = encode_file_to_base64(resume_file_path)

    prompt = "נתח את קובץ קורות החיים המצורף וספק רשימה של 4 שאלות על הידיעות בחומר שיש בקורות חיים."

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part(text=prompt),
                types.Part(
                    inline_data=types.Blob(
                        mime_type="application/pdf",
                        data=encoded_resume,
                    )
                ),
            ],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        top_k=40,
        max_output_tokens=8192,
        response_mime_type="application/json",
    )

    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model, contents=contents, config=generate_content_config
    ):
        response_text += chunk.text

    # פיצול התוצאה לרשימה של שאלות
    questions = [q.strip().strip('"') for q in response_text.split("\n") if q.strip()]

    if questions and questions[0] == "[" and questions[-1] == "]":
        questions = questions[1:-1]
    return questions


def check_answer_with_gamini(question, answer):
    """
    פונקציה לבדיקת תשובה באמצעות Gemini
    מחזירה פידבק מילולי וציון בין 0 ל-10
    """
    client = genai.Client(api_key=gemini_api_key)
    model = "gemini-2.0-flash"

    # עדכון הפרומפט כדי לכלול גם פידבק מילולי וגם ציון
    prompt_feedback = (
        f"Check the following answer for the question:\n"
        f"Question: {question}\n"
        f"Answer: {answer}\n"
        f"Provide feedback in words and give a mark between 0 and 10."
    )

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part(text=prompt_feedback),
            ],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        top_k=40,
        max_output_tokens=1024,
        response_mime_type="application/json",
    )

    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model, contents=contents, config=generate_content_config
    ):
        response_text += chunk.text

    # עיבוד התשובה המתקבלת
    try:
        # הנחה שהתשובה המתקבלת היא בפורמט JSON
        response_data = json.loads(response_text.strip())  # המרת התשובה ל-JSON
        print("+=================")
        print(response_data)

        # החזרת הפידבק והציון מתוך התשובה
        feedback = response_data.get("feedback", "No feedback provided.")
        mark = response_data.get("mark", 0)
        print("**8888888")
        print({"feedback": feedback, "mark": mark})
        return {"feedback": feedback, "mark": mark}
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse response as JSON: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}