import base64
import json
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# טוען משתני סביבה
load_dotenv()

# קבלת מפתח ה-API מ-GEMINI
gemini_api_key = os.getenv('GEMINI_API_KEY')
if not gemini_api_key:
    raise EnvironmentError("GEMINI_API_KEY is not set in the environment variables.")

client = genai.Client(api_key=gemini_api_key)
model = "gemini-2.0-flash"


def encode_file_to_base64(file_path):
    """ ממיר קובץ לבסיס 64 """
    with open(file_path, "rb") as file:
        return base64.b64encode(file.read()).decode("utf-8")


def analyze_resume(resume_file_path):
 
    encoded_resume = encode_file_to_base64(resume_file_path)

    prompt = " נתח את קובץ קורות החיים המצורף וספק רשימה של 4 שאלות על הידיעות בחומר שיש בקורות חיים."
    prompt += " התשובה צריכה להיות בפורמט JSON של רשימה של שאלות. לדוגמה: ['שאלה 1', 'שאלה 2', 'שאלה 3', 'שאלה 4']"
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
      

        # החזרת הפידבק והציון מתוך התשובה
        feedback = response_data.get("feedback", "No feedback provided.")
        mark = response_data.get("mark", 0)
      
        return {"feedback": feedback, "mark": mark}
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse response as JSON: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
    
    # Helper function to send a request to Gemini
def send_request_to_gemini(prompt):
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part(text=prompt),
            ],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
            temperature=1,
            top_p=0.95,
            top_k=40,
            max_output_tokens=2048,
            response_mime_type="application/json",
        )
    
    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model, contents=contents, config=generate_content_config
    ):
        response_text += chunk.text
    return response_text

def evaluate_interview_with_gemini(questions):
    """
    Evaluate the overall interview using Gemini.
    Sends three separate requests to Gemini:
    1. General feedback summarizing the interview.
    2. A list of topics covered in the interview and a score (0-100) for each topic.
    3. An overall mark for the interview.
    Returns:
    - General feedback.
    - A list of topics with scores.
    - An overall mark.
    """

    # Prepare the shared part of the prompt
    questions_prompt = "Questions and Answers:\n"
    for idx, q in enumerate(questions, start=1):
        questions_prompt += f"Question {idx}: {q['question']}\n"
        questions_prompt += f"Answer: {q['answer']}\n"
        questions_prompt += f"Feedback: {q.get('feedback', '')}\n"
        questions_prompt += f"Mark: {q.get('mark', 0)}\n\n"

    # Request 1: General feedback
    feedback_prompt = (
        "Evaluate the following interview and provide one general feedback that summarizes the interview, i.e. a final outcome of the interview.\n\n"
        + questions_prompt
        +"Answer should include only the general feedback text without the questions and mark in numbers in format string -not object.\n"
        +"Example format: 'The candidate demonstrated strong technical skills and a good understanding of the subject. It is worth paying attention to the following points:... ,To be better prepared for the real-time interview to improve on:.......'"
    )
    feedback_response = send_request_to_gemini(feedback_prompt)
  
    # Request 2: Topics and scores
    topics_prompt = (
        "Analyze the following interview and provide a list of topics/subjects asked in the interview and give a weighted score for each topic"
        "The answer format will include an array of topic name and score"
        "Example of format:[{'topic': 'topic_name', 'score': 85}, {'topic': 'another_topic', 'score': 90}]"
        + questions_prompt
    )
    topics_response = send_request_to_gemini(topics_prompt)
  
    # Request 3: Overall mark
    mark_prompt = (
        "Evaluate the following interview and provide an overall mark for the interview (0-100).\n\n"
        + questions_prompt
    )
    mark_response = send_request_to_gemini(mark_prompt)
 
    # Process the responses
    try:
        feedback = json.loads(feedback_response.strip())
        topics_scores = json.loads(topics_response.strip())
        overall_mark = json.loads(mark_response.strip())
      

        return {
            "feedback": feedback[0],
            "result": topics_scores,
            # "mark": mark_response,
        }
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse response as JSON: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}

