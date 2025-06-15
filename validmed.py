import os
import streamlit as st
import google.generativeai as genai
from google.generativeai import types


# Set your API key
genai.configure(api_key="YOUR_API_KEY")


MODEL_NAME = "models/gemini-1.5-flash"

# Function to verify medicine effects
def verify_medicine(medicine_name, user_effects):
    try:
        prompt = f"""
        The patient was prescribed: {medicine_name}
        The doctor mentioned these effects: {user_effects}

        Use online sources and trustworthy medical info to verify:
        - Do the effects match this medicine?
        - Reply with: "True Medicine" or "False Medicine"
        - Also include a short 1-line explanation.
        """

        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
        response = model.generate_content(prompt)
        
        return response.text.strip() if response.text else "⚠ No answer received."

    except Exception as e:
        return f"⚠ Error: {str(e)}"


# Streamlit UI
st.set_page_config(page_title="💊 Medicine Validator", layout="centered")
st.title("💊 Medicine Validator")
st.write("Use Google Gemini AI to check if the given medicine matches the described effects.")

# Input fields
medicine_name = st.text_input("Enter Medicine Name")
user_effects = st.text_area("Enter Effects Given by Doctor")

# Submit button
if st.button("Validate"):
    if medicine_name and user_effects:
        with st.spinner("Validating..."):
            result = verify_medicine(medicine_name, user_effects)
        st.success("Validation Completed")
        st.text_area("Validation Result", value=result, height=150)
    else:
        st.warning("Please fill in both fields.")
