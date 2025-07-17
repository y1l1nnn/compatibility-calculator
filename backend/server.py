from flask import Flask, request, jsonify 
from flask_cors import CORS 
import json 

app = Flask(__name__)
CORS(app) # allows frontend access 

# read attr_compatibility.json into a dictionary 
with open(compatibility.json) as f:
    attr_compat_data = json.load(f)

# helper function to get compatibility score of an attribute 
def get_attr_compat(attr, val1, val2):
    scores = attr_compat_data(attr, {})
    return 

# calculates the final compatibility 
@app.route("/api/calculate", methods=["POST"])
def calculate_total_compat():
    data = request.get_json()
    a = data["personA"]
    b = data["personB"]

    return jsonify({"score": score}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)