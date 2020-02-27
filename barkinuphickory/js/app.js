// Include Firebase plugin
Vue.use(Vuefire);

const router = new VueRouter({
    routes: [
            { path: '/', component: HomePage }, // default page
            { name: 'home', path: '/home', component: HomePage },
            { name: 'upload', path: '/upload', component: Upload },
            { name: 'services', path: '/services', component: Services },
            { name: 'pups', path: '/pups', component: Pups },
            { name: 'about-us', path: '/about-us', component: AboutUs },
            { name: 'profile', path: '/profile', component: Profile },
        ],
});

// Initialize App
var app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',
    router: router,
    // data: all the data for the app
    data: {
        newProfile: new UserProfile(),
        newImage: {
            image: new pupImage(),
        },
        images: [], // placeholder until firebase data is loaded
        showModal: false,
        authUser: null,
    },

    firestore: {
        // bind as an array by default
        images: db.collection('images'),
    },

    // methods: usually "events" triggered by v-on:
    methods: {

    },

    // computed: values that are updated and cached if dependencies change
    computed: {

    },

    //mounted:  called after the instance has been created,
    created: function() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('Signed in as: ', user);
                this.authUser = new User(user);
            } else {
                // User is signed out.
                console.log('Not signed in.');
                this.authUser = null;
            }
        });
    },

    // watch: calls the function if the value changes
    watch: {

    }

});

