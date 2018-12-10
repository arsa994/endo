
     const auth = firebase.auth();


  function createUser(){
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    
   
    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value).then(() => {
      alert("You have been successefuly registred"+email.value+" | "+pass.value);
      window.location.replace("http://localhost/themeforest/Stack%201.3.9/page.html")
      firebase.auth().signOut()
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  