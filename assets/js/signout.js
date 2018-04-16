$('#signOutBtn').on('click',function(){
    firebase.auth().signOut().then(function() {
      console.log('user signout');
      window.location='/';
    }).catch(function(error) {
      // An error happened.
      console.log('cant signout',error);
    });
  });
