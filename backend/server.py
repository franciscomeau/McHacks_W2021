from flask import Flask, request
from flask_cors import CORS
from ingredient_matcher import check_seasonality, get_ingredients_from_url
import json

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def get_seasonal_details():
    print('*' * 100)
    print(request)
    print(request.get_json())
    print(request.headers)
    print('*' * 100)
    url = request.get_json()['url']
    ingredients = get_ingredients_from_url(url)
    in_season_dict = check_seasonality(ingredients, 1)

    print(in_season_dict)
    
    return json.dumps(request.get_json()), 200, {'ContentType':'application/json'}


if __name__ == '__main__':
    app.run()
