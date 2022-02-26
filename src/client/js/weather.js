import "regenerator-runtime/runtime"; 
const city = document.querySelector(".city");
const description = document.querySelector(".description");
function onGeoOk(position) {
    const API_KEY = "1349ea9f4225b93a8da4f034c939db7e";
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      description.innerText = `${Math.round(data.main.temp)}℃ / feels like : ${Math.round(data.main.feels_like)}℃ / ${data.weather[0].description}`;
      });
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);