let city=document.querySelector(".place");
let date=document.querySelector(".date");
let temp=document.querySelector(".temperature");
let min_temp=document.querySelector(".min-temp");
let max_temp=document.querySelector(".max-temp");
let feel=document.querySelector(".type-val-feels-like");
let humid=document.querySelector(".type-val-humidity");
let wind=document.querySelector(".type-val-wind");
let press=document.querySelector(".type-val-pressure");
let icon=document.querySelector(".icon");


let cityval = "Pune";

let search=document.querySelector(".searchBar").addEventListener('submit',(e)=>{
    e.preventDefault();
  let cityname=document.querySelector(".cityname");
  console.log(cityname.value);
  cityval=cityname.value;
  getweatherdata();
});



const getcountryname=(code)=>{
    return new Intl.DisplayNames([code],{type: "region"}).of(code);
};
const getDate = (time) =>{
    let date = new Date(time*1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    const fromatter = new Intl.DateTimeFormat('en-US',options)
    return fromatter.format(date);
}
const getweatherdata=async()=>{
    try{
        const weatherurl=`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=f8b8c4c21592d93ac4fdfe11002b181d`;
    const res=await fetch(weatherurl);
    const data=await res.json();
    console.log(data);
const  {main,name,weather,wind,sys,dt}=data;

let cont = getcountryname(sys.country);

   city.textContent=`${name} ${cont}`;
   temp.innerHTML=`${main.temp}&#176 ${weather[0].main}`;
   feel.innerHTML=`${main.feels_like.toFixed()}&#176`;
   min_temp.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
   max_temp.innerHTML=` Max: ${main.temp_max.toFixed()}&#176`;
   humid.textContent=`${main.humidity}%`;
   wind.textContent=`${wind}`;
   press.textContent=`${main.pressure} hPa`;
   date.textContent=`${getDate(dt)}`;
   icon.innerHTML=`<img src=" http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    }catch(error){
        console.log(error);
    }
    
};

// document.body.addEventListener("load",getweatherdata);
getweatherdata();