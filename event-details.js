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
      var eventObject = [];

    //  To check if the API is working
    function showEvents(){
        var url = 'https://api.songkick.com/api/3.0/metro_areas/27396/calendar.json?apikey=io09K9l3ebJxmxe2&location=Toronto';
        var otreebaurl = 'https://api.otreeba.com/v1/swagger.json?apikey=117738136d1c354b4cbf24adb57757959a1c3cca&';

        //console.log(url);
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            //console.log(response);
            var events = response.resultsPage.results.event;
            // console.log(events);  
            
            for (var index = 0; index < events.length; index++) {
                var data = events[index];

                var name = data.displayName;
                var date = data.start.date;
                var venue = data.venue.displayName;

                // console.log(data)
                // eventutton[i] = parseInt(i);
                $("#event-details").append("<div>");
                $("#event-details").append("<p>").append(name);
                $("#event-details").append("<p>").append(date);
                $("#event-details").append("<p>").append(venue);

                $("#event-details").append("<p>").append("<button type='button' class='btn btn-primary' id=\""+index+"\">I'm Going "+eventButton[index]+"</button>")
                
                eventObject = {
                    "name": name,
                    "date": date,
                    "venue": venue,
                    //TODO::Get actual clickCount from firebase
                    "clickCount": 0
                }
                
            //TODO::Check firebase if item exists before pushing
                database.ref("/events").push(eventObject);
                 
            }                         
        })

        $.ajax({
            url: otreebaurl,
            method: "GET"
        }).then(function(response){
            var resultOtreeba = response.data;
            var strains = response.definitions.Strain;
            console.log(response);
            //console.log(strains);
        })

    }
    showEvents();
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val())
        console.log(childSnapshot);
    })

    $("#event-details").on('click','button', function(){
        console.log($(this).attr('id'));
        //eventObject[$(this).attr('id')].clickCount+=1;
        //console.log(eventObject[$(this).attr('id')].clickCount+=1);
            
       //TODO::Save to firebase
    
     });
})