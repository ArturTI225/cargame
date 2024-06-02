let clickCount = 0;
let clickValue = 1;
let upgradeCosts = [10, 50, 100];
let upgrades = [1, 5, 10];
let progressGoal = 100;
let progressFill = 0;

function incrementClickCount() {
    clickCount += clickValue;
    document.getElementById('click-count').textContent = clickCount;
    updateProgressBar();
}

function buyUpgrade(upgradeIndex) {
    let cost = upgradeCosts[upgradeIndex - 1];
    if (clickCount >= cost) {
        clickCount -= cost;
        clickValue += upgrades[upgradeIndex - 1];
        upgradeCosts[upgradeIndex - 1] = Math.round(upgradeCosts[upgradeIndex - 1] * 1.5);
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById(`upgrade${upgradeIndex}-cost`).textContent = upgradeCosts[upgradeIndex - 1];
        updateProgressBar();
    } else {
        alert('Not enough clicks!');
    }
}

function updateProgressBar() {
    progressFill = (clickCount / progressGoal) * 100;
    if (progressFill > 100) progressFill = 100;
    document.getElementById('progress-fill').style.width = progressFill + '%';
}
