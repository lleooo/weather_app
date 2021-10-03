const APURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-340C63C7-EC48-4AFA-B6C9-FD8FCFA0F6F7&elementName=Wx,T,CI,PoP6h';

var city=0;

async function get_weather(api,city){
    const res = await fetch(api);
    const data = await res.json();
    console.log(data.records.locations[0].location)
    console.log(data.records.locations[0].location[city]);
    const weather = data.records.locations[0].location[city];
    show_weather(weather);
}

get_weather(APURL,city);

function show_weather(weather) {
    let future_weather = document.getElementById('future_weather');
    city_name.innerHTML = `
    <h1>${weather.locationName}</h1>`;
    city_temp.innerHTML = `
    <h1>${weather.weatherElement[1].time[0].elementValue[0].value}<span>°C</span></h1>`;
    city_wx.innerHTML = `
    <h1>${weather.weatherElement[0].time[0].elementValue[0].value}</h1>`;

    weather.weatherElement[1].time.forEach(element => {
        weather.weatherElement[3].time.forEach(ev => {
            if (element.dataTime.slice(5, -3) === ev.startTime.slice(5, -3)) {
                const future_item = document.createElement('div')
                future_item.id = 'future_item';
                future_weather.appendChild(future_item);

                future_item.innerHTML = `<div id=future_time>${element.dataTime.slice(5, 7)}/${element.dataTime.slice(9, -3)}</div>

                <div id=future_rain>rain:${ev.elementValue[0].value}%</div>

                <div id=future_temp>${element.elementValue[0].value}°</div>
                         
                `
            }
        })
    });
}

var next_page=document.getElementById('next_page');

next_page.addEventListener('click',change_city);


function change_city(){
    city++;
    let city_name=document.getElementById('city_name');
    let city_temp=document.getElementById('city_temp');
    let city_wx=document.getElementById('city_wx');
    let future_weather = document.getElementById('future_weather');
    city_name.innerHTML='';
    city_temp.innerHTML='';
    city_wx.innerHTML='';
    future_weather.innerHTML=''
    get_weather(APURL,city);
}