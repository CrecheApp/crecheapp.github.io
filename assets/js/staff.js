var db = firebase.database();
var staffForm = document.getElementById("addStaff");

firebase.auth().onAuthStateChanged(function(user) {
  var user = firebase.auth().currentUser;
  if(user){
    db.ref(user.uid+"/staff").once('value').then(function(snapshot) {
        data = snapshot.val();
        var sno = 1;
        var record;
        var delete_record;
        for (staff in data) {
          record = "<tr>"
          record += "<td>" + sno + "</td>";
          record += "<td>" + data[staff].regno + "</td>";
          record += "<td>" + data[staff].name + "</td>";
          record += "<td>" + data[staff].dob + "</td>";
          record += "<td>" + data[staff].desg + "</td>";
          record += "<td>" + data[staff].address + "</td>";
          record += "<td>" + data[staff].phone + "</td>";
          record += "<td>" + data[staff].aadhar + "</td>";
          record += "<td>" + data[staff].edu + "</td>";
          record += "<td>" + data[staff].cat + "</td>";
          delete_record = record;
          record += "</tr>"
          $('#staffRecord').append(record);
          sno += 1;
          delete_record += '<td><label><input type="radio" onclick = "getValue('+ staff +')"/><i class="fa fa-trash"></i></label></td></tr>';
          $('#deleteStaff').append(delete_record);
        }
    });
  }
});

$('#addStaff').on('submit',function (evt) {
  evt.preventDefault();
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var name = staffForm.elements.namedItem('name').value;
    var regno = staffForm.elements.namedItem('regno').value;
    var dob = staffForm.elements.namedItem('dob').value;
    var desg = staffForm.elements.namedItem('desg').value;
    var address = staffForm.elements.namedItem('address').value;
    var phone = staffForm.elements.namedItem('phone').value;
    var aadhar = staffForm.elements.namedItem('aadhar').value;
    var edu = staffForm.elements.namedItem('edu').value;
    var cat = staffForm.elements.namedItem('cat').value;
    var updates = {
      "name": name,
      "regno": regno,
      "dob": dob,
      "desg": desg,
      "address": address,
      "phone": phone,
      "aadhar": aadhar,
      "edu": edu,
      "cat": cat
    }
    console.log(updates)
    firebase.database().ref(user.uid+"/staff/"+regno).update(updates).then(function() {
      alert("staff added");
      window.location = '/creche/staff'
    });
  });
});

function getValue(value) {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      var confirm = window.confirm("Delete staff record");
      if (confirm) {
        firebase.database().ref(user.uid+"/staff/"+value).remove().then(function() {
          window.alert("staff removed");
          window.location = '/creche/staff'
        });
      }
  }
});
}
