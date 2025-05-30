document.querySelectorAll('.custom-select').forEach(select => {
  const selected = select.querySelector('.selected');
  const options = select.querySelector('.options');
  const hiddenInput = document.getElementById('currency');

  selected.addEventListener('click', () => {
    options.classList.toggle('visible');
  });

  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;
      options.classList.remove('visible');
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      options.classList.remove('visible');
    }
  });
});


function setupHoldButton(button, callback) {
  let timeoutId;
  let intervalId;

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

const goalInput = document.getElementById('goal');

setupHoldButton(document.querySelector('.increase'), () => {
  goalInput.value = parseInt(goalInput.value || 0) + 1;
});

setupHoldButton(document.querySelector('.decrease'), () => {
  if (parseInt(goalInput.value) > 0) {
    goalInput.value = parseInt(goalInput.value) - 1;
  }
});

const nextButton = document.querySelector('.next-btn');

nextButton.addEventListener('click', () => {
  const currencyValue = document.getElementById("currency").value;
});
