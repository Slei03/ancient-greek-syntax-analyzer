from flask import Flask, request, jsonify
from flask_cors import CORS
from spacy import displacy
import spacy
import base64

app = Flask(__name__)
CORS(app, support_credentials=True)

nlp_models = {
    "grc_proiel_trf": spacy.load("grc_proiel_trf"),
    "grc_proiel_lg": spacy.load("grc_proiel_lg"),
    "grc_proiel_sm": spacy.load("grc_proiel_sm"),
    "grc_perseus_trf": spacy.load("grc_perseus_trf"),
}

config = {"punct_chars": [".", ";", "·"]}

token_attr = ["text", "lemma_", "pos_", "dep_"]

for model in nlp_models.values():
    model.add_pipe("sentencizer", config=config, before="parser")

@app.route('/parse', methods=["POST", "GET"])
def parse():
    model = request.args.get('model')
    text = request.args.get('input')
    options = {
        "collapse_punct": request.args.get('collapse') == 'true',
        "compact": request.args.get('compact') == 'true',
    }
    img_links = []
    if model in nlp_models.keys():
        doc = nlp_models[model](text)
        """ tokens = [[str(getattr(token, attr)) for attr in token_attr] for token in doc] """
        tokens = []
        for token in doc:
            item = {}
            for attr in token_attr:
                item[attr] = str(getattr(token, attr))
            tokens.append(item)
        docs = [span.as_doc() for span in doc.sents] if request.args.get('split') == 'true' else [doc]
        for sentence in docs:
            html = displacy.render(sentence, options=options, style="dep")
            img_links.append({
                "sentence": sentence.text, 
                "link": get_svg_link(html)
            })
        return jsonify({"links": img_links, "tokens": tokens})
    return "Unable to process request", 400

def get_svg_link(svg: str):
    """Convert an SVG to a base64-encoded image."""
    b64 = base64.b64encode(svg.encode("utf-8")).decode("utf-8")
    link = f"data:image/svg+xml;base64,{b64}"
    return link

if __name__ == '__main__':
    app.run(debug=True)