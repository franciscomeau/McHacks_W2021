from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def get_seasonal_details():
    url = request.args.get('url')
    return url;


if __name__ == '__main__':
    app.run()