$(function() {
    var foo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22taiwan%2C%20tnn%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    $.getJSON(foo, function(date) {
        console.log(date);
        var temp = Math.floor((date.query.results.channel.item.condition.temp-32)*5/9);
        var weather = function(w) {
        	var weatherText="";
        	var weatherIcon="";
            switch (w) {
                case 'Thunderstorms':
                    weatherText = '雷雨';
                    weatherIcon = 'wi-thunderstorm';
                    break;
                case 'Showers':
                    weatherText = '陣雨';
                    weatherIcon = 'wi-showers';
                    break;
                case 'Mostly Cloudy':
                    weatherText = '晴時多雲';
                    weatherIcon = 'wi-day-cloudy';
                    break;
                case 'Scattered Showers':
                    weatherText = '局部陣雨';
                    weatherIcon = 'wi-sprinkle';
                    break;
                case 'Partly Cloudy':
                    weatherText = '局部有雲';
                    weatherIcon = 'wi-day-cloudy-high';
                    break;
                case 'Rain':
                    weatherText = '雨天';
                    weatherIcon = 'wi-rain';
                    break;
                case 'Cloudy':
                    weatherText = '多雲';
                    weatherIcon = 'wi-cloudy';
                    break;
                case 'Mostly Sunny':
                    weatherText = '晴偶有雲';
                    weatherIcon = 'wi-day-sunny';
                    break;
                case "Sunny":
                	weatherText = "晴天";
                	weatherIcon = "wi-day-sunny";
                	break;
            }
            return [weatherText,weatherIcon];
        };
        $(".weather").append("<div class='wi "+weather(date.query.results.channel.item.condition.text)[1]+"' >"+"<p>"+date.query.results.channel.location.country+", "+date.query.results.channel.location.region+"</p><br/><p>"+weather(date.query.results.channel.item.condition.text)[0]+", "+temp+"</p>");
        for(var i = 1 ; i<8;i++){
        	var low = date.query.results.channel.item.forecast[i].low;
        	var high= date.query.results.channel.item.forecast[i].high;
        	$(".forecast").append("<div style='margin:0 10px' class='wi "+weather(date.query.results.channel.item.forecast[i].text)[1]+"' ><p>"+date.query.results.channel.item.forecast[i].date+"</p><br/>"+"<p>"+weather(date.query.results.channel.item.forecast[i].text)[0]+", "+low+"~"+high );
        }
    });
})
