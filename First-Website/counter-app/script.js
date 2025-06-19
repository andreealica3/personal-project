// --- CUSTOM SELECT FUNCTIONALITY ---
function setSelectedCurrency(displayText, value) {
  const selected = document.querySelector('.custom-select .selected');
  const hiddenInput = document.getElementById('currency');
  selected.textContent = displayText;
  selected.setAttribute('data-value', value);
  hiddenInput.value = value;
}

document.querySelectorAll('.custom-select').forEach(select => {
  const selected = select.querySelector('.selected');
  const options = select.querySelector('.options');

  // Set default
  setSelectedCurrency('RON lei', 'RON');

  selected.addEventListener('click', () => {
    options.classList.toggle('visible');
  });

  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      setSelectedCurrency(option.textContent, option.dataset.value);
      options.classList.remove('visible');
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      options.classList.remove('visible');
    }
  });
});

// --- HOLD BUTTON FUNCTION ---
function setupHoldButton(button, callback) {
  let timeoutId, intervalId;

  const start = () => {
    callback();
    timeoutId = setTimeout(() => {
      intervalId = setInterval(callback, 100);
    }, 400);
  };

  const stop = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };

  button.addEventListener('mousedown', start);
  button.addEventListener('touchstart', start);
  button.addEventListener('mouseup', stop);
  button.addEventListener('mouseleave', stop);
  button.addEventListener('touchend', stop);
  button.addEventListener('touchcancel', stop);
}

// --- GOAL INPUT FUNCTIONALITY ---
const goalInput = document.getElementById('goal');

goalInput.addEventListener('focus', () => {
  if (goalInput.value === '0') {
    goalInput.value = '';
  }
});

goalInput.addEventListener('blur', () => {
  const value = parseInt(goalInput.value);
  if (isNaN(value) || value < 0) {
    goalInput.value = '0';
  } else {
    goalInput.value = value;
  }
});

setupHoldButton(document.querySelector('.increase'), () => {
  let current = parseInt(goalInput.value) || 0;
  goalInput.value = (current === 0) ? 10 : current + 1;
});

setupHoldButton(document.querySelector('.decrease'), () => {
  let current = parseInt(goalInput.value) || 0;
  if (current === 10) {
    goalInput.value = 0;
  } else if (current > 0) {
    goalInput.value = current - 1;
  }
});

// --- GLOBAL STATE ---
let savedAmount = 0;
let goalAmount = 0;
let currency = '';
let transactionHistory = [];
let sessionStart = new Date().toISOString();

// --- NEXT BUTTON FUNCTIONALITY ---
document.querySelector('.next-btn').addEventListener('click', () => {
  const currencyInput = document.getElementById("currency");
  const currencyValue = currencyInput.value;
  const goalValue = parseInt(goalInput.value);
  const goalWrapper = document.getElementById("goal-wrapper");

  let hasError = false;

  if (!currencyValue) {
    document.querySelector('.custom-select .selected').classList.add('error');
    hasError = true;
  } else {
    document.querySelector('.custom-select .selected').classList.remove('error');
  }

  if (!goalValue || goalValue < 10) {
    goalWrapper.classList.add('error');
    hasError = true;
  } else {
    goalWrapper.classList.remove('error');
  }

  if (hasError) return;

  document.querySelector('.step-1').classList.add('hidden');
  document.querySelector('.step-2').classList.remove('hidden');

  currency = currencyValue;
  goalAmount = goalValue;
  updateProgress();
});

// --- PROGRESS LOGIC ---
function updateProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const progressLabel = document.querySelector('.progress-label');

  const percent = Math.min((savedAmount / goalAmount) * 100, 100);
  progressFill.style.width = `${percent}%`;
  progressLabel.textContent = `${savedAmount} / ${goalAmount} ${currency} (${percent.toFixed(1)}%)`;
  if (savedAmount >= goalAmount) {
  alert("🎉 Congrats! You have reached your goal! Press Start Over to begin again.");
}
}

// --- ADD / SUBTRACT MONEY ---
document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('amount');
  const value = parseFloat(input.value);

  if (isNaN(value) || value <= 0) return;

  savedAmount += value;
  transactionHistory.push(value); // pentru undo
  updateProgress();
  input.value = '';
  saveToLocalStorage();
});

document.getElementById('subtract-btn').addEventListener('click', () => {
  const input = document.getElementById('amount');
  const value = parseFloat(input.value);

  if (isNaN(value) || value <= 0) return;

  savedAmount -= value;
  if (savedAmount < 0) savedAmount = 0;

  transactionHistory.push(-value);
  updateProgress();
  input.value = '';
  saveToLocalStorage();
});


// --- START OVER BUTTON ---
document.querySelector('.start-over').addEventListener('click', () => {
  // 1. Salvăm sesiunea anterioară în istoric
  const history = JSON.parse(localStorage.getItem('savingsHistory')) || [];
  history.push({
    savedAmount,
    goalAmount,
    currency,
    transactionHistory,
    sessionStart,
    sessionEnd: new Date().toISOString()
  });
  localStorage.setItem('savingsHistory', JSON.stringify(history));

  // 2. Resetăm tot pentru o nouă sesiune
  savedAmount = 0;
  goalAmount = 0;
  currency = '';
  transactionHistory = [];
  sessionStart = new Date().toISOString(); // resetăm startul sesiunii

  document.getElementById('goal').value = 0;
  setSelectedCurrency('RON lei', 'RON');

  document.querySelector('.step-1').classList.remove('hidden');
  document.querySelector('.step-2').classList.add('hidden');

  document.querySelector('.custom-select .selected').classList.remove('error');
  document.getElementById('goal-wrapper').classList.remove('error');

  updateProgress();
  saveToLocalStorage(); // salvăm starea resetată
});


// AMOUNT INPUT ---
const amountInput = document.getElementById('amount');

amountInput.addEventListener('focus', () => {
  if (amountInput.value === '0') {
    amountInput.value = '';
  }
});

amountInput.addEventListener('blur', () => {
  const value = parseInt(amountInput.value);
  if (isNaN(value) || value < 0) {
    amountInput.value = '0';
  } else {
    amountInput.value = value;
  }
});

// INCREASE-DECREASE FOR AMOUNT ---

amountInput.addEventListener('input', () => {
  amountInput.value = amountInput.value.replace(/[^0-9]/g, '');
});

setupHoldButton(document.querySelector('.increase-amount'), () => {
  let current = parseInt(amountInput.value) || 0;
  amountInput.value = current + 1;
});

setupHoldButton(document.querySelector('.decrease-amount'), () => {
  let current = parseInt(amountInput.value) || 0;
  if (current > 0) {
    amountInput.value = current - 1;
  }
});

// QUICK AMOUNT BUTTONS---
const quickAmounts = [5, 10, 15, 20, 50, 100];
const amountButtonsContainer = document.querySelector('.amount-buttons');

quickAmounts.forEach(amount => {
  const btn = document.createElement('button');
  btn.classList.add('quick-amount');
  btn.textContent = `+${amount}`;
  btn.addEventListener('click', () => {
    let current = parseFloat(amountInput.value) || 0;
    amountInput.value = current + amount;
  });
  amountButtonsContainer.appendChild(btn);
});

// UNDO BUTTON ---
document.getElementById('undo').addEventListener('click', () => {
  if (transactionHistory.length === 0) return;

  const lastTransaction = transactionHistory.pop();
  savedAmount -= lastTransaction;

  if (savedAmount < 0) savedAmount = 0;

  updateProgress();
});

// LOCAL STORAGE SAVE --- 

function saveToLocalStorage() {
  // Salvăm sesiunea curentă
  localStorage.setItem('savingsApp', JSON.stringify({
    savedAmount,
    goalAmount,
    currency,
    transactionHistory,
    step: document.querySelector('.step-2').classList.contains('hidden') ? 1 : 2,
    sessionStart
  }));
}

// DONE BUTTON ---

document.getElementById('done').addEventListener('click', () => {
  saveToLocalStorage();
  alert("✔️ Progress saved! You can continue later.");
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('savingsApp'));

  if (saved) {
    savedAmount = saved.savedAmount || 0;
    goalAmount = saved.goalAmount || 0;
    currency = saved.currency || 'RON';
    transactionHistory = saved.transactionHistory || [];
    sessionStart = saved.sessionStart || new Date().toISOString();

    document.getElementById('goal').value = goalAmount;
    setSelectedCurrency(currency, currency);

    if (saved.step === 2) {
      document.querySelector('.step-1').classList.add('hidden');
      document.querySelector('.step-2').classList.remove('hidden');
    } else {
      document.querySelector('.step-1').classList.remove('hidden');
      document.querySelector('.step-2').classList.add('hidden');
    }

    updateProgress();
  }
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', () => {
    document.body.classList.add('keyboard-open');
  });

  input.addEventListener('blur', () => {
    document.body.classList.remove('keyboard-open');
  });
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', () => {
    setTimeout(() => {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  });
});

function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('DOMContentLoaded', setViewportHeight);






