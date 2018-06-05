$(document).ready(function(){


    //$(document).on("click","#submitbutton",function(){
        //event.preventDefault();
    
        //Variables of Query URL (Date in UNIX)
        var APIkey = "db1f13174ea9e50874eb00cef8b7d022";
        var stage = "43.629245900,-79.415239300";
        //var inputDate=new Date($("#dateinput").val()).getTime()/1000;
        var inputDate = "1530144000";
        var queryURL =  "https://api.darksky.net/forecast/" + APIkey + "/" + stage +  "," + inputDate + "?units=si";
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var forecast = response.daily.data[0];
                var date = forecast.time;
                console.log(timeConverter(date));
                var forecast = response.daily.data[0];
                var overview = forecast.summary;
                var temperature = forecast.temperatureHigh;
                var humidity = forecast.humidity;
                var icon = forecast.icon;
            
            //$("#exampleweather").append(overview);
            $("#exampleweather").append(temperature + " C");
            //$("#humidity").text(humidity);
            //$("#dateexample").text(timeConverter(date));
            
            var skycons = new Skycons({"color": "green"});
            skycons.add("icon1",icon);
            skycons.play();
            })
            
            //Time Converter from User Input to Readable Date
            function timeConverter(date){
                var a = new Date(date * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = month + ' ' + date + ', ' + year;
                return time;
            }
    
        })
    //})
            //Google Maps API Key
            //AIzaSyAUH7yXEgNlU0cB0MldFRXPH1BiDQHEuFE
            //Adding the icon
    
            //https://maps.googleapis.com/maps/api/geocode/json?address=72+The+East+Mall&key=AIzaSyAUH7yXEgNlU0cB0MldFRXPH1BiDQHEuFE