from flask import Flask, request
from flask_cors import CORS
from recipe_scrapers import WebsiteNotImplementedError
from ingredient_matcher import check_seasonality, get_ingredients_from_url, get_recipe_title_from_url
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
    month = request.get_json()['month']
    try:
        title = get_recipe_title_from_url(url)
        ingredients = get_ingredients_from_url(url)
    except WebsiteNotImplementedError as e:
        json.dumps({'error': e.message}), 403, {'ContentType': 'application/json'}

    in_season_dict, in_season_ratio = check_seasonality(ingredients, month)

    print(in_season_dict)

    return json.dumps({'title': title, 'ingredients': in_season_dict, 'in_season_ratio': in_season_ratio}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run()
