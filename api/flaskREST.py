from flask import Flask, request
import json
import time

from analyze.analyze import analyze

from joblib import load



app = Flask(__name__)
 
@app.route('/')
def index():
	return "Flask server"
 
@app.route('/postdata', methods = ['POST'])
def postdata():
    data = request.get_json()
    print(data)
    # print(len(data["img"]))
    result = analyze(data["img"], data["w"], data["h"])
    result_str = 'true' if result else 'false'

    json_result = '{ "result": ' + result_str + ' }'
    
    # do something with this data variable that contains the data from the node server
    return json.dumps(json.loads(json_result))
 
if __name__ == "__main__":
	app.run(port=5000)