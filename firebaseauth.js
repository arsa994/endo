

// var User = function(firstname,lastname,email,password,birthday,createdat, updatedat){
//   this.firstname=firstname;
//   this.lastname=lastname;
//   this.email=email;
//   this.password=password;
//   this.birthday=birthday;
//   this.createdat=createdat;
//   this.updatedat=updatedat;

// }



var userID;



function removeDummy() {
  var elem = document.getElementById('modal');
  elem.parentNode.removeChild(elem);
  return false;
 }



function createUser(){
  
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    const auth = firebase.auth();

    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    .catch(e=>console.log(e.message));
  }

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      removeDummy();
      userID=firebaseUser.email;
      console.log(userID);
      
    }else{
      console.log("not logged in");
    }

  });




 
function login(){
  
  var email = document.getElementById("email");
  var pass = document.getElementById("pass");
  firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(user=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var user = firebase.auth().currentUser;
        // var credential = firebase.auth.EmailAuthProvider.credential(email, pass);

        if(user != null){
    
          var email_id = user.email;
          console.log('uid',user.email);
          // window.location = "http://localhost/themeforest/Stack%201.3.9/page.html?id="+email.value;

          
          // window.location = "./a1.html";
    
    
          // alert('welcome')
        }
      }
       else {
        // alert(email+' Logged out '+pass);
    
      }
    });
    
    // location.reload();

})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // console.log(email.value);

    window.alert("eerrorr"+errorMessage);
    // ...
  });
}

function logout(){
  firebase.auth().signOut();
  location.reload();
}



  