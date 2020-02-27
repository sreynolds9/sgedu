Vue.component('userImage', {
    props: {
        image: {type: Object, required: true},
    },

    data() {
        return {
            newImage: new pupImage(),
            showDetails: false,
        }
    },

    methods: {
        addToScore() {
            console.log(this.image);
            // more info on transactions:
            // https://firebase.google.com/docs/firestore/manage-data/transactions#transactions
            db.runTransaction((transaction) => {
                let docRef = db.collection('users').doc(this.image.createdBy).collection('images').doc(this.image.id);

                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(docRef).then(function (doc) {
                    if (!doc.exists) {
                        throw "Document does not exist!";
                    }

                    // Add score to existing score
                    var newScore = parseInt(doc.data().likes + 1);
                    var newPoints = parseInt(doc.data().statusPoints + 10);
                    transaction.update(docRef, {likes: newScore});
                    transaction.update(docRef, {statusPoints: newPoints});
                    if (newScore == 0) {
                        //needs love
                        transaction.update(docRef, {status: 'needs love'});
                    } else if (newScore > 0 && newScore < 5) {
                        //cute
                        transaction.update(docRef, {status: 'cute'});
                    } else if (newScore > 4 && newScore < 10) {
                        // adorable
                        transaction.update(docRef, {status: 'adorable'});
                    } else if (newScore > 9 && newScore < 20) {
                        // gorgeous
                        transaction.update(docRef, {status: 'gorgeous'});
                    } else if (newScore > 19 && newScore < 35) {
                        // flawless
                        transaction.update(docRef, {status: 'flawless'});
                    } else {
                        // legendary
                        transaction.update(docRef, {status: 'legendary'});
                    }
                });
            }).then(function () {
                console.log("Transaction updated!");
            }).catch(function (error) {
                console.error("Transaction failed: ", error);
            });

        },

    },

    template: `
    <div class="container pt-5">
        <b-card class="image mb-3 imagetop h3" :header="image.name" header-text-variant="white">
            <b-card-text>
                <b-row class="bottom-divider">
                    <b-col md="6" class="d-flex flex-column">
                     
<!--                        put this v if on everything, wont show anything if there is nothing to show              -->
<!--                        <div v-if="image.description" class="description">{{image.description}}</div>-->
    
                    <b-col md="6">
                        <b-img :src="image.image" class="image-image"></b-img>
                    </b-col>
                    <br>
                      
                        <div class="buttons p-3 ">
                            <b-button size="sm" variant="light" @click="addToScore()"><i class="fas fa-thumbs-up"></i></b-button>                           
                        </div>
                        <p class="text-white text-uppercase pl-3 h6">Likes: {{image.likes}}</p>
                        <p class="text-white text-uppercase pl-3 h5">Status: {{image.status}}</p>
                    </b-col>
                 
                </b-row>
            </b-card-text>
        </b-card>
    </div>
    `,

});

Vue.component('modal', {
    props: {
        image: {type: Object, required: true},
    },

    data() {
        return {
            newImage: new pupImage(),
            // showDetails: false,
        }
    },

    methods: {
        addToScore() {
            console.log(this.image);
            // more info on transactions:
            // https://firebase.google.com/docs/firestore/manage-data/transactions#transactions
            db.runTransaction((transaction) => {
                let docRef = db.collection('users').doc(this.image.createdBy).collection('images').doc(this.image.id);

                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(docRef).then(function (doc) {
                    if (!doc.exists) {
                        throw "Document does not exist!";
                    }

                    // Add score to existing score
                    // var newScore = parseInt(doc.data().likes + 1);
                    var newPoints = parseInt(doc.data().statusPoints - 100);
                    // transaction.update(docRef, {likes: newScore});
                    transaction.update(docRef, {statusPoints: newPoints});
                    // if (newScore == 0) {
                    //     //needs love
                    //     transaction.update(docRef, {status: 'needs love'});
                    // } else if (newScore > 0 && newScore < 5) {
                    //     //cute
                    //     transaction.update(docRef, {status: 'cute'});
                    // } else if (newScore > 4 && newScore < 10) {
                    //     // adorable
                    //     transaction.update(docRef, {status: 'adorable'});
                    // } else if (newScore > 9 && newScore < 20) {
                    //     // gorgeous
                    //     transaction.update(docRef, {status: 'gorgeous'});
                    // } else if (newScore > 19 && newScore < 35) {
                    //     // flawless
                    //     transaction.update(docRef, {status: 'flawless'});
                    // } else {
                    //     // legendary
                    //     transaction.update(docRef, {status: 'legendary'});
                    // }
                });
            }).then(function () {
                console.log("Transaction updated!");
            }).catch(function (error) {
                console.error("Transaction failed: ", error);
            });

        },

            emailed() {
                $snack = document.getElementById("snackbar");

                // Get the snackbar DIV
                var snack = document.getElementById("snackbar");

                // Add the "show" class to DIV
                snack.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function () {
                    snack.className = snack.className.replace("show", "");
                }, 3000);

            }


    },

    template: '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\n' +
        '  <div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '          <span aria-hidden="true">&times;</span>\n' +
        '        </button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <h5 class="text-black-50 text-center">Please confirm you would like to redeem <span style="color: #85c140"> 100</span> points?</h5>' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
        '        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addToScore(); emailed();">Confirm</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>'
});

Vue.component('navigation', {
    props: {
        authUser: {required: true},
    },

    methods: {
        login() {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth()
                //this will change when wanting to sign in with google or whatever
                //.signInWithEmailAndPassword(email, password)
                .signInWithPopup(provider)
                //if not using 3rd party then you would not need this then statement
                .then(function (result) {
                    //gives you access token for the provider (3rd party integrations)
                    let token = result.credential.accessToken;
                })
                .catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    console.log(error);
                    //todo: let the user know
                    //document.getElementById('message').innerHTML =  'Error: ' + errorMessage;
                });
        },

        logout() {
            firebase.auth().signOut();
        },
    },

    template: `
        <ul class="list-unstyled components">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/services">Services</router-link></li>
            <li><router-link to="/pups">Pups</router-link></li>
            <li><router-link to="/upload">Upload</router-link></li>            
            <li><router-link to="/about-us">About Us</router-link></li>
            <li><router-link to="/profile">Profile</router-link></li>
            <li v-if="authUser"><a href="#" @click.prevent="logout">Logout</a></li>
            <li v-else><a href="#" @click.prevent="login">Login</a></li>
        </ul>
    `,

});

Vue.component('points', {
    data(){
        return {
            images: []
        }
    },

    props: {
        authUser: {required: true},
    },

    firestore() {
        return {
            // bind as an array by default
            images: db.collection('users').doc(this.authUser.uid).collection("images"),
        }
    },

    computed: {
        total(){
            let points = 0;
            for(let i in this.images){
                // console.log(this.images[i]);
                points += this.images[i].statusPoints;
            }

            return points;
        }
    },

    template: `
        <span>{{total}}</span>
    `
});

