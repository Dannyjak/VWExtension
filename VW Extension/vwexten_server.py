# import logging
# from flask import Flask, request, jsonify
# # import fitz  # PyMuPDF
# import io
# from google.cloud import vision_v1p3beta1 as vision
# import os
# from flask_cors import CORS
# import requests

# app = Flask(__name__)
# CORS(app, resources={r"/run-script": {"origins": [
#     "chrome-extension://opablligfegdnikmmkegkdfllcejkaif", 
#     "chrome-extension://jkjnkbbkponocmpjpoddeojehmhjhgcc", 
#     "http://localhost:8001"
# ]}})

# logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# @app.route('/')
# def home():
#     logging.info('Home route accessed')
#     return "Server is running!"

# @app.route('/run-script', methods=['POST'])
# def run_script():
#     logging.info('Received a request to /run-script')
#     if 'file' not in request.files:
#         logging.error('No file part in the request')
#         return jsonify({'error': 'No file part in the request'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         logging.error('No selected file')
#         return jsonify({'error': 'No selected file'}), 400

#     if file and (file.content_type == 'application/pdf' or file.content_type == 'image/jpeg' or file.content_type == 'image/png'):
#         try:
#             if file.content_type == 'application/pdf':
#                 logging.info('Processing PDF file')
#                 content = file.read()
#                 document = fitz.open(stream=content, filetype="pdf")
#                 text = ""
#                 for page_num in range(document.page_count):
#                     page = document.load_page(page_num)
#                     text += page.get_text()
#                 logging.info('PDF processed successfully')
#                 return jsonify({'output': text})
#             else:
#                 logging.info('Processing image file')
#                 client = vision.ImageAnnotatorClient()

#                 image = vision.Image(content=file.read())

#                 image_context = vision.ImageContext(language_hints=["en-t-i0-handwrit"])

#                 response = client.document_text_detection(image=image, image_context=image_context)

#                 if response.error.message:
#                     raise Exception(
#                         "{}\nFor more info on error messages, check: "
#                         "https://cloud.google.com/apis/design/errors".format(response.error.message)
#                     )
                
#                 result_text = f"Full Text: {response.full_text_annotation.text}\n"
#                 logging.info('Image processed successfully')
#                 return jsonify({'output': result_text})
#         except Exception as e:
#             logging.exception('An error occurred during file processing')
#             return jsonify({'error': str(e)}), 500
#     else:
#         logging.error('Unsupported file type')
#         return jsonify({"error": "Unsupported file type"}), 400

# if __name__ == '__main__':
#     os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/Deeje/Downloads/tester-420821-7b6b7363fced.json'
#     app.run(port=8001, debug=True)

import logging
from flask import Flask, request, jsonify
import io
from google.cloud import vision_v1p3beta1 as vision
import os
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/run-script": {"origins": [
    "chrome-extension://opablligfegdnikmmkegkdfllcejkaif", 
    "chrome-extension://jkjnkbbkponocmpjpoddeojehmhjhgcc", 
    "http://localhost:8082"
]}})

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/')
def home():
    logging.info('Home route accessed')
    return "Server is running!"

@app.route('/run-script', methods=['POST'])
def run_script():
    logging.info('Received a request to /run-script')
    if 'file' not in request.files:
        logging.error('No file part in the request')
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        logging.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if file and (file.content_type == 'application/pdf' or file.content_type == 'image/jpeg' or file.content_type == 'image/png'):
        try:
            if file.content_type != 'application/pdf':
                logging.info('Processing image file')
                client = vision.ImageAnnotatorClient()

                image = vision.Image(content=file.read())

                image_context = vision.ImageContext(language_hints=["en-t-i0-handwrit"])

                response = client.document_text_detection(image=image, image_context=image_context)

                if response.error.message:
                    raise Exception(
                        "{}\nFor more info on error messages, check: "
                        "https://cloud.google.com/apis/design/errors".format(response.error.message)
                    )
                
                result_text = f"Full Text: {response.full_text_annotation.text}\n"
                logging.info('Image processed successfully')
                return jsonify({'output': result_text})
        except Exception as e:
            logging.exception('An error occurred during file processing')
            return jsonify({'error': str(e)}), 500
    else:
        logging.error('Unsupported file type')
        return jsonify({"error": "Unsupported file type"}), 400

if __name__ == '__main__':
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:\\Users\\Deeje\\Downloads\\tester-420821-7b6b7363fced.json'
    from waitress import serve
    serve(app, host='0.0.0.0', port=8082)


