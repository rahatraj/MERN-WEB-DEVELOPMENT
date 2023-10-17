const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");


const grantAccessContanier = document.querySelector(".grant-location-container");
const serachForm = document.querySelector("[data-seachForm]");

const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


// initial variable need 

let currentTab = userTab;
let API_KEY = "2f615a74a76fdd2aeaceb943175329d0";
currentTab.classList.add("current-tab");
getfromSessionStrogae();


function switchTab(clickTab){
    if(clickTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickTab;
        currentTab.classList.add("current-tab");

        if(!serachForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContanier.classList.remove("active");
            serachForm.classList.add("active");
        }else {
            serachForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStrogae();
        }
    }
}

userTab.addEventListener("click", () =>{
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});


function getfromSessionStrogae() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContanier.classList.add("active");
    }else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherinfo(coordinates);
    }
}

async function fetchUserWeatherinfo(coordinates){
    const {lat, lon} = coordinates;

    grantAccessContanier.classList.remove("active");
    loadingScreen.classList.add("active");

    // Api call

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderweatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        console.log("error found ", error);
    }
}

function renderweatherInfo(weatherInfo){
    // fetching thte data 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const tempreature = document.querySelector("[data-tempreature]");

    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humadity]");
    const cloudyness = document.querySelector("[data-clouds]");


    // fetch the value from weaherinfo

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    tempreature.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudyness.innerText = `${weatherInfo?.clouds?.all}%`;
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("the geolacation is not available");
    }
}
function showPosition(position){
    const userCoordinates ={
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherinfo(userCoordinates);
}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click',getLocation);

const searchInput = document.querySelector("[data-searchInput]");

serachForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === ""){
        return;
    }else{
        fetchSearchWeatherinfo(cityName);
    }
});

async function fetchSearchWeatherinfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContanier.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderweatherInfo(data);
    } catch (error) {
        console.log("erroe is found ", error)
    }
}