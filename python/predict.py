import sys
import pickle
import re

# Load model

model = pickle.load(open("model/model.pkl", "rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl", "rb"))

# Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

# Get input
input_text = sys.argv[1]
cleaned = clean_text(input_text)

# Transform
text_vec = vectorizer.transform([cleaned])

# Predict
prediction = model.predict(text_vec)[0]
probability = max(model.predict_proba(text_vec)[0]) * 100

# Simple explanation logic
explanation = ""

if "!" in input_text:
    explanation += "Excess punctuation detected. "
if "breaking" in input_text.lower():
    explanation += "Contains sensational word. "
if "share" in input_text.lower():
    explanation += "Contains urgency phrase. "

if explanation == "":
    explanation = "Text appears neutral and formal."

# Output
print(prediction + "|" + str(round(probability,2)) + "|" + explanation)