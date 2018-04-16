firebase.auth().onAuthStateChanged(function(user) {
  console.log("Auth included")
  if (!user) {
    window.location = "/creche/login"
  }
});
