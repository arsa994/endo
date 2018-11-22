var db = firebase.firestore();


// db.collection("users").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });

// DEFINING

var firstname, lastname, email, date, userName, numberInsulinsToday, numberGlucosesToday, numberInsulinsTotal, numberGlucosesTotal;

firstname = document.querySelector('.firstname');
lastname = document.querySelector('.lastname');
email = document.querySelector('.email');
date = document.querySelector('.datepicker');
numberGlucosesTotal = document.querySelector('.numberGlucosesTotal');
numberInsulinsTotal = document.querySelector('.numberInsulinsTotal');
numberGlucosesToday = document.querySelector('.numberGlucosesToday');
numberInsulinsToday = document.querySelector('.numberInsulinsToday');
imena = document.querySelectorAll('.userName');
myform = document.querySelector('.myForm');
slides = document.querySelector('.slides');
deleteUser = document.querySelector('.deleteUser');

userName = [];

var data = {
    totals: {
        glucose: 0,
        insulin: 0
    }
}

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// POST DATA

async function storeData() {

    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        //   email.value=email.value;
        return false;

    }

    try {
        await db.collection("users").doc(`${email.value}`).set({
            birthday: date.value,
            createdat: Date.now(),
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            updatedat: Date.now()
        })
            .then(function () {
                // console.log(typeof (firstname.value),lastname.value,email.value,`"${date.value}"`);
                console.log("Document successfully written!");

                userName.push(firstname.value);
                // console.log(userName[0]);
                // console.log(userName.length);
                window.location = this.window.location;
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                console.log("ERRORRRRRRRRRRR");

            });

    }
    catch (error) {
        alert("Email is not correct!")
    }
}



// // GET INSULIN AND GLUCOSE function getData(){

// var docGlu = db.collection("users").doc("arsa@car.com").collection("glucose").doc("glucoseId");
// var docIns = db.collection("users").doc("arsa@car.com").collection("insulin").doc("insulinId");

// docGlu.get().then(function (doc) {
//     if (doc.exists) {
//         numberGlucosesToday.textContent = doc.data().value;
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function (error) {
//     console.log("Error getting document:", error);
// });

// docIns.get().then(function (doc) {
//     if (doc.exists) {
//         numberInsulinsToday.textContent = doc.data().value;
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function (error) {
//     console.log("Error getting document:", error);
// });



// // document.querySelector('.level').addEventListener('click', getData);


// // GET ALL USERS
// db.collection("users").get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", (doc.data()).firstname);
//         userName.push((doc.data()).firstname);


//         // console.log(userName.length);

//     });
//     for (let s = 0; s < userName.length; s++) {
//         if (userName[s]) {
//             var markup = 
//             `<li class="col-md-2">
//                 <div class="dropdown__content"> 
//                     <i class="icon--lg icon-Checked-User"></i>
//                         <span id="userName" class="userName h5 color--primary">${userName[s]}</span>
//                             <ul class="menu-vertical">
//                                 <li> <a class="btn btn--primary type--uppercase" href="./page-accounts-settings.html">
//                                     <span class="btn__text">update info</span> </a> <span class="block type--fine-print">
//                                     </span>
//                                 </li>
//                                     <li class="deleteUser">Delete</li>
//                             </ul>
//                 </div>
//             </li>`
//             // slides.insertAdjacentHTML("afterbegin", markup);
//             console.log(userName[s]);
//         }
//         else {
//             // image without users
//         }
//     }
   


// });

// //DELETE USER
// function removing(){
// db.collection("users").doc(`${email.value}`).delete().then(function() {
//     console.log("Document successfully deleted!");
// }).catch(function(error) {
//     console.error("Error removing document: ", error);
// });
// }
// deleteUser.addEventListener('click', removing)
document.getElementById('buton').addEventListener('click', storeData);
