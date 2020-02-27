/*
 * Pages/views need variables to reference the component
 * but are otherwise treated the same as components.
 * Again... think components, not templates/views
*/

const HomePage = Vue.component('HomePage', {
    props: {
        authUser: {required: true},
    },

    template: `
        <div class="home page">

            <div class="row p-0 m-0">

            <div class="col-sm-12 col-lg-6 pt-2 px-5">
                <h1 class="customheader text-uppercase text-white text-center">
                    Barkin' Up Hickory</h1>
                <p class="customtext text-center text-white">
                    <br>Stop by or call today for all your pups grooming and boarding needs!</p><br><br><br>
                   <div class="row">
                    <div class="col-lg-6 col-sm-12 text-white text-center">
                        <h5>phone</h5><hr>
                        (262) 691-2010<br><br><br>
                        <h5>Address</h5><hr>
                        1271 Hickory Street<br>
                        Pewaukee, WI 53072
                    </div>
                   <div class="col-lg-6 col-sm-12">
                     <div class="text-white text-center">
                    <h5>hours</h5><hr>                    
                    <h6>Monday-Friday</h6>
                    6:00 am – 7:00 pm<br><br>
                    <h6>Saturday</h6>
                    8:00 am – 7:00 pm <br><br>
                    <h6>Sunday</h6>  
                    8:00 am – 3:00 pm<br>
                        </div>
                    </div> 
                    
                  </div>
                
            </div>
            <div class="col-sm-12 col-lg-6 pt-2">
                <div class="bd-example carouselsize rounded">
                    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner carousel-size border border-dark rounded">
                            <div class="carousel-item active" data-interval="5000"> <img src="images/pup-in-snow-min.jpg" class="d-block w-100" alt="brown and white dog with snow on face">
                                <div class="carousel-caption d-none d-md-block textcar3">
                                    <h4 class="text-uppercase">January's winner</h4>
                                </div>
                            </div>
                            <div class="carousel-item" data-interval="5000"> <img src="images/pup-christmas-min.jpg" class="d-block w-100" alt="dog wearing santa suit infront of christmas lights">
                                <div class="carousel-caption d-none d-md-block textcar1">
                                    <h4 class="text-uppercase">December's Winner</h4>
                                </div>
                            </div>
                            <div class="carousel-item" data-interval="5000"> <img src="images/pup-min.jpg" class="d-block w-100" alt="puppy laying on pink blanket">
                                <div class="carousel-caption d-none d-md-block textcar2">
                                    <h4 class="text-uppercase">November's Winner</h4>
                                </div>
                            </div>                          
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                </div>
                <div class="text-center text-white pt-3">
                <h6>Upload now for a chance to be our next winner!</h6>
                 <button type="button" class="btn btn-outline-light" @click="$router.push('upload')">Upload</button>
                 
                 
                </div>
            </div>
        </div>
    </div>

    `,
});

const Upload = Vue.component('Upload', {
    props: {
        authUser: {required: true},
    },

    data: function () {
        return {
            newImage: new pupImage(),
        };
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },

    methods: {

        addNewImage() {
            //if...

            // let theImage = this.newImage;
            // theImage.createdBy = this.authUser.uid;
            let theImage = {
                name: this.newImage.name,
                createdBy: this.authUser.uid,
                status: 'needs love',
                statusPoints: 100,
                likes: 0,

            }

            //this is a promise, does not need commas
            db.collection('users').doc(this.authUser.uid).collection('images')
                // db.collection('images')
                .add(theImage)
                .then((docRef) => {
                    console.log('Document Added:', docRef);
                    //add an image with the same id
                    this.addImage(docRef.id);
                })

                .catch((error) => {
                    console.error('Error uploading', error);

                    //todo let user know
                });
        },
        addImage(docId) {
            // docId and image file are required
            if (!docId || !this.newImage.image) {
                return false;
            }

            // create a filename we know will be unique
            let theImage = this.newImage;
            let allowedTypes = ['jpg', 'png', 'gif'];
            let extension = theImage.image.name.toLowerCase().split('.').pop()

            // validate extension
            if (allowedTypes.indexOf(extension) < 0) {
                // invalid extension

                // let the user know...
                // TODO: let the user know WITHOUT alerts
                alert('Invalid file type.');

                return false;
            }

            // validate size (less than 200KB
            if (theImage.image.size > (200 * 1024)) {
                // file too large

                // let the user know...
                // TODO: let the user know WITHOUT alerts
                alert('File too large. 200KB max');

                return false;
            }

            // add image to firebase
            //storage.child('users/' + docId) this is for long paths
            storage.child('users').child(this.authUser.uid).child('images').child(docId)
                .put(theImage.image)
                .then((snapshot) => {
                    console.log('Image Added', snapshot)

                    //clear the form
                    theImage.image = null;


                    //update the user with image url
                    return snapshot.ref.getDownloadURL()
                })
                .then((url) => {
                    return db.collection('users').doc(this.authUser.uid).collection('images').doc(docId).update({image: url}); //collection('users').doc(this.authUser.uid).collection('images')
                })
                .then((docRef) => {
                    console.log('Updated with image');
                    //clear text box
                    document.getElementById('name').value = "";
                })
                .catch((error) => {
                    console.error('Error adding image', error)
                })
        },
        submitted() {
            $snack = document.getElementById("snackbar");

            // Get the snackbar DIV
            var snack = document.getElementById("snackbar");

            // Add the "show" class to DIV
            snack.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                snack.className = snack.className.replace("show", "");
            }, 3000);

        },
        // clearText(){

        // document.getElementById('name').value = "";
        // document.getElementById('name').target.reset();
        // document.getElementById('name').preventDefault();

        // document.getElementById("name").reset();
        // }

    },

    template: `
        <div class="create page">
            <h2 class="text-white text-center">Upload Your Pup</h2>
            <br>
            <div class="row">
            
                <div class="col-lg-6 col-md-12 px-5">
                <h4 class="text-center text-white">🐶 Pup of the month upload!</h4><hr> 
                   <b-form-group label="" label-for="image">                   
                        <b-form-input id="name" v-model="newImage.name" ref="newImage" placeholder="Enter your pups name" ></b-form-input><br>        
                        <b-form-file id="image" v-model="newImage.image" ref="newImage"></b-form-file><br><br>
                                            
                   <button type="button" class="btn btn-outline-light float-right" @click="addNewImage(); submitted();">Submit</button>
                   </b-form-group>
                </div>
                
                <div class="col-lg-6 col-md-12 px-5">
                <h4 class="text-center text-white">🎅 Santa Pups Upload!</h4><hr> 
                   <b-form-group label="" label-for="image">
                        <b-form-input id="nameSanta" placeholder="Enter your pups name"></b-form-input><br> 
                        <b-form-file id="image" v-model="newImage.image" ref="newImage"></b-form-file><br><br>
                        
                    <button type="button" class="btn btn-outline-light float-right" @click="addNewImage(); submitted();">Submit</button>
                   </b-form-group>                    
                </div>
            </div>
            <div class="row pt-5">
                <div class="col-12 text-white text-center">
                    Remember to upload your best! Voters only have 3 likes to give per contest!
                </div>
            </div>
            <div id="snackbar">Upload Successful!</div>
        </div>
    `,
});

const Services = Vue.component('Services', {
    props: {
        authUser: {required: true},
    },

    data() {
        return {
            images: []
        }
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },


    firestore: {
        // bind as an array by default
        images: db.collectionGroup('images'),
    },
    template: `

        <div class="potlucks page text-white">
        
        
            <h2 class="text-white text-center">Services</h2>
            <div class="text-white px-5 pt-3">
            <h5 class="text-center">Doggy Daycare <small><i id="show-modal" class="fas fa-cart-plus cursor-style" 
            data-toggle="modal" data-target="#exampleModalCenter"></i></small></h5>
          
            
          
            
             <div class="row justify-content-center">
                <p class="col-8 text-white pt-3 px-5">You won’t believe how much fun and how tired your dog will be after a doggy daycare 
                session at Barkin’ Up Hickory! With doggy daycare your dog gets to be social with dogs and people, play with 
                lots of toys and in the pool, and nap on our couch and chairs if they’d like to!
                <br><br>
                Daily list of activities: Morning meet-and-sniff; all-day indoor/outdoor access; couch and chair access 
                (first-come first-serve); constant playtime with dogs; all-day attention and petting from people; nap 
                time whenever they’re tired; and treats! We don’t have mandatory nap times, so your dog won’t be put in 
                a kennel. Here at Barkin’ Up Hickory your dog gets to play, relax, have attention, nap or all of the above!
                <br><br>
                </p>
             </div>
                <div class="text-center"><strong>
                    Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 Dog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 Dogs
                    </strong><br>
                    Full Day&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$29&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$53&nbsp;&nbsp;&nbsp;
                    <br>
                    5 Pack&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$135&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$250&nbsp;
                    <br>
                    10 Pack&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$250&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$475&nbsp;
                    <br>
                    Month&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$435&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$750&nbsp;
                    
                     <br><br>
                    
                    <strong>Doggy Daycare + Overnight Boarding</strong>
                    <br>
                    1 Dog: $44  &nbsp;&nbsp; 
                    <br>
                    2 Dogs: $80
                    <br><br>
                    <small>*Prices do not include tax</small></p>
                </div>
                    <hr>
                <h5 class="text-center">Hound Hotel <small><i class="fas fa-cart-plus cursor-style" 
                data-toggle="modal" data-target="#exampleModalCenter"></i></small></h5>
                
                <div class="row justify-content-center">
                    <p class="col-8 text-white pt-3 px-5">Barkin’ Up Hickory offers a unique option for your dog’s vacation while you’re out of town. Instead of 
                    traditional chain-link cages, your dog will get to relax in his own handmade kennel for a more comfortable 
                    and enjoyable stay. You can choose from one of our three fantastic rooms: the Cowboy Room, Beach Room, and 
                    Princess Room! Your dog will only be kenneled at night after an exciting and exhausting day of playing with 
                    the other dogs in daycare. Unlike other dog daycares, we’re open weekends. So instead of sitting in their 
                    kennel all weekend, your pal will get to play on Saturdays and Sundays too! We know that your dog will have 
                    a great time and love coming back to Barkin’ Up Hickory! Furthermore, we know that you will love that we take 
                    such good care of your best friend and give you peace-of-mind. So whether you’re from Waukesha, Pewaukee, 
                    Delafield, Hartland, Brookfield, or Oconomowoc, give us a call or come in for a tour of our unique doggy 
                    daycare and boarding facility.<br><br>
                    </p>
                </div>
                
                <div class="text-center">
                    <strong>Nightly</strong><br>
                    1 Dog              $44&nbsp;
                    <br>
                    2 Dogs             $80&nbsp;
                   
                    <br><br>
                <div class="row justify-content-center">
                    <p class="col-8 text-white pt-3 px-5">
                        <small>
                        *Nightly rates include access to our doggy daycare! Boarding rates are for a 24 hour period. $3/hour 
                        for each additional hour, up to the daycare rate. Before being scheduled for boarding, your dog must 
                        first come in for at least one day of daycare to get them acclimated and be sure that this is a suitable 
                        and safe environment for them.
                        <br>
                        *Because of continued abuse, we are now enforcing our cancellation and no-show policy. If we are not 
                        notified at least 72 hours in advance of your expected arrival, you will be charged for your stay in full.
                        <br>
                        *Prices do not include tax</small> 
                        </p>
                </div>
                    
                </div>          
            <hr>
            <div class="text-center">
            <h5>Grooming <small><i class="fas fa-cart-plus cursor-style" 
            data-toggle="modal" data-target="#exampleModalCenter"></i></small></h5>
                <div>
                <p>Nail Trim: $10 – $15&nbsp;&nbsp;<br>
                Painted Nails: $10&nbsp;&nbsp;<br>
                Anal Glands: $10&nbsp;&nbsp;<br>
                Furminator: $10 – $30&nbsp;</p>
                </div><hr>
            <h5>Baths <small><i class="fas fa-cart-plus cursor-style" 
            data-toggle="modal" data-target="#exampleModalCenter"></i></small></h5>
                <div>
                <p>
                Small: $20 – $35&nbsp;&nbsp;<br>
                Medium: $30 – $45&nbsp;<br>
                Large: $50 – $60&nbsp;&nbsp;</p>
                </div><hr>
            <h5>Additional Grooming <small><i  class="fas fa-cart-plus cursor-style" 
            data-toggle="modal" data-target="#exampleModalCenter"></i></small></h5>
                <div>
                <p>
                Tea Cups: $35 – $40&nbsp;<br>
                Small: $40 – $45&nbsp;&nbsp;<br>
                Medium: $50 – $60&nbsp;<br>
                Giant: $85 – $130&nbsp;&nbsp;<br>
                *Call for a quote! </p>
                <p><small>*Pricing depends on size and length</small></p>
            </div>
         </div>

      </div>
             
<!--             <modal></modal>-->
              <modal v-for="image in images" :image="image" :key="image.id"></modal>
<div id="snackbar">Code sent to email!</div>

</div>
    `,

});

const Pups = Vue.component('Pups', {
    props: {
        authUser: {required: true},
    },

    data() {
        return {
            images: []
        }
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },


    firestore: {
        // bind as an array by default
        images: db.collectionGroup('images'),
    },
    template: `
        <div class="potlucks page">         
            <h2 class="text-white text-center">Puppers</h2>            
            <div class="row p-0 m-0">
            <div class="col-sm-12 col-lg-6 pt-5 px-5">
                <h1 class="customheader text-uppercase text-white text-center">
                    Enter your pup for a chance to win pup of the month!</h1>
                <p class="customtext text-center text-white pt-4">Enter a picture of your cute pup to win Pup of the Month!
                    <br>Winner's receive 30lbs of dog food for free!
                    <br><small>All participants must be signed in to qualify for Pup of the Month.</small> </p>
            </div>
            <div class="col-sm-12 col-lg-6 pt-4">
                <div class="bd-example carouselsize rounded">
                    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner carousel-size border border-dark rounded">
                             <div class="carousel-item active" data-interval="5000"> <img src="images/pup-in-snow-min.jpg" class="d-block w-100" alt="brown and white dog with snow on face">
                                <div class="carousel-caption d-none d-md-block textcar3">
                                    <h4 class="text-uppercase">January's winner</h4>
                                </div>
                            </div>
                            <div class="carousel-item" data-interval="5000"> <img src="images/pup-christmas-min.jpg" class="d-block w-100" alt="dog wearing santa suit infront of christmas lights">
                                <div class="carousel-caption d-none d-md-block textcar1">
                                    <h4 class="text-uppercase">December's Winner</h4>
                                </div>
                            </div>
                            <div class="carousel-item" data-interval="5000"> <img src="images/pup-min.jpg" class="d-block w-100" alt="puppy laying on pink blanket">
                                <div class="carousel-caption d-none d-md-block textcar2">
                                    <h4 class="text-uppercase">November's Winner</h4>
                                </div>   
                             </div>                         
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                </div>
            </div>
        </div>        
            <div>
                <b-container fluid>
                    <user-image v-for="image in images" :image="image" :key="image.id"></user-image>
                </b-container>
            </div>           
        </div>
    `,

});

const AboutUs = Vue.component('AboutUs', {
    props: {
        authUser: {required: true},
    },

    template: `
        <div class="potlucks page">
            <h2 class="text-white text-center">About us</h2>
            <div class="row justify-content-center">
            <p class="col-8 text-white pt-3 px-5">Barkin’ Up Hickory was officially founded in the summer of 2011 but had several obstacles to overcome. 
            Strangely enough, getting a loan, thanks to Waukesha State Bank, was not one of those obstacles. However, 
            finding the ideal location and a willing landlord for a doggy daycare and boarding facility were surprisingly 
            difficult. But thanks to Mark Gorski at Judson Realty, The Village of Pewaukee, and Jerry Smiltneek, Barkin’ 
            Up found a great home on Hickory Street. It took nearly nine months to get Barkin’ Up Hickory open, but we’re 
            extremely excited to get to know you and your best friend.
            <br><br>
            My name is Ben Nader and I am the proprietor of Barkin’ Up Hickory, a doggy daycare and comfortable kennels facility. 
            I was born and raised in Waukesha, and graduated from Waukesha North H.S. as well as UW-Whitewater. I’ve wanted to own a 
            business since I was 10 and have had a love for dogs since long before that. I can’t even imagine a life without our furry 
            friends, so this path seemed like the perfect opportunity to pursue a life and career that will make me and those around 
            me very happy. Shortly after college I moved to Los Angeles where I lived for 2 1/2 years, but realized that Lake Country 
            in Wisconsin was where I belonged and where I truly wanted to be. I love the Pewaukee, Delafield, Hartland, and Waukesha 
            areas. I don’t even know how to tell you how happy and excited I am that this dream is becoming a reality, and I am looking 
            forward to earning your trust, as well as your dog’s trust.
            <br><br>
            Along with those I mentioned above, I’d like to thank the following people for helping me reach this goal. Without them 
            Barkin’ Up Hickory would not exist: Dave and Pam Nader, Sarah and Matt Seymour, Ann Nader and Steve Cobble, Scott Henry, 
            Catherine Kamei, The Geis Family, The Miley Family, Chris Roginski, Tim and Heather Leffler, Petlicious Dog Bakery, and 
            my friends at deviantART.</p>
            </div>
            <hr>
            <div class="col-12 text-center text-white">
            <h6>Contest rules</h6>
            <ul class="list-unstyled">
                <li>Participants must be signed in to upload and vote.</li>
                <li>Only three likes per user per contest.</li>
                <li>Code from points redeemed will be sent to users email.</li>
                <li>If you do not receive your code with in 24 hours please contact <a href="mailto:me@pup.com" style="color: #85c140;">us</a>.</li>
                <li>Services with a <i class="fas fa-cart-plus"></i> are eligible for point redemption.</li>
                <li><router-link to="/services" style="color: #85c140;">Redeem</router-link> your points now!</li>
                <li>...</li>
                <li>...</li>
            </ul>
           </div> 

        </div>
    `,

});

const Profile = Vue.component('Profile', {
    props: {
        authUser: {required: true},
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },

    method: {
        hideIt: function () {
            $(".customHide").hide();
        },
        points: function () {

            var docRef = db.collection('users').doc(this.authUser.uid).collection("images").doc("14F8izfRaOk7mKkyjH0e");

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        },

    },




    template: `
        <div class="potlucks page text-white" onload="console.log('HELLO')">
            
            
            <div v-if="loggedIn">
            
            <h2 class=" text-center">Hello {{authUser.displayName}}</h2>
            <div class="row">
                <div class="col-lg-2 col-md-9 col-sm-12 mt-4 ml-5">
                
                     <b-img :src="authUser.photoURL" class="" width="200" height="200"></b-img>
                </div>
                <div class="col-lg-5 col-md-9 col-sm-12 ml-2 mt-4">
                     <h1 class="text-white" data-toggle="tooltip" data-placement="bottom" 
                     title="Status is based on likes given to entries that win pup of the month.">
                     Status: Elite Selector</h1><hr>
                     <h6>Looks like you know how to chose wisely!</h6>
                     <p>Don't forget to vote monthly to keep your status!</p>
                </div>
                <div class="col-lg-3 col-md-9 col-sm-12 ml-5 mt-4">
                <h4>Status points: <points :authUser="authUser"></points></h4>
                <h6><router-link to="/services" style="color: #85c140;">Redeem</router-link> now</h6><br>
                <p>*Points may be redeemed on the services page. 
                <br>*A code will be sent via email to use at time of payment.
                <br>*Points are earned by voting each contest and/or winning contests.</p>
            
                
</div>
            </div>
            <div class="row">
                <div class="col-lg-2 col-md-9 col-sm-12 mt-5 ml-5">
                    <h4>Likes left: 0</h4><br>
                    
                    <h6>Special Contest</h6>
                    <p class="text-uppercase">Likes left: 3</p>
                    <p>Voters only receive 3 likes per contest to give</p>
                    
                   
                </div>
                <div class="col-lg-9 col-md-9 col-sm-12 mt-5 ml-2">
                    <p>
                            *Elite Selector has a great eye for winners.<br>
                            *Established Selector has a good eye but not quiet the best.<br>
                            *Novice Selector might need to chose more wisely.<br>
                            *Awkward Selector seems to never get it right...
                    </p>
                </div>
            </div>
                        
            </div>
            
            <div v-else cols="9" class="mx-auto">
             <b-alert variant="danger" class="mt-5 w-100" show>Please log in.</b-alert>
            </div>
        </div>
    `,

});

