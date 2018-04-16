var db = firebase.database();
var profileForm = document.getElementById("addProfile");

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
$('#addProfile').on('submit',function (evt) {
  evt.preventDefault();
  firebase.auth().onAuthStateChanged(function(user) {
    var name= profileForm.elements.namedItem('name').value;
    var state= profileForm.elements.namedItem('state').value;
    var city= profileForm.elements.namedItem('city').value;
    var address= profileForm.elements.namedItem('address').value;
    var phone= profileForm.elements.namedItem('phone').value;
    var bank= profileForm.elements.namedItem('bank').value;
    var accno= profileForm.elements.namedItem('accno').value;
    var ifsc= profileForm.elements.namedItem('ifsc').value;
    var user = firebase.auth().currentUser;
    var updates = {
          "name": name,
          "state": state,
          'city': city,
          'phone': phone,
          'address': address,
          'bank': bank,
          'accno': accno,
          'ifsc': ifsc
    }
  console.log(updates);
  firebase.database().ref(user.uid+"/details").update(updates).then(function() {
    alert("data updated");
    window.location = "/creche/";
  });
  });
});
