function claimBonus() {
    const bonusAmount = 1000; // Сумма бонуса
    const balanceAmountElement = document.getElementById('balanceAmount');
    
    // Получаем текущий баланс из локального хранилища
    let currentBalance = parseInt(localStorage.getItem('userBalance')) || 0;
    
    // Добавляем бонус к текущему балансу
    currentBalance += bonusAmount;
    
    // Сохраняем новый баланс в локальном хранилище
    localStorage.setItem('userBalance', currentBalance);
    
    // Обновляем отображение баланса
    balanceAmountElement.textContent = currentBalance;
    
    // Отображаем сообщение о получении бонуса
    document.getElementById('bonusMessage').textContent = `You claimed your daily bonus of $${bonusAmount}!`;
}

// При загрузке страницы загружаем текущий баланс
document.addEventListener('DOMContentLoaded', () => {
    const balanceAmountElement = document.getElementById('balanceAmount');
    const currentBalance = parseInt(localStorage.getItem('userBalance')) || 0;
    balanceAmountElement.textContent = currentBalance; // Отображаем текущий баланс
});
