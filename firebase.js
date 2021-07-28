import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBza9iwtiKfI8BNbg4A4U_Ih-2FXmXTF5w",
    authDomain: "restaurante-confusion-fac90.firebaseapp.com",
    projectId: "restaurante-confusion-fac90",
    storageBucket: "restaurante-confusion-fac90.appspot.com",
    messagingSenderId: "115671548570",
    appId: "1:115671548570:web:4cb74d4da5dfb26b975523",
    measurementId: "G-WVMD9PKKET"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }