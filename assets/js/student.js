var db = firebase.database();
var studentForm = document.getElementById("addStudent");

firebase.auth().onAuthStateChanged(function(user) {
  var user = firebase.auth().currentUser;
  if(user){
    db.ref(user.uid+"/students").once('value').then(function(snapshot) {
        data = snapshot.val();
        var sno = 1;
        var record;
        var delete_record;
        for (student in data) {
          record = "<tr>"
          record += "<td>" + sno + "</td>";
          record += "<td>" + data[student].regno + "</td>";
          record += "<td>" + data[student].name + "</td>";
          record += "<td>" + data[student].fname + "</td>";
          record += "<td>" + data[student].mname + "</td>";
          record += "<td>" + data[student].dob + "</td>";
          record += "<td>" + data[student].address + "</td>";
          record += "<td>" + data[student].phone + "</td>";
          record += "<td>" + data[student].aadhar + "</td>";
          record += "<td>" + data[student].cat + "</td>";
          record += "<td>" + data[student].bpl + "</td>";
          record += "<td>" + data[student].pc + "</td>";
          delete_record = record;
          record += "</tr>"
          $('#studentRecord').append(record);
          sno += 1;
          delete_record += '<td><label><input type="radio" onclick = "getValue('+ student +')"/><i class="fa fa-trash"></i></label></td></tr>';
          $('#deleteStudent').append(delete_record);
        }
    });
  }
});

$('#addStudent').on('submit',function (evt) {
  evt.preventDefault();
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var name = studentForm.elements.namedItem('name').value;
    var regno = studentForm.elements.namedItem('regno').value;
    var fname = studentForm.elements.namedItem('fname').value;
    var mname = studentForm.elements.namedItem('mname').value;
    var dob = studentForm.elements.namedItem('dob').value;
    var address = studentForm.elements.namedItem('address').value;
    var phone = studentForm.elements.namedItem('phone').value;
    var aadhar = studentForm.elements.namedItem('aadhar').value;
    var cat = studentForm.elements.namedItem('cat').value;
    var bpl = studentForm.elements.namedItem('bpl').value;
    var pc = studentForm.elements.namedItem('pc').value;
    var updates = {
      "name": name,
      "regno": regno,
      "fname": fname,
      "mname": mname,
      "dob": dob,
      "address": address,
      "phone": phone,
      "aadhar": aadhar,
      "cat": cat,
      "bpl": bpl,
      "pc": pc
    }
    console.log(updates)
    firebase.database().ref(user.uid+"/students/"+regno).update(updates).then(function() {
      alert("student added");
      window.location = '/creche/students'
    });
  });
});

function getValue(value) {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      var confirm = window.confirm("Delete student record");
      if (confirm) {
        firebase.database().ref(user.uid+"/students/"+value).remove().then(function() {
          window.alert("student removed");
          window.location = '/creche/students'
        });
      }
  }
});
}
