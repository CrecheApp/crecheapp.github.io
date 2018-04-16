var signUpForm = document.getElementById('govtSignup');
var loginForm = document.getElementById('govtLoginForm');
var db = firebase.database();

$('#govtLoginForm').on('submit',function (evt) {
  evt.preventDefault();
  console.log("login is called");
  var email=loginForm.elements.namedItem('email').value;
  var password=loginForm.elements.namedItem('pass').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    console.log("user logged in");
    window.location = "/govt/";
  }).catch(function(error) {
    console.log(error.message);
  });
});
