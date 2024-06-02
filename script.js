let clickCount = 0;
let clickValue = 1;
let totalClicks = 0;
let upgradeCosts = [10, 50, 100, 500, 1000];
let upgrades = [1, 5, 10, 0.1, 0];
let offlineIncomeRate = 0; // Initial offline income rate in clicks per minute
let offlineUpgradeCost = 100;
let progressGoal = 100;
let progressFill = 0;
let lastActiveTime = Date.now();
let level = 1;
let cps = 0;
let bonusMinutes = 0;

const clickSound = new Audio('click-sound.mp3');
const upgradeSound = new Audio('upgrade-sound.mp3');

function incrementClickCount() {
    clickCount += clickValue;
    totalClicks += clickValue;
    document.getElementById('click-count').textContent = clickCount;
    document.getElementById('total-clicks').textContent = totalClicks;
    updateProgressBar();
    checkLevelUp();
    clickSound.play();
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
        upgradeSound.play();
    } else {
        alert('Not enough clicks!');
    }
}

function buyOfflineUpgrade() {
    if (clickCount >= offlineUpgradeCost) {
        clickCount -= offlineUpgradeCost;
        offlineIncomeRate += 1; // Increase offline income rate by 1 click per minute
        offlineUpgradeCost = Math.round(offlineUpgradeCost * 1.5);
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById('offline-upgrade-cost').textContent = offlineUpgradeCost;
        document.getElementById('offline-income-rate').textContent = offlineIncomeRate;
        updateProgressBar();
        upgradeSound.play();
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
    document.getElementById('stats-menu').style.display = 'none';
}

function showUpgradesMenu() {
    document.getElementById('earnings-menu').style.display = 'none';
    document.getElementById('upgrades-menu').style.display = 'block';
    document.getElementById('stats-menu').style.display = 'none';
}

function showStatsMenu() {
    document.getElementById('earnings-menu').style.display = 'none';
    document.getElementById('upgrades-menu').style.display = 'none';
    document.getElementById('stats-menu').style.display = 'block';
}

function calculateOfflineEarnings() {
    let currentTime = Date.now();
    let elapsedMinutes = (currentTime - lastActiveTime) / (1000 * 60);
    if (elapsedMinutes > 4 * 60) elapsedMinutes =4 * 60; // Cap at 4 hours of offline earnings

    // Calculate offline earnings based on the offline income rate
    let offlineEarnings = Math.floor(elapsedMinutes * offlineIncomeRate);
    
    // Increment click count and update UI
    clickCount += offlineEarnings;
    document.getElementById('click-count').textContent = clickCount;
    updateProgressBar();
}

function checkLevelUp() {
    if (clickCount >= progressGoal) {
        level++;
        clickCount -= progressGoal;
        progressGoal = Math.round(progressGoal * 1.5);
        document.getElementById('level').textContent = level;
        document.getElementById('click-count').textContent = clickCount;
        updateProgressBar();
    }
}

function bonusPerMinute() {
    bonusMinutes += 1;
    clickCount += clickValue * bonusMinutes;
    document.getElementById('click-count').textContent = clickCount;
}

window.onload = function() {
    if (localStorage.getItem('lastActiveTime')) {
        lastActiveTime = parseInt(localStorage.getItem('lastActiveTime'));
        calculateOfflineEarnings();
    }
    setInterval(() => {
        cps = clickValue / 10;  // Simulate clicks per second as 10% of current click value
        document.getElementById('clicks-per-second').textContent = cps.toFixed(2);
        clickCount += cps;
        document.getElementById('click-count').textContent = clickCount.toFixed(0);
        updateProgressBar();
    }, 1000);

    setInterval(bonusPerMinute, 60000); // Update bonus per minute
}

window.onunload = function() {
    localStorage.setItem('lastActiveTime', Date.now());
}
function buyUpgrade(upgradeIndex) {
    let cost = upgradeCosts[upgradeIndex - 1];
    if (clickCount >= cost) {
        clickCount -= cost;
        if (upgradeIndex <= 3) {
            clickValue += upgrades[upgradeIndex - 1];
        } else if (upgradeIndex === 4) {
            clickValue *= 1.1; // Increase click value by 10%
        } else if (upgradeIndex === 5) {
            bonusMinutes++; // Increase bonus minutes
        }
        upgradeCosts[upgradeIndex - 1] = Math.round(upgradeCosts[upgradeIndex - 1] * 1.5);
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById(`upgrade${upgradeIndex}-cost`).textContent = upgradeCosts[upgradeIndex - 1];
        updateProgressBar();
        upgradeSound.play();
    } else {
        alert('Not enough clicks!');
    }
}

function buyOfflineUpgrade() {
    if (clickCount >= offlineUpgradeCost) {
        clickCount -= offlineUpgradeCost;
        offlineIncomeRate += 1; // Increase offline income rate by 1 click per minute
        offlineUpgradeCost = Math.round(offlineUpgradeCost * 1.5);
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById('offline-upgrade-cost').textContent = offlineUpgradeCost;
        document.getElementById('offline-income-rate').textContent = offlineIncomeRate;
        updateProgressBar();
        upgradeSound.play();
    } else {
        alert('Not enough clicks!');
    }
}

