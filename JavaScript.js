let totalNumbers = 0; // Количество чисел, будет установлено пользователем
let k = 2; // Каждое k-е число исключается

// Обработчик события для кнопки "Set Numbers"
document.getElementById('setNumbers').addEventListener('click', () => {
    totalNumbers = parseInt(document.getElementById('totalNumbers').value);
    if (isNaN(totalNumbers) || totalNumbers <= 0) {
        alert("Please enter a valid number greater than zero.");
        return;
    }
    const predictedNumber = josephus(totalNumbers, k) + 1; // Предсказанное число
    const predictedOdds = calculateOdds(totalNumbers); // Рассчитываем коэффициенты

    // Отображаем предсказанное число и коэффициенты на странице
    document.getElementById("predicted-number").innerText = `Predicted Number: ${predictedNumber}`;
    document.getElementById("predicted-odds").innerText = `Odds: ${predictedOdds}`;
});

// Функция для решения проблемы Иосифа
function josephus(n, k) {
    if (n === 1) {
        return 0; // Позиция в 0-индексации
    } else {
        return (josephus(n - 1, k) + k) % n;
    }
}

// Функция для расчета коэффициентов на основе общего количества чисел
function calculateOdds(n) {
    if (n < 10) {
        return 2; // Коэффициент для менее чем 10 чисел
    } else if (n < 20) {
        return 3; // Коэффициент для 10-19 чисел
    } else {
        return 5; // Коэффициент для 20 и более чисел
    }
}

// Функция для вращения колеса рулетки
function spin() {
    const wheel = document.getElementById('rouletteWheel');
    wheel.classList.add('spin'); // Добавляем класс для анимации

    setTimeout(() => {
        wheel.classList.remove('spin'); // Удаляем класс после завершения анимации
        const winningNumber = Math.floor(Math.random() * totalNumbers); // Генерируем выигрышное число
        alert(`Winning Number: ${winningNumber + 1}`); // Показать выигрышное число (добавляем 1 для 1-индексации)
        
        // Проверяем, выиграл ли игрок
        const predictedNumber = josephus(totalNumbers, k) + 1; // Предсказанное число
        if (winningNumber + 1 === predictedNumber) {
            alert("Congratulations! You guessed the winning number!");
        } else {
            alert("Sorry! You did not guess the winning number.");
        }
    }, 3000); // Время анимации (3000 мс = 3 секунды)
}

// Обработчик события для кнопки Spin
document.getElementById('spinButton').addEventListener('click', spin);

// Функция для обработки ставки
function placeBet(betAmount) {
    if (betAmount <= 0) {
        alert("Bet amount must be greater than zero.");
        return;
    }

    // Логика для обновления истории ставок
    updateBetHistory(betAmount);
}

// Функция для обновления истории ставок
function updateBetHistory(amount) {
    const betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
    const betEntry = {
        date: new Date().toLocaleString(),
        amount: amount,
        outcome: "pending" // Начальное состояние
    };
    betHistory.push(betEntry);
    localStorage.setItem('betHistory', JSON.stringify(betHistory));
    displayBetHistory();
}

// Функция для отображения истории ставок
function displayBetHistory() {
    const historyContainer = document.getElementById('betHistory');
    historyContainer.innerHTML = ""; // Очистка предыдущего содержимого

    const betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
    betHistory.forEach((bet) => {
        const betEntry = document.createElement('div');
        betEntry.textContent = `Date: ${bet.date}, Amount: $${bet.amount}, Outcome: ${bet.outcome}`;
        historyContainer.appendChild(betEntry);
    });
}

// Загружаем историю ставок при загрузке страницы
document.addEventListener('DOMContentLoaded', displayBetHistory);
