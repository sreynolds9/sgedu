// Models
var User = function(firebaseUser){
    let m = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
    }

    if(firebaseUser){
        m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
        m.email = firebaseUser.email ? firebaseUser.email : '';
        m.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : '';
        m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }

    return m;
};

var UserProfile = function () {
    return {
        displayName: '',
        email: '',
        photoURL: '',
        likes: '',
        totalLikes: 0,
        statusPoints: '',
        uid: '',
    }
}

var pupImage = function(){
    return {
        name: '',
        image: null,
        createdBy: '',
        likes: 0,
        status: '',
        statusPoints: 0,
        pom: false,
        description: '',
    }
};

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAHRk7Bz6WNw3Wv9e5YTYf1VhC8vPe6cyM",
    authDomain: "fir-demo-982c8.firebaseapp.com",
    databaseURL: "https://fir-demo-982c8.firebaseio.com",
    projectId: "fir-demo-982c8",
    storageBucket: "fir-demo-982c8.appspot.com",
    messagingSenderId: "218213408603",
    appId: "1:218213408603:web:8f454faaf1d79d9e6dc47e"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage().ref();
