var signUpForm = document.getElementById('crecheSignup');
var loginForm = document.getElementById('crecheLoginForm');
var db = firebase.database();

function addData(email, password, name) {
  console.log("addData function callled");
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    console.log('user signed in for data updation');
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: name}).then(function() {
      db.ref(user.uid).set({
          "details": {
            "name": user.displayName,
            "state": '',
            'city': '',
            'phone': '',
            'address': '',
            'bank': '',
            'accno': '',
            'ifsc': ''
          }
      });
      console.log("database created");
      window.location = '/creche/';
    }).catch(function(error) {
      console.log(error)
    });
    console.log('user profile updated');
  }).catch(function(error) {
    console.log(error.message);
  });
}

$('#crecheSignup').on('submit',function(evt) {
  evt.preventDefault();
  console.log('signup is callled');
  var name= signUpForm.elements.namedItem('name').value;
  var email=signUpForm.elements.namedItem('email').value;
  var password=signUpForm.elements.namedItem('pass').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    console.log('signup is confirmed');
    addData(email,password,name);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log('cant signup',errorMessage);
  });
});


$('#crecheLoginForm').on('submit',function (evt) {
  evt.preventDefault();
  console.log("login is called");
  var email=loginForm.elements.namedItem('email').value;
  var password=loginForm.elements.namedItem('pass').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    console.log("user logged in");
    window.location = "/creche/";
  }).catch(function(error) {
    console.log(error.message);
    window.alert("Please enter correct user credentials");
  });
});
