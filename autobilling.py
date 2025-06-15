# import streamlit as st
# import pandas as pd
# from datetime import datetime
# import uuid
# import numpy as np
# import time

# # ------------------- Load CSV with Caching ------------------- #
# @st.cache_data
# def load_data():
#     start = time.time()
#     df = pd.read_excel("C:/Users/hp/Downloads/RightDose/RightDose/RightDose/MID.xlsx")  # Use ',' if CSV is comma-separated
#     if 'Price' not in df.columns:
#         np.random.seed(42)
#         df['Price'] = np.random.randint(10, 100, size=len(df))  # Simulated price
#     st.write(f"⏱ Data loaded in {time.time() - start:.2f} seconds")
#     return df

# df = load_data()

# # ------------------- Session Setup ------------------- #
# if "transactions" not in st.session_state:
#     st.session_state.transactions = []

# # ------------------- UI ------------------- #
# st.title("💊 Drug Inventory & Supply Chain Tracker")
# st.subheader("🧾 Auto Billing & Invoices")

# # ------------------- Drug Selector + Details ------------------- #
# selected_drug = st.selectbox("🔍 Select a Drug", df['Name'].tolist())

# if selected_drug:
#     drug_info = df[df['Name'] == selected_drug].iloc[0]

#     with st.expander("📋 Drug Information"):
#         st.markdown(f"🔹 Product Introduction:** {drug_info.get('ProductIntroduction', 'N/A')}")
#         st.markdown(f"🔹 Uses:** {drug_info.get('ProductUses', 'N/A')}")
#         st.markdown(f"🔹 Benefits:** {drug_info.get('ProductBenefits', 'N/A')}")
#         st.markdown(f"🔹 Side Effects:** {drug_info.get('SideEffect', 'N/A')}")
#         st.markdown(f"🔹 How to Use:** {drug_info.get('HowToUse', 'N/A')}")
#         st.markdown(f"🔹 How It Works:** {drug_info.get('HowWorks', 'N/A')}")
#         st.markdown(f"🔹 Quick Tips:** {drug_info.get('QuickTips', 'N/A')}")
#         st.markdown(f"🔹 Safety Advice:** {drug_info.get('SafetyAdvice', 'N/A')}")
#         st.markdown(f"🔹 Chemical Class:** {drug_info.get('Chemical_Class', 'N/A')}")
#         st.markdown(f"🔹 Therapeutic Class:** {drug_info.get('Therapeutic_Class', 'N/A')}")
#         st.markdown(f"🔹 Action Class:** {drug_info.get('Action_Class', 'N/A')}")
#         st.markdown(f"🔹 Habit Forming:** {drug_info.get('Habit_Forming', 'N/A')}")
#         st.markdown(f"💰 Price:** ₹{drug_info['Price']} per unit")

# # ------------------- Invoice Generator ------------------- #
# with st.form("invoice_form"):
#     st.markdown("### 💳 Generate Invoice")
#     customer = st.text_input("Institution / Customer Name")
#     quantity = st.number_input("Quantity", min_value=1, value=1)

#     submitted = st.form_submit_button("💸 Generate Invoice")

#     if submitted and customer:
#         transaction_id = str(uuid.uuid4())[:8]
#         unit_price = drug_info['Price']
#         total = unit_price * quantity
#         date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#         invoice = {
#             "Transaction ID": transaction_id,
#             "Customer": customer,
#             "Drug": drug_info['Name'],
#             "Quantity": quantity,
#             "Unit Price": unit_price,
#             "Total Price": total,
#             "Date": date
#         }

#         st.session_state.transactions.append(invoice)
#         st.success("✅ Invoice Generated Successfully!")

# # ------------------- Display Invoices ------------------- #
# if st.session_state.transactions:
#     st.markdown("### 📄 All Invoices")
#     df_invoice = pd.DataFrame(st.session_state.transactions)
#     st.dataframe(df_invoice, use_container_width=True)

#     csv = df_invoice.to_csv(index=False).encode("utf-8")
#     st.download_button("📥 Download Invoices (CSV)", csv, "invoices.csv", "text/csv")
# else:
#     st.info("No invoices yet. Fill the form above to create one.")

# pip install fastapi uvicorn pandas openpyxl
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from datetime import datetime
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS to allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_excel("C:/Users/hp/Downloads/RightDose/RightDose/RightDose/MID.xlsx")
if 'Price' not in df.columns:
    np.random.seed(42)
    df['Price'] = np.random.randint(10, 100, size=len(df))

transactions = []

class InvoiceRequest(BaseModel):
    customer: str
    drug: str
    quantity: int

@app.get("/drugs")
def get_drugs():
    return df.to_dict(orient="records")

@app.post("/generate_invoice")
def generate_invoice(req: InvoiceRequest):
    drug_info = df[df['Name'] == req.drug].iloc[0]
    unit_price = drug_info['Price']
    total_price = unit_price * req.quantity
    transaction_id = str(uuid.uuid4())[:8]
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    invoice = {
        "Transaction ID": transaction_id,
        "Customer": req.customer,
        "Drug": req.drug,
        "Quantity": req.quantity,
        "Unit Price": unit_price,
        "Total Price": total_price,
        "Date": date
    }
    transactions.append(invoice)
    return invoice

@app.get("/invoices")
def get_invoices():
    return transactions
