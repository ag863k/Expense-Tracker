// Enhanced 3D Expense Tracker JavaScript with Advanced Effects

// Selectors for HTML elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expensesList = document.getElementById('expenses-list');
const totalAmountDisplay = document.getElementById('total-amount');
const expenseCountDisplay = document.getElementById('expense-count');
const averageExpenseDisplay = document.getElementById('average-expense');
const todayCountDisplay = document.getElementById('today-count');
const emptyState = document.getElementById('empty-state');
const clearAllBtn = document.getElementById('clear-all');
const loadingOverlay = document.getElementById('loading-overlay');
const notificationContainer = document.getElementById('notification-container');

// State variables
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;
let expenseCount = 0;
let averageExpense = 0;
let todayCount = 0;

// Category icons mapping
const categoryIcons = {
    food: '🍔',
    transport: '🚗',
    shopping: '🛍️',
    bills: '💡',
    entertainment: '🎬',
    health: '🏥',
    education: '📚',
    other: '📦'
};

// Initialize the app
function init() {
    loadExpenses();
    updateStats();
    toggleEmptyState();
    setupEventListeners();
    addScrollAnimations();
}

// Setup event listeners
function setupEventListeners() {
    expenseForm.addEventListener('submit', handleFormSubmit);
    clearAllBtn.addEventListener('click', clearAllExpenses);
    
    // Add input animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Please fill in all fields correctly.', 'error');
        return;
    }
    
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;
    
    showLoading('Adding expense...');
    
    // Simulate async operation for better UX
    setTimeout(() => {
        addExpense(name, amount, category);
        expenseForm.reset();
        hideLoading();
        showNotification('Expense added successfully!', 'success');
        
        // Focus management for accessibility
        expenseNameInput.focus();
    }, 800);
}

// Add expense function
function addExpense(name, amount, category) {
    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
        date: new Date().toISOString(),
        dateString: new Date().toLocaleDateString()
    };
    
    expenses.unshift(expense);
    saveExpenses();
    renderExpenses();
    updateStats();
    toggleEmptyState();
    
    announceToScreenReader(`Added expense: ${name} for $${amount.toFixed(2)}`);
}

// Remove expense function
function removeExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;
    
    expenses = expenses.filter(e => e.id !== id);
    saveExpenses();
    renderExpenses();
    updateStats();
    toggleEmptyState();
    
    showNotification('Expense removed successfully!', 'success');
    announceToScreenReader(`Removed expense: ${expense.name}`);
}

// Clear all expenses
function clearAllExpenses() {
    if (expenses.length === 0) return;
    
    if (confirm('Are you sure you want to clear all expenses?')) {
        showLoading();
        
        setTimeout(() => {
            expenses = [];
            saveExpenses();
            renderExpenses();
            updateStats();
            toggleEmptyState();
            hideLoading();
            showNotification('All expenses cleared!', 'success');
        }, 600);
    }
}

// Render expenses
function renderExpenses() {
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.style.animationDelay = `${index * 0.1}s`;
        
        expenseItem.innerHTML = `
            <div class="expense-info">
                <div class="expense-category">${categoryIcons[expense.category]}</div>
                <div class="expense-details">
                    <h4>${expense.name}</h4>
                    <p>${expense.dateString}</p>
                </div>
            </div>
            <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            <button class="delete-btn" onclick="removeExpense(${expense.id})" 
                    title="Delete expense" aria-label="Delete ${expense.name}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        expensesList.appendChild(expenseItem);
    });
}

// Update statistics
function updateStats() {
    totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    expenseCount = expenses.length;
    averageExpense = expenseCount > 0 ? totalAmount / expenseCount : 0;
    
    // Calculate today's expenses
    const today = new Date().toDateString();
    todayCount = expenses.filter(expense => 
        new Date(expense.date).toDateString() === today
    ).length;
    
    // Update displays with animations
    animateNumber(totalAmountDisplay, totalAmount, '$');
    animateNumber(expenseCountDisplay, expenseCount);
    animateNumber(averageExpenseDisplay, averageExpense, '$');
    animateNumber(todayCountDisplay, todayCount);
}

// Animate number changes
function animateNumber(element, targetValue, prefix = '') {
    const currentValue = parseFloat(element.textContent.replace(/[^0-9.]/g, '')) || 0;
    const difference = targetValue - currentValue;
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const current = currentValue + (difference * easedProgress);
        const displayValue = prefix === '$' ? 
            `${prefix}${current.toFixed(2)}` : 
            Math.round(current).toString();
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Toggle empty state
function toggleEmptyState() {
    if (expenses.length === 0) {
        emptyState.style.display = 'block';
        expensesList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        expensesList.style.display = 'block';
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from localStorage
function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        renderExpenses();
    }
}

// Show loading overlay
function showLoading(message = 'Processing...') {
    const loadingText = loadingOverlay.querySelector('p');
    if (loadingText) {
        loadingText.textContent = message;
    }
    
    loadingOverlay.classList.add('active');
    
    // Add a subtle progress animation
    setTimeout(() => {
        const spinner = loadingOverlay.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.animation = 'spin 1.2s linear infinite, pulse 2s ease-in-out infinite';
        }
    }, 100);
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${iconMap[type]} notification-icon"></i>
            <div class="notification-text">${message}</div>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add entrance animation
    setTimeout(() => {
        notification.style.animation = 'slideInNotification 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }, 100);
    
    // Auto remove with enhanced exit animation
    setTimeout(() => {
        notification.style.animation = 'slideInNotification 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19) reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Handle input focus
function handleInputFocus(e) {
    e.target.style.transform = 'translateY(-2px) scale(1.02)';
}

// Handle input blur
function handleInputBlur(e) {
    e.target.style.transform = 'translateY(0) scale(1)';
}

// Add scroll animations
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Enhanced cursor effect with parallax
let animationId;
let isAnimating = false;

document.addEventListener('mousemove', (e) => {
    if (!isAnimating) {
        isAnimating = true;
        animationId = requestAnimationFrame(() => {
            updateCursor(e.clientX, e.clientY);
            updateParallax(e.clientX, e.clientY);
            isAnimating = false;
        });
    }
});

function updateCursor(x, y) {
    let cursor = document.querySelector('.cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }
    
    cursor.style.left = x - 10 + 'px';
    cursor.style.top = y - 10 + 'px';
}

function updateParallax(x, y) {
    const shapes = document.querySelectorAll('.floating-shape');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const moveX = (x - centerX) * speed;
        const moveY = (y - centerY) * speed;
        
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Enhanced button interactions
document.addEventListener('mousedown', (e) => {
    if (e.target.matches('.add-btn, .clear-btn, .delete-btn')) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.classList.add('active');
        }
    }
});

document.addEventListener('mouseup', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.classList.remove('active');
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent features
        updateStats();
    }, 250);
});