from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/recommend')
def recommend_crop():
    return jsonify({"recommendation": "Try Wheat, Maize, or Barley!"})

@app.route('/weather')
def get_weather():
    return jsonify({"weather": "Sunny, 25°C"})  # Simulated weather data

if __name__ == '__main__':
    app.run(debug=True)
