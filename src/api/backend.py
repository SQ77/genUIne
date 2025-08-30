from flask import Flask, request, jsonify
import spacy
import dateparser

app = Flask(__name__)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

def identifyTimeStamp(message):
    doc = nlp(message)
    result = []

    for ent in doc.ents:
        if ent.label_ in ['DATE', 'TIME']:
            parsed_date = dateparser.parse(ent.text)
            result.append((ent.text, parsed_date.strftime('%Y-%m-%d %H:%M:%S') if parsed_date else None))

    result.sort()
    return result

def parseUserinput(message):
    return identifyTimeStamp(message)

@app.route('/api/parse', methods=['POST'])
def parse_input():
    try:
        data = request.get_json()
        message = data.get("message", "")

        if not message.strip():
            return jsonify({"error": "Message is empty"}), 400

        result = parseUserinput(message)
        return jsonify({"timestamps": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
