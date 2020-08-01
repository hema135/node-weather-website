// import { response } from "express"

console.log("external js file")

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
// response.json().then((data) => {
//     console.log(data)
// })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// if (data.error)
// messageOne.textContent = data.error
// else 
// messageOne.textContent = data

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent= "Loading..."
    messageTwo.textContent= ''
    fetch(`/weather?address=${location}`).then((response) => {
        console.log(location)
    response.json().then((data) => {
    if (data.error) {
     messageOne.textContent = data.error
    }else {
    messageOne.textContent = data.address

    messageTwo.textContent = data.description
    }
    })
})
} )
