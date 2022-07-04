"use strict";

const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");

const tipAmount = document.querySelector(".tip_per_person");
const tipTotal = document.querySelector(".tip_total");

const inputs = document.querySelectorAll("input");

const maxLength = 6;

const tipBtns = document.querySelectorAll(".tip_btn");
const resetBtn = document.querySelector(".calculator_reset");

inputs.forEach((input) =>
  input.addEventListener("input", (e) => {
    let targetEl = e.target;
    let InputValue = Number(e.target.value);

    if (targetEl.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    isInputEqualToZero(InputValue, targetEl);

    const isEveryInputNotEqualZero = Array.from(inputs).every(
      (input) => Number(input.value) !== 0
    );

    if (isEveryInputNotEqualZero) {
      calculateTip(tipInput.value);
    }
  })
);

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipBtns.forEach((btn) => btn.classList.remove("active"));
    tipInput.value = 0;
    e.target.classList.add("active");

    if (billInput.value !== "0" && peopleInput.value !== "0") {
      calculateTip(e.target.dataset.tip);
    }
  });
});

function calculateTip(tipValue) {
  const tipPerPerson = (billInput.value * tipValue) / 100 / peopleInput.value;
  const TotalPerPerson = billInput.value / peopleInput.value + tipPerPerson;

  tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
  tipTotal.textContent = `$${TotalPerPerson.toFixed(2)}`;
}

function isInputEqualToZero(InputValue, targetEl) {
  // prevent user from typing more than one 0 and break the length

  if (InputValue === 0) {
    targetEl.value = "";
    targetEl.classList.add("invalid");
  } else {
    targetEl.classList.remove("invalid");
    targetEl.classList.add("valid");

    setTimeout(() => {
      targetEl.classList.remove("valid");
    }, 4000);
  }
}

resetBtn.onclick = () => {
  inputs.forEach((input) => (input.value = 0));
  tipBtns.forEach((btn) => btn.classList.remove("active"));

  tipAmount.textContent = `$0.00`;
  tipTotal.textContent = `$0.00`;
};
