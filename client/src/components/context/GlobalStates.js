import React, { useState } from "react";
import Context from "./Context";
import * as firebase from "firebase";

const GlobalStates = props => {
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState(null);

  // firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCS58v_4_faERm1BMNWbS5JyPaOUWid_lQ",
    authDomain: "uottahack2020-parkinsons-api.firebaseapp.com",
    databaseURL: "https://uottahack2020-parkinsons-api.firebaseio.com",
    projectId: "uottahack2020-parkinsons-api",
    storageBucket: "uottahack2020-parkinsons-api.appspot.com",
    messagingSenderId: "109481509112",
    appId: "1:109481509112:web:c3adeb13cc0db09b04fb0d",
    measurementId: "G-N7543BNP8X"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();

  const sendImage = async obj => {
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
    setArr(resObject.img);
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

  return (
    <Context.Provider
      value={{
        arr: arr,
        sendImage: sendImage,
        register: register,
        login: login,
        user: user,
        currentUser: auth.currentUser,
        signout: signout
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
