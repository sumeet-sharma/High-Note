$(document).ready(function(){
    // Linking the firebase 
    var config = {
        apiKey: "AIzaSyCXrAJXUuBgdl4Cc37kkGAWxckWS70cxFs",
        authDomain: "highnote2018.firebaseapp.com",
        databaseURL: "https://highnote2018.firebaseio.com",
        projectId: "highnote2018",
        storageBucket: "highnote2018.appspot.com",
        messagingSenderId: "672503907997"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      var eventButton = [];

    //  To check if the API is working
    function showEvents(){
        var url = 'https://api.songkick.com/api/3.0/metro_areas/27396/calendar.json?apikey=io09K9l3ebJxmxe2&location=Toronto';
        
        //console.log(url);
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            //console.log(response);
            var events = response.resultsPage.results.event;
            //console.log(events);

            var eventObject = [];
            var clickCounter = [];
            
            for(var i=0; i<events.length; i++){

                var name = events[i].displayName;
                var date = events[i].start.date;
                var venue = events[i].venue.displayName;
                eventButton[i] = parseInt(i);
                $("#event-details").append("<div>");
                $("#event-details").append("<p>").append(name);
                $("#event-details").append("<p>").append(date);
                $("#event-details").append("<p>").append(venue);

                $("#event-details").append("<p>").append("<button type='button' class='btn btn-primary' id='test-button'>I'm Going "+eventButton[i]+"</button>")
                //console.log(events[i]);
                
                clickCounter[i] = 0;

                eventObject[i] = {
                    "name": name,
                    "date": date,
                    "venue": venue,
                    clickCount: clickCounter[i]
                }
                console.log(eventObject[i]);
                //TODO::Check firebase if item exists before pushing

                
                database.ref("/events").push(eventObject[i].clickCount);
                console.log("It worked!")
                               
            }            
        })
    }
    showEvents();
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

    })

    $("#event-details").on('click','button', function(){
        console.log(this);
        clickCounter[this]++;
        console.log(clickCounter[this])

    // increment the respective clickCounter when the button is clicked
    
    });
})