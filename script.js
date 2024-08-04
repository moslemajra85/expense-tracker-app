const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const title = document.getElementById('title');
const amount = document.getElementById('amount');

const dummyTransactions = [
  {
    id: 1,
    title: 'flowers',
    amount: -20,
  },
  {
    id: 2,
    title: 'books',
    amount: -10,
  },
  {
    id: 3,
    title: 'salary',
    amount: 300,
  },
  {
    id: 4,
    title: 'Camera',
    amount: 150,
  },
];

let transactions = dummyTransactions;
let amounts = extractAmounts(transactions);

// extract amounts
function extractAmounts(transactions) {
  return transactions.map((tr) => tr.amount);
}

// add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and an amount');
  } else {
    const transaction = {
      id: generateId(),
      title: text.value,
      amount: parseFloat(amount.value),
    };

    transactions.push(transaction);
    // reassign amounts since the transactions has changed
    amounts = extractAmounts(transactions);
    addTransactionsDOM(transaction);
    updateValues();

    text.value = '';
    amount.value = '';
  }
}

// generate random id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// remove a transaction from list of transaction
function removeTransactionDOM(transaction) {
  // update the ui
//   const item = document.querySelector(`[data-item-id="${transaction.id}"]`);
//   if (item) {
//     item.remove();
//   }

  // update data
  transactions = transactions.filter((tr) => tr.id !== transaction.id);
  amounts = extractAmounts(transactions);
  //updateValues()
  init()
 }

// Add transactions To Dom
function addTransactionsDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
      ${transaction.title}<span>${sign}${Math.abs(transaction.amount)}</span>
      <button onClick='removeTransactionDOM(${JSON.stringify(
        transaction
      )})' class='delete-btn'>x</button>
    `;

  item.setAttribute('data-item-id', transaction.id);

  list.appendChild(item);
}

function calculateTotal(amounts) {
  return amounts.reduce((acc, curr) => acc + curr, 0);
}

function calculateBalance() {
  const myBalance = calculateTotal(amounts);
  balance.innerHTML = `<span>$</span>${myBalance}`;
}

function incomeExpense() {
  const income = calculateTotal(amounts.filter((amount) => amount > 0));
  const expense = Math.abs(
    calculateTotal(amounts.filter((amount) => amount < 0))
  ).toFixed(2);
  money_plus.innerHTML = `<span>+$</span>${income}`;
  money_minus.innerHTML = `<span>-$</span>${expense}`;
}

function updateValues() {
  calculateBalance();
  incomeExpense();
}

// add event listener
form.addEventListener('submit', addTransaction);

// init app
function init() {
  list.innerHTML = '';
  transactions.forEach((transaction) => {
    addTransactionsDOM(transaction);
  });
  updateValues();
}

init();
