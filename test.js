function random(max) {
    return parseInt(Math.random() * max);
}

function randomizeArray(array) {
    let idx, value;
    for (let i = 0; i < array.length; i++) {
        idx = random(array.length);
        value = array[idx];
        array[idx] = array[i];
        array[i] = value;
    }
}

let n = 4;
let cards = [];

for (let i = 0; i < n / 2; i++) {
    cards.push(i);
    cards.push(i);
}

randomizeArray(cards);
console.log(cards);
