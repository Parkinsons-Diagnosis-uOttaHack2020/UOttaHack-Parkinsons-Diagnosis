import React, { useState } from "react";
import Context from "./Context";
import * as firebase from "firebase";
const uuidv4 = require("uuid/v4");

const GlobalStates = props => {
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState(null);

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
    firebase.analytics();
  }

  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();

  const sendImage = async (arr, width, height, ids) => {
    let obj = {
      img: arr,
      w: width,
      h: height,
      ids: ids
    };
    // post request
    const options = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:8000/send-image", options);
    let resObject = await response.json();
    console.log(resObject);
  };

  const register = (name, email, pass) => {
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
      auth.currentUser.updateProfile({ displayName: name }).then(() => {
        let userObj = {
          name: name,
          email: email,
          uid: auth.currentUser.uid,
          patients: []
        };
        setUser(userObj);
        db.collection("doctors")
          .doc(auth.currentUser.uid)
          .set(userObj);
      });
    });
  };

  const login = (email, pass) => {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, pass)
        .catch(err => {
          alert(err);
          reject(false);
        })
        .then(() => {
          const uid = auth.currentUser.uid;
          db.collection("doctors")
            .doc(uid)
            .get()
            .then(res => {
              let data = res.data();
              setUser(data);
              resolve(true);
            });
        });
    });
  };

  const signout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  const checkIfLoggedIn = () => {
    return new Promise(resolve => {
      auth.onAuthStateChanged(resolve);
    });
  };

  const getUser = () => {
    if (auth.currentUser) {
    const uid = auth.currentUser.uid;
      db.collection("doctors")
        .doc(uid)
        .get()
        .then(res => {
          let data = res.data();
          setUser(data);
        });
    }
  };

  const createPatient = (name, email) => {
    return new Promise((resolve, reject) => {
      const uid = uuidv4();
      const url = `http://localhost:3000/form/dr=${auth.currentUser.uid}_cl=${uid}_`;
      const patient = {
        name: name,
        email: email,
        uid: uid,
        result: null,
        url: url
      };
      db.collection("patients")
        .doc(uid)
        .set(patient)
        .catch(err => {
          reject(err);
        });
      db.collection("doctors")
        .doc(auth.currentUser.uid)
        .get()
        .catch(err => {
          reject(err);
        })
        .then(data => {
          let user = data.data();
          let patients = user.patients;
          patients.push(patient);
          let newUser = user;
          newUser.patients = patients;
          setUser(newUser);
          db.collection("doctors")
            .doc(auth.currentUser.uid)
            .update({
              patients: patients
            });
          resolve();
        });
    });
  };

  const patientSubmit = age => {
    if (auth.currentUser.uid) {
      const uid = auth.currentUser.uid;
      db.collection("patient")
        .doc(uid)
        .get()
        .then(res => {
          let userObj = {
            age: age,
            name: auth.currentUser.name,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid

            //TO_DO add canvas stuff
          };
          setUser(userObj);
        });
    }
  };

  const getValid = (drId, clId) => {
    return new Promise((resolve, reject) => {
      db.collection("doctors")
        .doc(drId)
        .get()
        .then(res => {
          let data = res.data();
          let patients = data.patients;
          for (let i = 0; i < patients.length; i++) {
            if (patients[i].uid === clId) {
              resolve(true);
            }
          }
          resolve(false);
        });
    });
  };

  return (
    <Context.Provider
      value={{
        arr: arr,
        sendImage: sendImage,
        register: register,
        login: login,
        user: user,
        currentUser: auth.currentUser,
        signout: signout,
        checkIfLoggedIn: checkIfLoggedIn,
        getUser: getUser,
        createPatient: createPatient,
        patientSubmit: patientSubmit,
        getValid: getValid
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
