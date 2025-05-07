import io
from flask import Flask, request, jsonify, send_file
import os
from numpy import full, number
from pyparsing import col
from reportlab.lib.colors import red, green, yellow, black
from PyPDF2 import PdfReader
import json
from doctest import debug
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
import fitz  # PyMuPDF 

gemini_api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyA1_-pRQQz89muAzUCFH1AFPDxyNkG5ctI')
client = genai.Client(api_key=gemini_api_key)
model = "gemini-2.0-flash"



def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text


def analyze_resume_with_genai(resume_text, questions):
    print("resume_text", resume_text)
    questions_json = ", ".join([f"(mark :{q['mark']}, question: {q['question']})" for q in questions])
    prompt3 = (
        "Parse the resume:\n" f"{resume_text}\n\n"
        "And the list of interview questions asked in this resume.\n\n"
        "Questions:\n"
        f"{questions_json}\n\n"
        "For each question, extract content from the resume text that the question is asked about"
        "(There can be more than one classification for each question).\n\n"
        "And return an array of scores containing classifications of:\n"
        "- text - The original resume text associated with the question (Without any modification or additions).\n"
        "- score - The score for the classified question (the Mark value for this question).\n\n"
        "The goal is to show the user the level of correctness of knowledge of what they stated they know in the resume.\n\n"
        "An array in JSON format should be returned."
        "example of format:\n"
        "[ {'text':'text from resume that conect to the question','score':'mark of the question'}....]"
    )

    print("prompt", prompt3)

    contents = [
        types.Content(
            role="user",
            parts=[types.Part(text=prompt3)]
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=0.7,
        top_p=0.95,
        top_k=100,
        max_output_tokens=1024,
        response_mime_type="application/json"
    )

    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model, contents=contents, config=generate_content_config
    ):
        response_text += chunk.text

    print("GenAI response:", response_text)
    try:
        result = json.loads(response_text.strip())
        return result
    except json.JSONDecodeError as e:
        print(f"Error parsing GenAI response: {e}")
        return []


def calculate_color(score):
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100")
    color = (0, 0, 0)

    if score > 70:
        color = (0, 1, 0)  # Green
    elif score > 40:
        color = (1, 1, 0)  # Yellow
    else:
        color = (1, 0, 0)  # Red

    return color


def highlight_text_in_pdf(input_pdf, output_pdf, topics):
    """
    Highlight text in the PDF based on topics and their scores.
    """
    doc = fitz.open(input_pdf)

    for page_num in range(len(doc)):
        page = doc[page_num]
        full_text = page.get_text("text")
        print(f"Processing page {page_num + 1}")

        for topic in topics:
            highlight_topic_in_page(page, topic)

    add_logo_to_pdf(doc)
    doc.save(output_pdf)
    print(f"Highlighted PDF saved to {output_pdf}")


def highlight_topic_in_page(page, topic):
    """
    Highlight a specific topic in a given page.
    """
    topic_text = topic["text"]
    score = int(topic["score"])
    color = calculate_color(score)

    rects = page.search_for(topic_text)
    if rects:
        print(f"Found '{topic_text}' on page at {rects}")
        for rect in rects:
            page.draw_rect(rect, color=color, width=1.5)


def add_logo_to_pdf(doc):
    """
    Add a logo to each page of the PDF.
    """
    logo_path = "./assets/logo2.png"
    logo_rect = fitz.Rect(50, 50, 150, 100)  # Adjust the position and size as needed

    if not os.path.exists(logo_path):
        print(f"Logo file not found: {logo_path}")
        return

    for page in doc:
        page.insert_image(logo_rect, filename=logo_path)
