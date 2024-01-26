const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message')
const autoclicker = document.getElementById('autoclicker');
const punktograb = document.getElementById('punktograb')
const pts = document.getElementById('pts');



let score = 1200;
let clickValue = 1; //początkowa wartość kliknięcie
let clickUpgradeCost = 10; //Cena bazowa ulepszenia kliknięcia
let clickUpgradeCount = 0; //Ilośc zakupionych ulepszeń kliknięcia

let baseAutoclickerValue = 0.8;
let autoclickerUpgradeCost = 200; //Cena bazowa autoclickera
let autoclickerUpgradeCount = 0; //Ilośc zakupionych autoclickerow

let basePunktograbValue = 4;
let punktograbUpgradeCost = 1000;
let punktograbUpgradeCount = 0;

let autoClickerInterval;











//dodanie funckji przycisku do zwiększania pkt
clickButton.addEventListener('click', () => {

    score += clickValue;

    updateScore();
    updateUpgradeButton();
    updateAutoclicker();
    clearMessage();
    updateAutoclicker();
    updatePunktograb();
    clickPurchase();
    autoclickerPurchase();
    punktograbPurchase();
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
        updateAutoclicker();
        clearMessage();
        clickPurchase();
        autoclickerPurchase();
        punktograbPurchase();
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

function addPunktograb() {
    if (score >= punktograbUpgradeCost) {

        punktograbUpgradeCount += 1;
        score -= punktograbUpgradeCost;
        punktograbUpgradeCost = Math.ceil(1000 * Math.pow(1.15, punktograbUpgradeCount));
    } else {
        showMessage("Nie masz wystarczającej liczby punktów, aby kupić to ulepszenie");
    }
};



function updateInterval() {
    clearInterval(autoClickerInterval);
    autoClickerInterval = setInterval(() => {
        score += autoclickerUpgradeCount * baseAutoclickerValue + punktograbUpgradeCount * basePunktograbValue;
        updateScore();
        updatePTS();
        clickPurchase();
        autoclickerPurchase();
        punktograbPurchase();
        console.log(score)
    }, 1000);
}


autoclicker.addEventListener('click', () => {
    addAutoclicker();
    updateAutoclicker();
    updateScore();
    updateInterval();
    updatePTS();
    clickPurchase();
    autoclickerPurchase();
    punktograbPurchase();
})

punktograb.addEventListener('click', () => {
    addPunktograb();
    updatePunktograb();
    updateScore();
    updateInterval();
    updatePTS();
    clickPurchase();
    autoclickerPurchase();
    punktograbPurchase();
})













function updatePTS() {
    const totalPoints = autoclickerUpgradeCount * baseAutoclickerValue + punktograbUpgradeCount * basePunktograbValue;
    pts.textContent = `PTS: ${totalPoints.toFixed(2)}`;
}

//upadte przycisku do ulepszenia
function updateUpgradeButton() {

    upgradeButton.textContent = `Ulepsz Click masz: ${clickUpgradeCount} koszt: ${clickUpgradeCost} czyli ${clickUpgradeCount + 1} na kliknięcie`

}

function updateAutoclicker() {
    autoclicker.textContent = `Ulepsz AutoClicker masz: ${autoclickerUpgradeCount} koszt: ${autoclickerUpgradeCost}`
}

function updatePunktograb() {
    punktograb.textContent = `Ulepsz Punktograb masz: ${punktograbUpgradeCount} koszt: ${punktograbUpgradeCost}`
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

function clickPurchase() {
    const upgradeButton = document.getElementById('upgradeButton');

    if (score >= clickUpgradeCost) {
        upgradeButton.classList.add('purchase');
    } else {
        upgradeButton.classList.remove('purchase');
    }
}

function autoclickerPurchase() {
    const autoclicker = document.getElementById('autoclicker');

    if (score >= autoclickerUpgradeCost) {
        autoclicker.classList.add('purchase');
    } else {
        autoclicker.classList.remove('purchase');
    }
}

function punktograbPurchase() {
    const punktograb = document.getElementById('punktograb');

    if (score >= punktograbUpgradeCost) {
        punktograb.classList.add('purchase');
    } else {
        punktograb.classList.remove('purchase');
    }
}