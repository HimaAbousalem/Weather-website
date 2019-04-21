console.log('Client side javascript file is loaded !')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location =  searchElement.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((forecastData)=>{
            if(forecastData.error) messageOne.textContent =forecastData.error
            else {
                messageOne.textContent = forecastData.location
                messageTwo.textContent = forecastData.forecast
            }
        })
    })
})