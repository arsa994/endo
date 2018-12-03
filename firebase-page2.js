var db = firebase.firestore();


// db.collection("users").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });

// DEFINING

var firstname, lastname, email, pickeddate, userName, numberInsulinsToday, numberGlucosesToday, numberInsulinsTotal, numberGlucosesTotal;

firstname = document.querySelector('.firstname');
lastname = document.querySelector('.lastname');
email = document.querySelector('.email');
pickeddate = document.querySelector('.datepicker');
numberGlucosesTotal = document.querySelector('.numberGlucosesTotal');
numberInsulinsTotal = document.querySelector('.numberInsulinsTotal');
numberGlucosesToday = document.querySelector('.numberGlucosesToday');
numberInsulinsToday = document.querySelector('.numberInsulinsToday');
imena = document.querySelectorAll('.userName');
myform = document.querySelector('.myForm');
slides = document.querySelector('.slides');
deleteUser = document.querySelector('.deleteUser');
unitsG = document.getElementById('unitsG');
unitsI = document.getElementById('unitsI');
var totalGlucose=0;
var totalInsulins=0;

userName = [];
glucosesArr = [];
insulinsArr = [];
datesGlu = [];
datesIns = [];

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
            birthday: pickeddate.value,
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

//ADD GLUCOSE 

 function addGlucose() {
    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
     db.collection("glucoses").doc("glucose"+Date.now()).set({
            createdat: Date.now(),
            userId: params,
            updatedat: Date.now(),
            val: unitsG.value
        })
            .then(function () {
                glucosesArr.push(unitsG.value);
                alert("Document successfully written!");
                location.reload();

                
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                console.log("ERRORRRRRRRRRRR");
                
            });
        }
    

    
//ADD INSULINE 
function datetoday(){
   var a = new Date();
   
   console.log(a.getTime()/1000+" danas");
}
datetoday();


function addInsulin() {
    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

    db.collection("insulin").doc("insulin"+Date.now()).set({
           createdat: Date.now(),
           userId: params,
           updatedat: Date.now(),
           val: unitsI.value
       })
           .then(function () {
               alert("Document successfully written!");
               location.reload();

               
           })
           .catch(function (error) {
               console.error("Error writing document: ", error);
               console.log("ERRORRRRRRRRRRR2");
               
           });

   }
    
    

document.getElementById('addGlucose').addEventListener("click", addGlucose);
document.getElementById('addInsulin').addEventListener("click", addInsulin);





// // GET INSULIN AND GLUCOSE 
function getData(){
    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

// var docGlu = db.collection("users").doc(params).collection("glucose").doc("glucoseId");
// var docIns = db.collection("users").doc(params).collection("insulin").doc("insulinId");
// var dd = new Date();

db.collection("glucoses").where("userId", "==", params)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const datum = doc.data().createdat;
            // const values = parseInt(doc.data().val);
            let numberG=0;
            if((Date.now()-datum)/1000 < 86400){
                datesGlu.push(doc.data().val);
                for (let i = 0; i < datesGlu.length; i++) {
                    numberG+=parseInt(datesGlu[i]);
                    
                }
               
            }
            numberGlucosesToday.textContent = numberG;

            console.log(typeof numberG);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

db.collection("insulin").where("userId", "==", params)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const datum = doc.data().createdat;
            // const values = parseInt(doc.data().val);
            let numberI=0;
            if((Date.now()-datum)/1000 < 86400){
                datesIns.push(doc.data().val);
                for (let i = 0; i < datesIns.length; i++) {
                    numberI+=parseInt(datesIns[i]);
                    
                }
               
            }
            numberInsulinsToday.textContent = numberI;

            console.log(typeof numberG);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


}


// docGlu.get().then(function (doc) {
//     if (doc.exists) {
//         glucosesArr.push((doc.data()));
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



getData();



function loadUser(){

    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
    

var docRef = db.collection("users").doc(params);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        firstname.value = doc.data().firstname;
        lastname.value = doc.data().lastname;
        email.value = doc.data().email;
        // date.value = doc.data().createdat;


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}
loadUser();

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


function calcGlucose(){
    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

db.collection("glucoses").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", (doc.data()).firstname);
        glucosesArr.push(doc.data());

    });
    for(let i=0;i<glucosesArr.length;i++){
        if(glucosesArr[i].userId == params){
            var num = parseInt(glucosesArr[i].val);
            totalGlucose+=num;
            numberGlucosesTotal.textContent=totalGlucose;
           
        }
        }
        console.log(totalGlucose);


});
}
function calcInsulin(){
    var params;

    if (location.search) {
        var parts = location.search.substring(1).split('?');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            params = nv[1];
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

db.collection("insulin").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", (doc.data()).firstname);
        insulinsArr.push(doc.data());

    });
    for(let i=0;i<insulinsArr.length;i++){
        if(insulinsArr[i].userId == params){
            var num = parseInt(insulinsArr[i].val);
            totalInsulins+=num;
            numberInsulinsTotal.textContent=totalInsulins;
           
        }
        }
        console.log(totalInsulins);


});
}


calcInsulin();
calcGlucose();

function klik(){
    var params;
        

if (location.search) {
    var parts = location.search.substring(1).split('?');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        params = nv[1];
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
    console.log(params);
    window.location = "http://localhost/themeforest/Stack%201.3.9/blog-articles-list-minimal.html?="+params;

}