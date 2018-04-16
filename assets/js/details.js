let params = (new URL(document.location)).searchParams;
let id = params.get("id");
var db = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("function called");
    /*Creche Details Show*/
    db.ref(id).once('value').then(function(snapshot) {
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
    /*Students Details Show*/
    db.ref(id+"/students").once('value').then(function(snapshot) {
        data = snapshot.val();
        var sno = 1;
        var record;
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
          record += "</tr>"
          $('#studentRecord').append(record);
          sno += 1;
        }
    });
    /*Staff Details Show*/
    db.ref(id+"/staff").once('value').then(function(snapshot) {
        data = snapshot.val();
        var sno = 1;
        var record;
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
          record += "</tr>"
          $('#staffRecord').append(record);
          sno += 1;
        }
    });
  }
});
