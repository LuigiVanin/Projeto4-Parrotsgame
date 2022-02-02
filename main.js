let cards = [];
let selected = [];
let movesCount = 0;
const gifs = [
    "assets/bobrossparrot.gif", // 0
    "assets/explodyparrot.gif", // 1
    "assets/fiestaparrot.gif", // 2
    "assets/metalparrot.gif", // 3
    "assets/revertitparrot.gif", // 4
    "assets/tripletsparrot.gif", // 5
    "assets/unicornparrot.gif", // 6
];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function emptyArray(array) {
    for (let i = 0; i < array.length + 1; i++) {
        array.pop();
    }
}
function restartGame() {
    const main = document.querySelector("main");
    movesCount = 0;
    main.innerHTML = ``;
    cards = [];
    selected = [];
    startGame();
}

function endCheck(n) {
    const end = document.querySelectorAll(".card.selected");
    if (end.length !== n) {
        return;
    }
    cards = [];
    alert(`VOCÊ GANHOU EM ${movesCount} JOGADAS!`);
    let option;
    // trocar depois para Wanna restart the game?(y/n)
    while (option !== "sim" && option !== "nao") {
        option = prompt("Gostaria de jogar novamente?(sim/nao)");
    }
    if (option === "sim") {
        restartGame();
        return;
    }

    // window.location.replace("https://github.com/LuigiVanin/");
    // return;
}

function setCardAction(item) {
    // change to forEach
    for (let i = 0; i < cards.length; i++) {
        item[i].addEventListener("click", async () => {
            if (selected.length == 2) {
                return;
            }
            if (!item[i].classList.contains("selected")) {
                item[i].classList.add("selected");
                selected.push(i);
                movesCount++;
                if (selected.length == 2) {
                    if (cards[selected[0]] !== cards[selected[1]]) {
                        await sleep(1000);
                        item[selected[0]].classList.remove("selected");
                        item[selected[1]].classList.remove("selected");
                    }
                    emptyArray(selected);
                }
            }
            await sleep(1000);
            endCheck(cards.length);
            return;
        });
    }
}

function startGame() {
    let n = null;
    while (!(n <= 14 && n > 3 && n % 2 == 0)) {
        n = prompt(
            "Com quantas cartas quer jogar? (entre 4 a 14, sendo um valor par)"
        );
    }
    for (let i = 0; i < n / 2; i++) {
        cards.push(i);
        cards.push(i);
    }

    randomizeArray(cards);
    const main = document.querySelector("main");

    for (let i = 0; i < n; i++) {
        main.innerHTML += `
        <div class="card">
            <div class="face front-face">
                <img src="./assets/front.png">
            </div> 
            <div class="face back-face">
            <img src="${gifs[cards[i]]}">
            </div>
        </div>`;
    }
    const cardsDOM = document.querySelectorAll(".card");
    setCardAction(cardsDOM);
}

startGame();
