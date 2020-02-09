const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("cross-fetch");
const cors = require("cors");

const firebase = require("firebase");

const app = express();
const port = 8000;
const firebaseConfig = {
  apiKey: "AIzaSyBvUDf4F3M0Th84gw1gCUamNBjSKhzgAA0",
  authDomain: "pm-d-4bc87.firebaseapp.com",
  databaseURL: "https://pm-d-4bc87.firebaseio.com",
  projectId: "pm-d-4bc87",
  storageBucket: "pm-d-4bc87.appspot.com",
  messagingSenderId: "458449225121",
  appId: "1:458449225121:web:df2f1835daf976bfa7f7e0",
  measurementId: "G-503RQGPDL3"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

  // make auth and firestore references
const db = firebase.firestore();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post("/send-image", async (req, res) => {
  const data = req.body;
  console.log(data);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };

  let fetched;
  try {
    let name = await fetch("http://localhost:5000/postdata", options);
    if (!name.ok) {
      throw new Error(name.status);
    }
    const parsedName = await name.json();
    fetched = parsedName;
  } catch (error) {
    console.log(error);
  }
  res.json(fetched);
});

app.listen(port, () => console.log(`Api starting on port ${port}!`));
