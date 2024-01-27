from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from config import IMAGE_FOLDER
import os
import random


app = Flask(__name__)
CORS(app)

# Chemin vers le dossier contenant les images
IMAGE_FOLDER = 'C:/Users/QuentinCespedes/Pictures/poses/'

def get_random_image():
    """
    Retourne le chemin d'une image aléatoire du dossier.
    """
    images = [os.path.join(dp, f) for dp, dn, filenames in os.walk(IMAGE_FOLDER) for f in filenames if os.path.splitext(f)[1].lower() in ['.png', '.jpg', '.jpeg', '.gif']]
    if images:
        return random.choice(images)
    else:
        return None

@app.route('/api/random-image', methods=['GET'])
def random_image():
    image_path = get_random_image()
    if image_path:
        return send_from_directory(os.path.dirname(image_path), os.path.basename(image_path))
    else:
        return jsonify({"error": "No images found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
