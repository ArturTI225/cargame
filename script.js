let clickCount = 0;
let clickValue = 1;
let upgradeCosts = [10, 50, 100];
let upgrades = [1, 5, 10];
let progressGoal = 100;
let progressFill = 0;
let lastActiveTime = Date.now();

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

function showEarningsMenu() {
    document.getElementById('earnings-menu').style.display = 'block';
    document.getElementById('upgrades-menu').style.display = 'none';
}

function showUpgradesMenu() {
    document.getElementById('earnings-menu').style.display = 'none';
    document.getElementById('upgrades-menu').style.display = 'block';
}

function calculateOfflineEarnings() {
    let currentTime = Date.now();
    let elapsedHours = (currentTime - lastActiveTime) / (1000 * 60 * 60);
    if (elapsedHours > 4) elapsedHours = 4;
    let offlineEarnings = Math.floor(elapsedHours * 60 * clickValue);
    clickCount += offlineEarnings;
    document.getElementById('click-count').textContent = clickCount;
    updateProgressBar();
}

window.onload = function() {
    if (localStorage.getItem('lastActiveTime')) {
        lastActiveTime = parseInt(localStorage.getItem('lastActiveTime'));
        calculateOfflineEarnings();
    }
}

window.onunload = function() {
    localStorage.setItem('lastActiveTime', Date.now());
}
