const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message')
const autoclicker = document.getElementById('autoclicker');
const pts = document.getElementById('pts');


let score = 200;
let clickValue = 1; //początkowa wartość kliknięcie
let clickUpgradeCost = 10; //Cena bazowa ulepszenia kliknięcia
let clickUpgradeCount = 0; //Ilośc zakupionych ulepszeń kliknięcia
let autoclickerUpgradeCost = 200; //Cena bazowa autoclickera
let autoclickerUpgradeCount = 0; //Ilośc zakupionych autoclickerow

let autoClickerInterval;











//dodanie funckji przycisku do zwiększania pkt
clickButton.addEventListener('click', () => {

    score += clickValue;

    updateScore();
    updateUpgradeButton();
    updateAutoclicker()
    clearMessage();
});

//upgrade podstawowego przyciksu
upgradeButton.addEventListener('click', () => {
    if (score >= clickUpgradeCost) {

        clickValue += 1;

        clickUpgradeCount += 1;

        score -= clickUpgradeCost;

        clickUpgradeCost = Math.ceil(10 * Math.pow(1.5, clickUpgradeCount));

        updateUpgradeButton();
        updateScore();
        updateAutoclicker()
        clearMessage();
    } else {
        showMessage("Nie masz wystarczającej liczby punktów, aby kupić to ulepszenie");
    }
});

function addAutoclicker() {
    if (score >= autoclickerUpgradeCost) {

        autoclickerUpgradeCount += 1;
        score -= autoclickerUpgradeCost;
        autoclickerUpgradeCost = Math.ceil(200 * Math.pow(1.15, autoclickerUpgradeCount));
    } else {
        showMessage("Nie masz wystarczającej liczby punktów, aby kupić to ulepszenie");
    }
};



function updateInterval() {
    clearInterval(autoClickerInterval);
    autoClickerInterval = setInterval(() => {
        score += autoclickerUpgradeCount * 0.8;
        updateScore();
        updatePTS();
    }, 1000);
}



autoclicker.addEventListener('click', () => {
    addAutoclicker();
    updateAutoclicker();
    updateScore();
    updateInterval();
})













function updatePTS() {
    pts.textContent = `PTS: ${autoclickerUpgradeCount * 0.8}`;
}

//upadte przycisku do ulepszenia
function updateUpgradeButton() {

    upgradeButton.textContent = `Ulepsz Click - masz: ${clickUpgradeCount} koszt: ${clickUpgradeCost} czyli ${clickUpgradeCount + 1} na kliknięcie`

}

function updateAutoclicker() {
    autoclicker.textContent = `Ulepsz Click - masz: ${autoclickerUpgradeCount} koszt: ${autoclickerUpgradeCost}`
}

function updateScore() {

    scoreDisplay.textContent = `Wynik: ${score.toFixed(2)}`;

}



function showMessage(message) {

    messageDisplay.innerHTML = `<p>${message}</p>`;
    messageDisplay.classList.add('show-message');

}

function clearMessage() {

    messageDisplay.innerHTML = '';
    messageDisplay.classList.remove('show-message');

}
