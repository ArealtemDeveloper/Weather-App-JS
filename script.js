let weather = {
    "ApiKey": "bdc99d266552a975f59901e89575ed78",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.ApiKey}`)
        .then(response => response.json())
        .then(data => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const  {name} = data;
        const {country} = data.sys;
        const {icon} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
    
        document.querySelector(".city").innerText = `${name}/${country}`
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector(".temp").innerText = `${Math.ceil(temp-273.15)}°C`
        document.querySelector(".humidity").innerText = `Влажность: ${humidity}%`
        document.querySelector(".wind").innerText = `Скорость ветра: ${speed} м/с`
    },
    search:function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
}

document.querySelector(".search-btn").addEventListener("click", () => {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        weather.search();
        e.target.value = ""
    }
})

weather.fetchWeather("Челябинск")

