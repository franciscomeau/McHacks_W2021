from flask import Flask, request
from ingredient_matcher import check_seasonality, get_ingredients_from_url
app = Flask(__name__)

@app.route('/')
def get_seasonal_details():
    url = request.args.get('url')
    check_seasonality()
    if not url:
        url = "Must provide a url"
    return url


if __name__ == '__main__':
    app.run()