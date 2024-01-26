const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message')


let score = 0;
let clickValue = 1; //początkowa wartość kliknięcie
let clickUpgradeCost = 10; //Cena bazowa ulepszenia kliknięcia
let clickUpgradeCount = 0; //Ilośc zakupionych ulepszeń kliknięcia


clickButton.addEventListener('click', () => {

    score += clickValue;

    updateScore();
    updateUpgradeButton();
    clearMessage();
});

upgradeButton.addEventListener('click', () => {
    if (score >= clickUpgradeCost ) {

        clickValue += 1;

        clickUpgradeCount += 1;

        score -= clickUpgradeCost;

        clickUpgradeCost = Math.ceil(10 * Math.pow(1.5, clickUpgradeCount));

        updateUpgradeButton();
        updateScore();
        clearMessage();
    } else {
        showMessage("Nie masz wystarczającej liczby punktów, aby kupić to ulepszenie");
    }
});

function updateUpgradeButton() {

    upgradeButton.textContent = `Ulepsz Click - masz: ${clickUpgradeCount} koszt: ${clickUpgradeCost}`

}

function updateScore() {

    scoreDisplay.textContent = `Wynik: ${score}`;

}

function showMessage(message) {

    messageDisplay.innerHTML = `<p>${message}</p>`;
    messageDisplay.classList.add('show-message');

}

function clearMessage() {

    messageDisplay.innerHTML = '';
    messageDisplay.classList.remove('show-message');

}
