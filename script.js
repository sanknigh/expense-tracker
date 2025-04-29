// LOGIN FUNCTION
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
  
    const storedPassword = localStorage.getItem(`user_${username}`);
    if (!storedPassword) {
      alert('User does not exist.');
      return;
    }
  
    if (storedPassword !== password) {
      alert('Incorrect password.');
      return;
    }
  
    // Save user session
    localStorage.setItem('loggedInUser', username);
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  }
  
  // REGISTER FUNCTION (optional if you have registration page)
  function register() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
  
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
  
    if (localStorage.getItem(`user_${username}`)) {
      alert('Username already exists.');
      return;
    }
  
    localStorage.setItem(`user_${username}`, password);
    alert('Registration successful! Redirecting to login...');
    window.location.href = 'login.html';
  }
  
  // DASHBOARD LOGIC
  function loadDashboard() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      window.location.href = 'login.html'; // Force login if not logged in
      return;
    }
  
    document.getElementById('user').textContent = username;
    renderTransactions();
  }
  
  // LOGOUT FUNCTION
  function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  }
  
  // TRANSACTION HANDLING
  let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  
  function addTransaction() {
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
  
    if (!desc || isNaN(amount) || amount <= 0) {
      alert('Enter a valid description and amount.');
      return;
    }
  
    const transaction = {
      type,
      desc,
      amount,
      date: new Date().toLocaleString(),
    };
  
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    clearInputs();
  }
  
  function renderTransactions() {
    const list = document.getElementById('transaction-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpense = document.getElementById('total-expense');
    const balance = document.getElementById('balance');
  
    list.innerHTML = '';
    let income = 0;
    let expense = 0;
  
    transactions.forEach((t, index) => {
      const li = document.createElement('li');
      li.textContent = `${t.date} - ${t.desc}: ₹${t.amount} (${t.type})`;
      list.appendChild(li);
  
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
  
    totalIncome.textContent = income.toFixed(2);
    totalExpense.textContent = expense.toFixed(2);
    balance.textContent = (income - expense).toFixed(2);
  }
  
  function clearInputs() {
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
  }
// Function to clear the input fields
function clearFields() {
    // Clear the input fields
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
  }
    