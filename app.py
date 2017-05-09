from flask import Flask, render_template, request
import flask
import json

app = Flask(__name__)


def create_res(data):
    response = flask.jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')

@app.route('/data', methods=['GET', 'POST'])
def data():
    with open('data.json', 'r') as f:
        data = json.load(f)
    if request.method == 'POST':
        req = request.get_json(force=True)
        author = req.get('author')
        text = req.get('text')
        data['data'].append({'author': author, 'text': text})
        print(data)
        with open('data.json', 'w') as f:
            json.dump(data, f)
    response = flask.jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True, port=3000)
