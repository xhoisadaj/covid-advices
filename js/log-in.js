import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBmV9LbLxIxbsS4zWoSPCn3oLmaoXSj3SI',
  authDomain: 'covid-app-10291.firebaseapp.com',
  projectId: 'covid-app-10291',
  storageBucket: 'covid-app-10291.appspot.com',
  messagingSenderId: '369225141824',
  appId: '1:369225141824:web:fc561cbff40748c75619a5',
  measurementId: 'G-S3SGM647TJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// async function get(db) {
//   const usersCol = collection(db, "users");
//   const usersSnapshot = await getDocs(usersCol);
//   const usersList = usersSnapshot.docs.map((doc) => doc.data());
//   return usersList;
// }

// get(db).then(console.log);

(() => {
  const data = localStorage.getItem('covid-app.user');
  if (data) {
    window.location = 'home.html';
  }
})();

const labels = document.querySelectorAll('.form-control label');

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join('');
});

jQuery('#login-form').validate({
  rules: {
    email: {
      email: true,
      required: true,
    },
    password: {
      required: true,
      minlength: 8,
      regex: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    },
  },
  messages: {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Enter a password with at least 8 characters.',
      regex:
        'Your password must contain a symbol, number, uppercase letter and lowercase letter.',
    },
  },
});

$('#login-form').submit(function (e) {
  e.preventDefault();

  if ($('#login-form').valid()) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem('covid-app.user', JSON.stringify(email, password));
        window.location = 'home.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }
});

$.validator.addMethod(
  'regex',
  function (value, element, regexp) {
    return this.optional(element) || regexp.test(value);
  },
  'Please check your input.'
);
