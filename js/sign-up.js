"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// Your web app's Firebase configuration



const firebaseConfig = {
    apiKey: "AIzaSyBmV9LbLxIxbsS4zWoSPCn3oLmaoXSj3SI",
    authDomain: "covid-app-10291.firebaseapp.com",
    projectId: "covid-app-10291",
    storageBucket: "covid-app-10291.appspot.com",
    messagingSenderId: "369225141824",
    appId: "1:369225141824:web:fc561cbff40748c75619a5",
    measurementId: "G-S3SGM647TJ"
  };                

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function get(db) {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
}

get(db).then(console.log);

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    return this.optional(element) || regexp.test(value);
  },
  "Please check your input."
);

jQuery("#signup-form").validate({
  rules: {
    fname: {
      required: true,
      minlength: 3,
      regex: /^[A-Z][a-z0-9_-]{3,19}$/,
    },
    lname: {
      required: true,
      minlength: 3,
      regex: /^[A-Z][a-z0-9_-]{3,19}$/,
    },
    email: {
      email: true,
      required: true,
    },
    password: {
      required: true,
      minlength: 8,
      regex: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    },
    confirm_password: {
      required: true,
      equalTo: "#password",
    },
  },
  messages: {
    fname: {
      required: "First name is required.",
      minlength: "First name should have at least 3 characters.",
      regex: "First character should be uppercase.",
    },
    lname: {
      required: "Last name is required.",
      minlength: "Last name should have at least 3 characters.",
      regex: "First character should be uppercase.",
    },
    email: {
      required: "Email is required.",
      email: "Please enter a valid email address.",
    },
    password: {
      required: "Password is required.",
      minlength: "Enter a password with at least 8 characters.",
      regex:
        "Your password must contain a symbol, number, uppercase letter and lowercase letter.",
    },
    confirm_password: {
      required: "Confirm password is required.",
      equalTo: "Enter a password matching the previous input field.",
    },
  },
});

$("#signup-form").submit(function (e) {
  e.preventDefault();

  if ($("#signup-form").valid()) {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;
        await setDoc(doc(db, "users", userId), {
          fname,
          lname,
          email,
          password,
        }).then(() => (window.location = "home.html"));
        window.location = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }
});
