var db = firebase.database();
var crecheId;

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    var user = firebase.auth().currentUser;
    var inputState = "";
    var inputCity = "";
    db.ref("/").once('value').then(function(snapshot) {
        var statelist = new Set();
        data = snapshot.val();
          /*Get state list*/
          for(creche in data)
            statelist.add(data[creche].details.state);
            console.log(statelist);
          /*Display state list*/
            var stateData = ""
            var stateArray = Array.from(statelist);
            for(st in stateArray) {
              if(stateArray[st]!==''){
                stateData +="<option value='"+stateArray[st]+"'>"+stateArray[st]+"</option>";
              }
            }
            $('#state_list').append(stateData);
      });
  } else {
    window.location = "/govt/login"
  }
});

$('#state').on('change', function(evt) {
  evt.preventDefault();
  inputState = $('#state').val();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      db.ref("/").once('value').then(function(snapshot) {
        data = snapshot.val();
        /* Get city list */
        var citylist = new Set();
        console.log(inputState);
        for (creche in data) {
          if (inputState === data[creche].details.state)
            citylist.add(data[creche].details.city);
          }
        /* Display city list */
        var cityData = ""
        var cityArray = Array.from(citylist);
        for(ct in cityArray) {
          if(cityArray[ct]!==''){
            cityData +="<option value='"+cityArray[ct]+"'>"+cityArray[ct]+"</option>";
          }
        }
        $('#city_list').append(cityData);
      });
    }
  });
});

$('#city').on('change', function(evt) {
  evt.preventDefault();
  inputCity = $('#city').val();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      db.ref("/").once('value').then(function(snapshot) {
        data = snapshot.val();
        /* Get creche list */
        var crecheList = {};
        for(creche in data) {
          if(inputCity === data[creche].details.city)
            crecheList[data[creche].details.name] = creche;
        }
        console.log(crecheList);
        /* Display city list */
        var crecheData = ""
        for(cr in crecheList) {
          if(cr!==''){
            crecheData +="<option value='"+cr+"' uid='"+crecheList[cr]+"'>"+cr+"</option>";
          }
        }
        console.log(crecheData);
        $('#creche_list').append(crecheData);
      });
    }
  });
});

$('#name').on('change', function(evt) {
  evt.preventDefault();
  name = $('#name').val();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      db.ref("/").once('value').then(function(snapshot) {
        data = snapshot.val();
        /* Get creche list */
        var crecheList = {};
        for(creche in data) {
          if(inputCity === data[creche].details.city)
            crecheList[data[creche].details.name] = creche;
        }
        var id = crecheList[name];
        crecheId = id;
});
    }
});
});




$('#crecheSearchForm').on('submit', function(evt) {
  evt.preventDefault();
  console.log(crecheId);
  window.location = "/govt/crecheDetails/?id="+crecheId;
});
