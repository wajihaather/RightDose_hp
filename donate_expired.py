import streamlit as st
from datetime import datetime, timedelta

# Custom CSS to match your RightDose theme
st.markdown("""
<style>
    .stApp {
        max-width: 800px;
        margin: 0 auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .stTextInput>div>div>input, 
    .stDateInput>div>div>input,
    .stTextArea>div>div>textarea {
        border: 1px solid #2a7fba;
        border-radius: 5px;
    }
    .stButton>button {
        background-color: #2a7fba;
        color: white;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        border: none;
    }
    .stButton>button:hover {
        background-color: #3ab795;
    }
</style>
""", unsafe_allow_html=True)

st.title("Donate Expired Medicines")
st.write("Help us recycle and properly dispose of expired medicines by scheduling a home pickup.")

with st.form("donation_form"):
    med_name = st.text_input("Medicine Name")
    expiry_date = st.date_input("Expiry Date")
    address = st.text_area("Pickup Address")
    submitted = st.form_submit_button("Schedule Pickup")

if submitted:
    if not all([med_name, expiry_date, address]):
        st.warning("Please fill all fields")
    elif expiry_date > datetime.today().date():
        st.warning("Please enter a valid expiry date (must be in the past)")
    else:
        pickup_date = datetime.now() + timedelta(days=2)
        st.success(f"""
        ✅ Thank you for your donation!

        A delivery person will come to your address on 
        **{pickup_date.strftime('%A, %d %B %Y')}**
        to collect your expired medicines.
        """)
        st.balloons()

        # Store donation info in session (can be sent to backend)
        donation_data = {
            "medicine": med_name,
            "expiry_date": expiry_date.strftime("%Y-%m-%d"),
            "address": address,
            "pickup_date": pickup_date.strftime("%Y-%m-%d")
        }
        st.session_state.donation = donation_data
