import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDO1VEnd5VmWd2OWQ9NQuh-ehNXcoPTy-w",
    authDomain: "demoproject-7cc0d.firebaseapp.com",
    databaseURL: "https://demoproject-7cc0d.firebaseio.com",
    projectId: "demoproject-7cc0d",
    storageBucket: "demoproject-7cc0d.appspot.com",
    messagingSenderId: "41428255556"
};

export const firebaseApp = firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;