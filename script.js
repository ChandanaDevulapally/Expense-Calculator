// DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

// Expense data (using LocalStorage)
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Format number as INR (Indian Rupees) with commas and ₹ symbol
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

// Function to render the list of expenses
function renderExpenses() {
    expenseList.innerHTML = ''; // Clear the list
    let income = 0;
    let expense = 0;

    expenses.forEach((expenseItem, index) => {
        const li = document.createElement('li');
        li.classList.add(expenseItem.category.toLowerCase());
        
        li.innerHTML = `
            <span>${expenseItem.description} - ${formatCurrency(expenseItem.amount)} (${expenseItem.category})</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);

        // Calculate totals
        if (expenseItem.category === 'Income') {
            income += parseFloat(expenseItem.amount);
        } else {
            expense += parseFloat(expenseItem.amount);
        }
    });

    // Update totals with formatted INR
    totalIncome.textContent = formatCurrency(income);
    totalExpenses.textContent = formatCurrency(expense);
    balance.textContent = formatCurrency(income - expense);
}

// Function to add an expense
function addExpense() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const category = categoryInput.value;

    if (description && !isNaN(amount) && amount > 0) {
        const newExpense = { description, amount, category };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses(); // Re-render the list after adding a new expense

        // Clear inputs
        descriptionInput.value = '';
        amountInput.value = '';
        categoryInput.value = 'Income';
    } else {
        alert('Please enter valid data for description and amount.');
    }
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1); // Remove the expense from the array
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
    renderExpenses(); // Re-render the list
}

// Event listener for adding a new expense
addExpenseBtn.addEventListener('click', addExpense);

// Render the expenses on page load
renderExpenses();
