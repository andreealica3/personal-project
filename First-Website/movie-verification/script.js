window.addEventListener("DOMContentLoaded", function () { 
  let button = document.querySelector("#checkBtn");

  button.addEventListener("click", function () {
    let age = parseInt(document.querySelector("#ageInput").value);
    let accompanied = document.querySelector("#accompaniedInput").checked;
    let ticket = document.querySelector("#ticketInput").checked;

    let message = document.querySelector("#message");

    message.classList.remove("success", "error");

    if (ticket === true) {
      if (age >= 18) {
        message.innerText = "You can enter the movie.";
        message.classList.add("success");
      } else if (accompanied === true) {
        message.innerText = "You can enter if accompanied.";
        message.classList.add("success");
      } else {
        message.innerText = "You cannot enter without an adult.";
        message.classList.add("error");
      }
    } else {
      message.innerText = "You cannot enter without a ticket.";
      message.classList.add("error");
    }
  });
});

