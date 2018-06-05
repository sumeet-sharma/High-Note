$(window).ready(function () {

    var APIkey = "STwEpnPDXERAZv6JNRKyv5EkAmxgukSN";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=" + APIkey + "&city=Toronto&sort=date,desc&keyword=Childish%Gambino"
    
    console.log(queryURL);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response._embedded.events[0].images[0].url);
        
        // image of the artist from the API response
        var image = $("<img height='300' width='350'>").attr('src',response._embedded.events[0].images[0].url);

        // linking the image to the artist of the week page and appending it 
        imgLinkurl = "artistoftheweek.html";
        var imgLink = $("<a>").attr("href", imgLinkurl);
        $("#artistOfTheWeek").append(imgLink);
        imgLink.append(image);

        // displaying the artist of the week name, location of the shows and date
        var artistName = response._embedded.events[0].name;
        console.log(artistName);
        var location = response._embedded.events[0]._embedded.venues[0].name;
        console.log(location);
        var date = response._embedded.events[0].dates.start.localDate;
        console.log(date);
        var time = response._embedded.events[0].dates.start.localTime;
        
        var subTitle = $("<div id='subT'>");
        var venue = $("<div id='venueLocation'>");
        $("#artistOfTheWeek").append(subTitle);
        $("#subT").append("<b><h5>Artist Of the week: "+artistName);
        $("#artistOfTheWeek").append(venue);
        $("#venueLocation").append("Location: "+location+"<br>");
        $("#venueLocation").append("Date: "+date);
        $("#nameArtist").html(artistName);

        $("#upcomingConcerts").append("<br><h5>Venue</h5>"+location+"<br>");
        $("#upcomingConcerts").append(response._embedded.events[0].promoter.name+"<br>");
        $("#upcomingConcerts").append(date);
        $("#upcomingConcerts").append(" ("+time+")");

        // linking the page to the ticket master website
        var imageArtistOfTheWeekLinkurl = response._embedded.events[0].url;
        var imageArtistOfTheWeekLink = $("<a>").attr("href", imageArtistOfTheWeekLinkurl);
        var imageArtistOfTheWeek = $("<img height='250' width='250'>").attr('src',response._embedded.events[0].images[0].url);
        $("#artistImage").append(imageArtistOfTheWeekLink);
        imageArtistOfTheWeekLink.append(imageArtistOfTheWeek);

        $("#TicketMasterLink").html("<a href="+imageArtistOfTheWeekLinkurl+" target='_blank'>Buy tickets!</a>");
    })

    // BANDS IN TOWN API DATA
    var BandsInTownKey = "344a173ce00a0c314bbad6b36e52a319";
    var qURL = "https://rest.bandsintown.com/artists/Childish%20Gambino/events?app_id=" + BandsInTownKey +"&date=2018-06-05%2C2018-12-31";

    $.ajax({
        url: qURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        for(var i=0; i<10; i++){
          var allEvents = [];
          allEvents[i] = $("<div>");
          allEvents[i].append("<br>"+response[i].datetime);
          allEvents[i].append("<br>"+response[i].venue.name+" ,"+response[i].venue.city+" ,"+response[i].venue.country);

          $("#upcomingEvents").append(allEvents);
        }
        // // image of the artist from the API response
        // var image = $("<img height='300' width='350'>").attr('src',response._embedded.events[0].images[0].url);

        // // linking the image to the artist of the week page and appending it 
        // imgLinkurl = "artistoftheweek.html";
        // var imgLink = $("<a>").attr("href", imgLinkurl);
        // $("#artistOfTheWeek").append(imgLink);
        // imgLink.append(image);

        // // displaying the artist of the week name, location of the shows and date
        // var artistName = response._embedded.events[0].name;
        // console.log(artistName);
        // var location = response._embedded.events[0]._embedded.venues[0].name;
        // console.log(location);
        // var date = response._embedded.events[0].dates.start.localDate;
        // console.log(date);
        // var time = response._embedded.events[0].dates.start.localTime;
        
        // var subTitle = $("<div id='subT'>");
        // var venue = $("<div id='venueLocation'>");
        // $("#artistOfTheWeek").append(subTitle);
        // $("#subT").append("<b><h5>Artist Of the week: "+artistName);
        // $("#artistOfTheWeek").append(venue);
        // $("#venueLocation").append("Location: "+location+"<br>");
        // $("#venueLocation").append("Date: "+date);
        // $("#nameArtist").html(artistName);

        // $("#upcomingConcerts").append("<br><h5>Venue</h5>"+location+"<br>");
        // $("#upcomingConcerts").append(response._embedded.events[0].promoter.name+"<br>");
        // $("#upcomingConcerts").append(date);
        // $("#upcomingConcerts").append(" ("+time+")");

        // // linking the page to the ticket master website
        // var imageArtistOfTheWeekLinkurl = response._embedded.events[0].url;
        // var imageArtistOfTheWeekLink = $("<a>").attr("href", imageArtistOfTheWeekLinkurl);
        // var imageArtistOfTheWeek = $("<img height='250' width='250'>").attr('src',response._embedded.events[0].images[0].url);
        // $("#artistImage").append(imageArtistOfTheWeekLink);
        // imageArtistOfTheWeekLink.append(imageArtistOfTheWeek);

        // $("#TicketMasterLink").html("<a href="+imageArtistOfTheWeekLinkurl+" target='_blank'>Buy tickets!</a>");
    })

    const clientID='aec2ecae4514485db63205cfd62415cc';
     let player,token;
     var accountUrl='https://accounts.spotify.com/authorize?client_id='+clientID+'&redirect_uri=http:%2F%2Fwww.touchcatdigital.ca&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20streaming%20user-read-birthdate%20user-read-currently-playing&response_type=token&state=123';
     window.onSpotifyWebPlaybackSDKReady = () => {
     window.addEventListener("message", receiveMessage, false);
     var authWindow = window.open(accountUrl, '_blank');
       if (authWindow) {
         authWindow.focus();
       }

       function receiveMessage(event){
         console.log(event);
         var msg=event.data;
         if(typeof msg==='string'){
           var parseArray=msg.split('&');
           token=parseArray[0].split('=')[1];
             player = new Spotify.Player({
               name: 'Max Tunage',
               getOAuthToken: cb => { cb(token); }
             });
             
             // Error handling
             player.addListener('initialization_error', ({ message }) => { console.error(message); });
             player.addListener('authentication_error', ({ message }) => { console.error(message); });
             player.addListener('account_error', ({ message }) => { console.error(message); });
             player.addListener('playback_error', ({ message }) => { console.error(message); });

             // Playback status updates
             player.addListener('player_state_changed', state => { console.log(state);});

             // Ready
             player.addListener('ready', ({ device_id }) => {
             var req=$.ajax({
                 url:"https://api.spotify.com/v1/me/player/play?device_id="+device_id,
                 method:'PUT',
                 dataType:'json',
                 data:JSON.stringify({
                     "uris":["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
                 }),
                 headers:{
                     "Authorization":'Bearer ' + token,
                     'Content-Type': 'application/json'
                 }
             });
             req.done(function(msg){
                player.setVolume(0.9);
                 console.log('PLAYING');
                 $('#play_playa').on('click',function(){
                  player.resume();
                 });
             });
             req.fail(function(jqXHR, textStatus){
               switch(jqXHR.status){
                 case 403:
                   console.log('NEED PREMIUM ACCOUNT');
                   break;
                 case 404:
                   console.log('NO DEVICE');
                   break;
                 default:
                   break;
               }
             });
               console.log('Ready with Device ID', device_id);
               
             });

             // Not Ready
             player.addListener('not_ready', ({ device_id }) => {
               console.log('Device ID has gone offline', device_id);
             });

             // Connect to the player!
             player.connect();
         }
       };
     };
})