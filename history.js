let balance = 1000000; // начальный баланс пользователя
let predictedNumber = Math.floor(Math.random() * 37); // "предсказанное" число
let predictedOdds = 36; // коэффициент для одиночного числа на стандартной рулетке

// Отображаем предсказанное число и коэффициент
document.getElementById("predicted-number").innerText = predictedNumber;
document.getElementById("predicted-odds").innerText = predictedOdds;

// Массив для истории ставок
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];

// Функции для обновления и отображения истории ставок
function updateBetHistory() {
    localStorage.setItem('betHistory', JSON.stringify(betHistory));
    displayBetHistory();
}

function displayBetHistory() {
    const historyContainer = document.getElementById('betHistory');
    historyContainer.innerHTML = ''; // Очищаем контейнер перед обновлением
    betHistory.forEach((bet) => {
        const betEntry = document.createElement('div');
        betEntry.textContent = `Date: ${bet.date}, Amount: $${bet.amount}, Outcome: ${bet.outcome}`;
        historyContainer.appendChild(betEntry);
    });
}

// Слушатели событий
document.querySelector(".spin-button").addEventListener("click", spinWheel);
document.getElementById("place-bet").addEventListener("click", placeBet);

function spinWheel() {
    const wheel = document.querySelector(".roulette-wheel");
    wheel.classList.add("spin");

    setTimeout(() => {
        wheel.classList.remove("spin");
        checkResult();
    }, 3000);
}

function checkResult() {
    let betNumber = parseInt(document.getElementById("bet-number").value);
    let betAmount = parseInt(document.getElementById("bet-amount").value);
    
    let outcome;
    if (betNumber === predictedNumber) {
        // Если ставка выиграла
        let winnings = betAmount * predictedOdds;
        balance += winnings;
        outcome = 'win';
        document.getElementById("result").innerText = `Поздравляем! Вы выиграли ${winnings}$. Ваш текущий баланс: ${balance}$`;
    } else {
        // Если ставка проиграла
        balance -= betAmount;
        outcome = 'lose';
        document.getElementById("result").innerText = `Вы проиграли ${betAmount}$. Ваш текущий баланс: ${balance}$`;
    }

    // Обновляем историю ставок
    const date = new Date().toLocaleDateString(); // Текущая дата
    betHistory.push({ date, amount: betAmount, outcome });
    updateBetHistory();

    // Обновляем "предсказание" для следующего раунда
    predictedNumber = Math.floor(Math.random() * 37);
    document.getElementById("predicted-number").innerText = predictedNumber;
}

function placeBet() {
    let betAmount = parseInt(document.getElementById("bet-amount").value);
    let betNumber = parseInt(document.getElementById("bet-number").value);

    if (isNaN(betNumber) || betNumber < 0 || betNumber > 36) {
        alert("Введите корректное число для ставки (0-36).");
        return;
    }

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Введите корректную сумму ставки.");
        return;
    }

    if (betAmount > balance) {
        alert("Недостаточно средств на балансе.");
        return;
    }

    // Уменьшаем баланс на сумму ставки
    balance -= betAmount;
    document.getElementById("result").innerText = `Ставка принята. Остаток на балансе: ${balance}$`;

    // Запускаем колесо после ставки
    spinWheel();
}

// Загружаем историю ставок при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayBetHistory();
});
