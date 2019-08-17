// console.log('Client side javascript file is loaded')

// fetch('http://localhost:3000/weather?address=philadelphia').then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error)
//     } else {
//       console.log(data.location)
//       console.log(data.forecast)
//     }
//   })
// })

const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "New Message"


weatherForm.addEventListener('submit', (event) => {
  // handle weatherForm submit event
  event.preventDefault() // disables default submit behavior that refreshes page upon submit.
  const location = locationInput.value
  // console.log('✅submitting')
  messageOne.textContent = "loading..."
  // fetch weather using input value:
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        // console.log(data.error)
        messageOne.textContent = data.error
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = '🌐: ' + data.location
        messageTwo.textContent = ' ⛅️ ' + data.forecast
        // console.log(data.location)
        // console.log(data.forecast)
      }
    })
  })

})
