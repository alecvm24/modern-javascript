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




            
            
                
        
                
