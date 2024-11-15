/*
    I found this useful page: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
*/

const input = document.querySelector("input");
input.value = "";

input.addEventListener("input", updateValue);
let caption = '';

function updateValue(e) {
    let query = e.target.value.toLowerCase();
    let cardss = document.querySelectorAll('.card');

    for (let i = 0; i < 12; i++) {
        caption = cardss[i].getAttribute("data-caption").toLowerCase();
        console.log(caption);
        let word = caption.match(query);

        if (word == null) {
            cardss[i].style.display = "none";
        }
        else {
            cardss[i].style.display = "inherit";
        }
    }
}