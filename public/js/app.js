

const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const location = locationInput.value

  messageOne.textContent = "loading..."

  // fetch weather using input value:
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = ': ' + data.location
        messageTwo.textContent = ': ' + data.forecast
      }
    })
  })

})
