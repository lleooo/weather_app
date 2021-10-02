const APURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-340C63C7-EC48-4AFA-B6C9-FD8FCFA0F6F7&elementName=Wx,T,CI,PoP6h';

// fetch(APURL)
// .then(function(respone){
//     console.log(respone);
//     return respone.json();
// })
// .then(function(myJason){
//     console.log(myJason);
// })
async function get_weather(api) {
    const res = await fetch(api);
    const data = await res.json();
    console.log(data.records.locations[0].location);
    const weather = data.records.locations[0].location;
    show_weather(weather);
}
get_weather(APURL);

function show_weather(weather) {
    let future_weather = document.getElementById('future_weather');
    city_name.innerHTML = `
    <h1>${weather[0].locationName}</h1>`;
    city_temp.innerHTML = `
    <h1>${weather[0].weatherElement[1].time[0].elementValue[0].value}<span>°C</span></h1>`;
    city_wx.innerHTML = `
    <h1>${weather[0].weatherElement[0].time[0].elementValue[0].value}</h1>`;

    weather[0].weatherElement[1].time.forEach(element => {
        weather[0].weatherElement[3].time.forEach(ev => {
            if (element.dataTime.slice(5, -3) === ev.startTime.slice(5, -3)) {
                const future_item = document.createElement('div')
                future_item.id = 'future_item';
                future_weather.appendChild(future_item);

                future_item.innerHTML = `<div id=future_time>${element.dataTime.slice(5, 7)}/${element.dataTime.slice(9, -3)}</div>

                <div id=future_rain>rain:${ev.elementValue[0].value}%</div>

                <div id=future_temp>${element.elementValue[0].value}°</div>
                         
                `
                console.log(ev.elementValue[0].value)
            }
        })
    });
}