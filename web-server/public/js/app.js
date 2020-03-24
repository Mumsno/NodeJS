console.log('Client Side JS File is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector("#location");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageContainer = document.querySelector(".message-container");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch("/weather?location=" + search.value).then((response) => {
        response.json().then((data) => {
            messageContainer.style.opacity = 1;
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
                return;
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast;
        })
    })
})
