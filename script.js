console.log("script is running")

import API from "./config.js";

const getSubmitButton = document.getElementById('submit-search');
const getInputField = document.getElementById('cityName');
const getCityNameContainer = document.querySelector('.city-info')
const container = document.querySelector ('.container')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

getInputField.addEventListener('keyup', handleKeyPress)
getSubmitButton.addEventListener ('click', handleButtonClick)

function handleKeyPress (event){
    const cityName = getInputField.value.trim()
    if (event.code === "Enter" && cityName){
        fetchData(cityName)
    }
}

function handleButtonClick(){
    const cityName = getInputField.value.trim()
    fetchData(cityName)
}

function fetchData(cityName){
    const apiUrl= `http://api.weatherapi.com/v1/forecast.json?key=${API.key}&q=${cityName}&days=7&aqi=no&alerts=no`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                alert("Hey are you sure you are not holding up your map upside down ?")
            } else {
                clearContainer()
                displayLocation(data.location.name, data.location.country)
                createWeatherCards(data.forecast)
            }
        })
        .catch(error => {
            console.error(error)
        })
}

function clearContainer(){
    while(container.lastChild){
        container.removeChild(container.lastChild)
    }
}

function displayLocation(city, country){
    getCityNameContainer.textContent = `${city}, ${country}`
}

function createWeatherCards(forecast){
    for(let i = 0; i < 5; i++){
        const card = createCard(i, forecast)
        container.appendChild(card)
    }
}

function createCard(dayIndex, forecast){
    const card = document.createElement('div')
    card.classList.add('card', dayIndex === 0 ? 'main-card' : null)

    const imageBox = document.createElement('div')
    imageBox.classList.add('imgBx')
    card.appendChild(imageBox)

    const cardImg = document.createElement('img')
    cardImg.src = forecast.forecastday[dayIndex].day.condition.icon
    cardImg.alt = `Icon describing the following weather: ${forecast.forecastday[dayIndex].day.condition.text}`
    imageBox.appendChild(cardImg)

    const contentBox = document.createElement('div')
    contentBox.classList.add('contentBx')
    card.appendChild(contentBox)

    const dayOfWeek = weekdays[(new Date().getDay() + dayIndex) % 7]
    const cardHeader = document.createElement('h2')
    cardHeader.innerHTML = dayOfWeek
    contentBox.appendChild(cardHeader)

    const tempDescription = document.createElement('h4')
    tempDescription.innerHTML = forecast.forecastday[dayIndex].day.condition.text
    contentBox.appendChild(tempDescription)

    const currentTempBox = document.createElement('div')
    currentTempBox.classList.add('color')
    contentBox.appendChild(currentTempBox)

    const currentTempHeader = document.createElement('h3')
    currentTempHeader.innerHTML = "Temp:"
    currentTempBox.appendChild(currentTempHeader)

    const currentTemp = document.createElement('span')
    currentTemp.classList.add('current-temp')
    currentTemp.innerHTML = `${forecast.forecastday[dayIndex].day.avgtemp_c}°C`
    currentTempBox.appendChild(currentTemp)

    const minMaxTemperatures = document.createElement('div')
    minMaxTemperatures.classList.add('details')
    contentBox.appendChild(minMaxTemperatures)

    const minMaxTempHeader = document.createElement('h3')
    minMaxTempHeader.innerHTML = "More:"
    minMaxTemperatures.appendChild(minMaxTempHeader)

    const minTemp = document.createElement('span')
    minTemp.classList.add('min-temp')
    minTemp.innerHTML = `${forecast.forecastday[dayIndex].day.mintemp_c}°C`
    minMaxTemperatures.appendChild(minTemp)

    const maxTemp = document.createElement('span')
    maxTemp.classList.add('max-temp')
    maxTemp.innerHTML = `${forecast.forecastday[dayIndex].day.maxtemp_c}°C`
    minMaxTemperatures.appendChild(maxTemp)

    return card
}