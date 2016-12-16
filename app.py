from flask import Flask, render_template
import flask
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')

@app.route('/data', methods=['GET'])
def data():
    with open('data.json', 'r') as f:
        data = json.load(f)
    print(data)
    response = flask.jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    

if __name__ == '__main__':
    app.run(debug=True)
