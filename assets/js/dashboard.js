var db = firebase.database();
firebase.auth().onAuthStateChanged(function(user) {
  $('#email').html(user.email);
  if(user) {
    db.ref(user.uid).once('value').then(function(snapshot) {
        data = snapshot.val().details;
        $('#name').html(data.name);
        $('#state').html(data.state);
        $('#city').html(data.city);
        $('#address').html(data.address);
        $('#phone').html(data.phone);
        $('#bank').html(data.bank);
        $('#accno').html(data.accno);
        $('#ifsc').html(data.ifsc);
    });
  }
});
