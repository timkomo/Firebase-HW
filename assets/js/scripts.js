$(document).ready(function(){

  var money = new Audio("./assets/audio/money.mp3")
  
    $("#pwd").keyup(function() {
        if ($('#pwd').val() == "aceofcups"){
            $("#passwordDiv").hide(1000);
            $('#addShowDiv').show();
            money.play();
            $('html, body').animate({scrollTop:$(document).height()}, 'slow');


        }
     
      })

  

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDrow5r4_yaxYDPORJgglyt-QJWOxvS_7U",
      authDomain: "fat-spirit-upcoming-shows.firebaseapp.com",
      databaseURL: "https://fat-spirit-upcoming-shows.firebaseio.com",
      projectId: "fat-spirit-upcoming-shows",
      storageBucket: "fat-spirit-upcoming-shows.appspot.com",
      messagingSenderId: "403384946144"
    };
    firebase.initializeApp(config);


  var database = firebase.database();




  var venue = "";
    var showDate = ""
    var load = "";
    

     // Capture Button Click
     $("#add-employee-btn").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
  
      venue = $("#venue-input").val().trim();
      showDate = $("#showDate-input").val().trim();
      load = $("#load-input").val().trim();
  
      console.log(venue);
      database.ref().push({
          venue: venue,
          showDate: showDate,
          load: load,
          dateAdded: firebase.database.ServerValue.TIMESTAMP


      });
    });

   
    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
  
        // Console.loging the last user's data
        console.log(sv.venue);
        console.log(sv.showDate);
        console.log(sv.startdate);
        console.log(sv.load);

  
        // Change the HTML to reflect

        sv.daysUntil = moment(sv.showDate).diff(moment(), 'days');
        sv.dayOfWeek = moment(sv.showDate).format("dddd");
        sv.load = sv.load + ' / ' + (moment(sv.load, 'HH:mm').format('hh:mm a'));

        var newArray = ["venue", "dayOfWeek", "showDate", "daysUntil", "load",]


        var table = $("tbody");
        var row = $("<tr>");
        for (let key of newArray) {
        var cell = $("<td>");
        cell.text(sv[key]);
        row.append(cell);


        }
        table.append(row);

       

  
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    


    

    

})