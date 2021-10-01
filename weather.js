const APURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-340C63C7-EC48-4AFA-B6C9-FD8FCFA0F6F7&elementName=Wx,T,CI';

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
    const weather =data.records.locations[0].location;
    show_weather(weather);
}
get_weather(APURL);

function show_weather(weather){
    let city_name=document.getElementById('city_name');
    let city_temp=document.getElementById('city_temp');
    let city_wx=document.getElementById('city_wx');
    city_name.innerHTML=`
    <h1>${weather[0].locationName}</h1>`;
    city_temp.innerHTML=`
    <h1>${weather[0].weatherElement[1].time[0].elementValue[0].value}`
    city_wx.innerHTML=`
    <h1>${weather[0].weatherElement[1].time[0].elementValue[1].value}`
    
}