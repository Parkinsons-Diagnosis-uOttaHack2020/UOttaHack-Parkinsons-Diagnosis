const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("cross-fetch");
const cors = require("cors");
const firebase = require("firebase");

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

// firebase config
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
const auth = firebase.auth();
const db = firebase.firestore();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const patch = (ids, result) => {
  db.collection("doctors").doc(ids.drId).get().then(res => {
    let data = res.data();
    for (let i=0; i<data.patients.length; i++) {
      if (data.patients[i].uid === ids.clId) {
        data.patients[i].result = result.result;
      }
    }
    db.collection("doctors").doc(ids.drId).update(data);
  });
}

app.post("/send-image", async (req, res) => {
  const data = req.body;
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };

  let fetched;
  try {
    let response = await fetch("http://localhost:5000/postdata", options);
    if (!response.ok) {
      throw new Error(response.status);
    }
<<<<<<< HEAD
    const parsedName = await name.json();
    fetched = parsedName;
    console.log(fetched);
    patch(data.ids, fetched);
=======
    const parsedData = await response.json();
    fetched = parsedData;
    console.log(parsedData);
>>>>>>> f
  } catch (error) {
    console.log(error);
  }
  res.json(fetched);
});

app.listen(port, () => console.log(`Api starting on port ${port}!`));
