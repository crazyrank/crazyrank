document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');
    const expensesList = document.getElementById('expenses');
    const totalExpense = document.getElementById('total');

    let expenses = [];



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const expense = {
            name: expenseName.value,
            amount: parseFloat(expenseAmount.value),
            category: expenseCategory.value,
        };
        expenses.push(expense);
        updateExpensesList();
        updateTotalExpense();
        expenseName.value = '';
        expenseAmount.value = '';
    });
    
    

    function updateExpensesList() {
        expensesList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)} (${expense.category})
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            expensesList.appendChild(li);
        });


        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                expenses.splice(index, 1);
                updateExpensesList();
                updateTotalExpense();
            });
        });
    }
    

    function updateTotalExpense() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpense.textContent = total.toFixed(2);
    }
});