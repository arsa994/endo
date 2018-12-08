function createUser(){
    // alert("kurac palac");
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    const auth = firebase.auth();

    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    alert("You have been successefuly registred");
    window.location.replace("http://localhost/themeforest/Stack%201.3.9/page.html")
    firebase.auth().signOut()
    .catch(e=>console.log(e.message));
  }
