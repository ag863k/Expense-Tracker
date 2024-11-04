
// Selectors for HTML elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expensesList = document.getElementById('expenses');
const totalAmountDisplay = document.getElementById('total-amount');

// State variable for total amount
let totalAmount = 0;

// Function to update the total display
function updateTotalAmount() {
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

// Function to add an expense to the list
function addExpense(name, amount) {
    // Create list item for new expense
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `${name} - $${amount.toFixed(2)} <button class="delete-btn">Remove</button>`;
    
    // Append the new expense item to the expenses list
    expensesList.appendChild(expenseItem);

    // Update total amount
    totalAmount += amount;
    updateTotalAmount();

    // Attach event listener to delete button
    const deleteButton = expenseItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        removeExpense(expenseItem, amount);
    });
}

// Function to remove expense from the list
function removeExpense(expenseItem, amount) {
    expensesList.removeChild(expenseItem);
    totalAmount -= amount;
    updateTotalAmount();
}

// Event listener for form submission
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name && amount > 0) {
        addExpense(name, amount);
        expenseForm.reset();
    } else {
        alert('Please enter valid expense details.');
    }
});
