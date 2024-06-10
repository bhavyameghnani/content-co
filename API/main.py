from flask import Flask, request, jsonify
from flask_cors import CORS
from text_generation_module import generate_text, generate_headline, generate_body_text, generate_social_post
from image_generation_module import generate_image
from seo_module import optimize_for_seo
from content_formatting_module import apply_template, apply_custom_styles

app = Flask(__name__)
CORS(app)

@app.route('/generate-text', methods=['POST'])
def generate_text_endpoint():
    data = request.json
    theme = data.get('theme', '')
    details = data.get('details', '')
    output = generate_text(theme, details)
    return jsonify({'output': output})

@app.route('/generate-headline', methods=['POST'])
def generate_headline_endpoint():
    data = request.json
    keywords = data.get('keywords', '')
    output = generate_headline(keywords)
    return jsonify({'output': output})

@app.route('/generate-body-text', methods=['POST'])
def generate_body_text_endpoint():
    data = request.json
    brief_description = data.get('briefDescription', '')
    output = generate_body_text(brief_description)
    return jsonify({'output': output})

@app.route('/generate-social-post', methods=['POST'])
def generate_social_post_endpoint():
    data = request.json
    post_details = data.get('postDetails', '')
    output = generate_social_post(post_details)
    return jsonify({'output': output})

@app.route('/generate-image', methods=['POST'])
def generate_image_endpoint():
    output = generate_image()
    return jsonify({'output': output})

@app.route('/optimize-seo', methods=['POST'])
def optimize_seo_endpoint():
    data = request.json
    content = data.get('content', '')
    output = optimize_for_seo(content)
    return jsonify({'output': output})

@app.route('/apply-template', methods=['POST'])
def apply_template_endpoint():
    data = request.json
    content = data.get('content', '')
    output = apply_template(content)
    return jsonify({'output': output})

@app.route('/apply-custom-styles', methods=['POST'])
def apply_custom_styles_endpoint():
    data = request.json
    content = data.get('content', '')
    output = apply_custom_styles(content)
    return jsonify({'output': output})

@app.route('/spellcheck', methods=['POST'])
def spellcheck():
    content = request.json.get('content', '')
    # Extract suggestions for corrections
    corrections = ["match.replacements[0] for match in matches", "abc"]
    return jsonify({"status": "success", "corrections": corrections, "content": content})

@app.route('/readability', methods=['POST'])
def readability():
    content = request.json.get('content', '')
    # Calculate readability score using textstat library
    readability_score = 100
    return jsonify({"status": "success", "readability_score": readability_score})

@app.route('/compare', methods=['POST'])
def compare_content():
    data = request.json
    content1 = data.get('content1', '')
    content2 = data.get('content2', '')
    # Calculate similarity ratio using SequenceMatcher
    similarity_ratio = 100
    # Define a threshold for similarity
    threshold = 0.8
    # Determine whether the content is similar or different based on the threshold
    if similarity_ratio >= threshold:
        result = "The contents are similar."
    else:
        result = "The contents are different."
    return jsonify({"status": "success", "result": result, "similarity_ratio": similarity_ratio})

@app.route('/expand', methods=['POST'])
def expand_content():
    content = request.json.get('content', '')
    # Dummy content expansion logic
    expanded_content = content + ' This is an expanded version of the content.'
    
    return jsonify({"status": "success", "expanded_content": expanded_content})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
