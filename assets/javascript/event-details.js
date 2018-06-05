$(document).ready(function(){
    //  To check if the API is working
    function showEvents(){
        var url = 'https://api.songkick.com/api/3.0/metro_areas/27396/calendar.json?apikey=io09K9l3ebJxmxe2&location=Toronto';
        
        console.log(url);
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(response);
            var events = response.resultsPage.results.event
            console.log(events);
            
            for(var i=0; i<events.length; i++){
                $("#event-details").append("<div>");
                $("#event-details").append("<p>").append(events[i].displayName);
                $("#event-details").append("<p>").append(events[i].start.date);
                $("#event-details").append("<p>").append(events[i].venue.displayName);
                console.log(events[i]);
            }
                       
        })

    }
    showEvents();

    

})
    