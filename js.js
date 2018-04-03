avgpara = document.getElementsByClassName('para')[0];
allpara = document.getElementsByClassName('para')[1];

var days = Object.keys(stocks);
var dayinfo = Object.values(stocks);

var alltimelow = 999999;
var alltimehigh = 0;
var count = 0;
var avgopen = 0;
var avghigh = 0;
var avglow = 0;
var avgclose = 0;
var avgvolume = 0;
var alldays = [];
var close = 0;
var closecolor = '';
var opencolor = '';


days.forEach(function (day) {
    avgopen += Number(stocks[day]['1. open']);
    avghigh += Number(stocks[day]['2. high']);
    avglow += Number(stocks[day]['3. low']);
    avgclose += Number(stocks[day]['4. close']);
    avgvolume += Number(stocks[day]['5. volume']);
    count++;
    if(stocks[day]['2. high'] > alltimehigh){
        alltimehigh = stocks[day]['2. high'];
    }else if (stocks[day]['3. low'] < alltimelow){
        alltimelow = stocks[day]['3. low'];
    }
});


days.forEach(function (day, key) {
            alldays.push({"Day": days[key], 
            "Open": stocks[day]["1. open"], 
            "close": stocks[day]["4. close"] });
  });


function createDaily() {
    for(var i=99; i >= 0;i--){
        // set background colors for bootstrap divs red or green on the open and close prices based on if the market opened 
        // high/lower than the previous close or if the market closes higher/lower than the opening print
        if (stocks[days[i]]['1. open'] > close){
            var opencolor = 'bg-success';
        }else if (stocks[days[i]]['1. open'] < close) {
            var opencolor= 'bg-danger';
        }
        if (stocks[days[i]]['4. close'] > stocks[days[i]]['1. open']){
            var open = stocks[days[i]]['1. open'];
            var closecolor = 'bg-success';
        }else if (stocks[days[i]]['4. close'] < stocks[days[i]]['1. open']){
            var closecolor = 'bg-danger'
        }
        // set close price during every lop
        close = stocks[days[i]]['4. close'];
        // write html with bootstrap classes containing the day/open/close info, colored by the if/then above.
        allpara.innerHTML += "<div class='col-3 bg-secondary border'> <span class='bg-secondary text-warning'>Day: " + 
        days[i] + '</span><br><span class='+opencolor+'> Open: ' + stocks[days[i]]['1. open'] + '</span><br><span class=' + 
        closecolor +'> Close: ' + stocks[days[i]]['4. close'] + '</span><br> </div>';
    }
}

createDaily();

avgpara.innerHTML += "Open Price: " +(avgopen/count).toFixed(2) + '<br>';
avgpara.innerHTML += "High: " + (avghigh/count).toFixed(2) + '<br>';
avgpara.innerHTML += "Low: " + (avglow/count).toFixed(2) + '<br>';
avgpara.innerHTML += "Close: " + (avgclose/count).toFixed(2) + '<br>';
avgpara.innerHTML += "Volume: " + Math.floor(avgvolume/count) + '<br>';
avgpara.innerHTML += 'All time High: ' + alltimehigh + '<br>';
avgpara.innerHTML += 'All time Low: ' + alltimelow +' <br>';

console.log('The average open was ' + (avgopen/count).toFixed(2));
console.log('The average high was '+ (avghigh/count).toFixed(2));
console.log('The average low was ' + (avglow/count).toFixed(2));
console.log('The average close was ' + (avgclose/count).toFixed(2));
console.log('The average voluem was '+ Math.floor(avgvolume/count));
console.log('The all time high in given date range is ' + alltimehigh);
console.log('The all time low in given date range is '+ (alltimelow));
console.log(alldays);
