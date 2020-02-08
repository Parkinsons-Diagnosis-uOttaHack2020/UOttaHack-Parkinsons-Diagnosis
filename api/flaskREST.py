from flask import Flask, request
import json
import time
 
app = Flask(__name__)
 
@app.route('/')
def index():
	return "Flask server"
 
@app.route('/postdata', methods = ['POST'])
def postdata():
    data = request.get_json()
    print(len(data["img"]))

    # do something with this data variable that contains the data from the node server
    return json.dumps(data)
 
if __name__ == "__main__":
	app.run(port=5000)