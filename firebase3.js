
var db = firebase.firestore();


// db.collection("users").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });

// DEFINING

var firstname, lastname,picker, picker1, email, pickeddate, userName, numberInsulinsToday, numberGlucosesToday, numberInsulinsTotal, numberGlucosesTotal;

firstname = document.querySelector('.firstname');
lastname = document.querySelector('.lastname');
email = document.querySelector('.email');
picker = document.getElementById('picker');
picker1 = document.getElementById('picker1');
picker2 = document.getElementById('picker2');
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
datesGlu2 = [];
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
            birthday: picker.value,
            createdat: Date.now(),
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            updatedat: Date.now()
        })
            .then(function () {
                // console.log(typeof (firstname.value),lastname.value,email.value,`"${date.value}"`);
                console.log("Document successfully written!");
                // alert(pickeddate.getDate());
                console.log(picker.value);


                userName.push(firstname.value);
               
                // window.location = this.window.location;
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
    var dat = new Date(picker1.value);

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
            createdat: dat,
            userId: params,
            updatedat: Date.now(),
            val: unitsG.value
        })
            .then(function () {
                glucosesArr.push(unitsG.value);
                alert("Document successfully written!"+dat);
                location.reload();

                
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                
            });
        }
    

    
//ADD INSULINE 


function addInsulin() {
    var params;
    var dat = new Date(picker2.value);


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
           createdat: dat,
           userId: params,
           updatedat: Date.now(),
           val: unitsI.value
       })
           .then(function () {
               alert("Document successfully written!"+dat);
               location.reload();

               
           })
           .catch(function (error) {
               console.error("Error writing document: ", error);
               console.log("ERRORRRRRRRRRRR2");
               
           });

   }
    
    

document.getElementById('addGlucose').addEventListener("click", addGlucose);
document.getElementById('addInsulin').addEventListener("click", addInsulin);
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
