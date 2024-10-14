import Calculator from "./src/calculator.js";
import Operator from "./src/operator.js";

const fst_number_element = document.querySelector("#current-first-number");
const snd_number_element = document.querySelector("#current-second-number");
const operator_element = document.querySelector("#current-operator");
const prev_calculation = document.querySelector("#previous-calculation");

let calc = new Calculator(
  (onchange = () => {
    fst_number_element.innerHTML = calc.getFirstNumber;
    snd_number_element.innerHTML = calc.getSecndNumber;
    operator_element.innerHTML = calc.getOperator.symbol;
    prev_calculation.innerHTML =
      calc.getPreviousCalculation != null
        ? calc.getPreviousCalculation.toString()
        : "";
  }),
  () => {
    play_error_shake();
  }
);

document.addEventListener("keypress", (event) => {
  event.preventDefault();
  if (event.key.match(/\d/) != null) {
    calc.appendDigit(event.key);
  } else if (event.key.match(/\.|,/) != null) {
    calc.appendDecimal();
  } else if (event.key.match(/\+/) != null) {
    calc.setOperator = new Operator("add");
  } else if (event.key.match(/-/) != null) {
    calc.setOperator = new Operator("sub");
  } else if (event.key.match(/\*|x|X/) != null) {
    calc.setOperator = new Operator("mul");
  } else if (event.key.match(/\/|:/) != null) {
    calc.setOperator = new Operator("div");
  } else if (event.key.match(/=|Enter/) != null) {
    calc.calculate();
  } else if (event.key.match(/c/) != null) {
    calc.clear();
  } else if (event.key.match(/C|A/) != null) {
    calc.allClear();
  }
});

document.querySelectorAll(".number-button").forEach((element) => {
  element.addEventListener("click", () => {
    calc.appendDigit(element.innerHTML);
  });
});

document.querySelectorAll(".operator-button").forEach((element) => {
  element.addEventListener("click", () => {
    calc.setOperator = new Operator(element.id);
  });
});

document.querySelector("#decimal").addEventListener("click", () => {
  calc.appendDecimal();
});

document.querySelector("#clear").addEventListener("click", () => {
  calc.clear();
});

document.querySelector("#all-clear").addEventListener("click", () => {
  calc.allClear();
});

document.querySelector("#equals").addEventListener("click", () => {
  calc.calculate();
});

// handle menu buttons
// kill all active dropdowns
document.onclick = (e) => {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (e.target.closest(".dropdown") != dropdown) {
      dropdown.classList.remove("active");
    }
  });
};

document.querySelectorAll(".menu-button").forEach((element) => {
  element.onclick = () => {
    const dropdown = element.parentElement;
    dropdown.classList.toggle("active");
  };
});

const DIV_ZERO_STRING = "div_zero";
const BKG_SCROLL_STRING = "bkg_scroll";

function load_localstorage() {
  const div_zero_local = localStorage.getItem(DIV_ZERO_STRING);
  const bkg_scroll_local = localStorage.getItem(BKG_SCROLL_STRING);

  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  const default_div_zero = false;
  const default_bkg_scroll = !isReduced;

  div_zero_toggle.checked =
    div_zero_local === null ? default_div_zero : div_zero_local === "true";
  bkg_scroll_toggle.checked =
    bkg_scroll_local === null
      ? default_bkg_scroll
      : bkg_scroll_local === "true";

  update_bkg_scroll();
}

function update_div_zero() {
  calc.setIsDivZeroAllowed = div_zero_toggle.checked;
}

function update_bkg_scroll() {
  if (bkg_scroll_toggle.checked) {
    document.querySelector("#scroll-container").classList.add("running");
  } else {
    document.querySelector("#scroll-container").classList.remove("running");
  }
}

const div_zero_toggle = document.querySelector("#div-zero");
const bkg_scroll_toggle = document.querySelector("#bkg-scroll");

window.addEventListener("load", () => {
  load_localstorage();
  update_div_zero();
  update_bkg_scroll();
});

function play_error_shake() {
  const display = document.querySelector("#display");
  if (display.getAnimations().length > 0) {
    return;
  }

  display.classList.remove("shaking");
  display.offsetWidth;
  display.classList.add("shaking");
}

div_zero_toggle.onchange = () => {
  localStorage.setItem(DIV_ZERO_STRING, div_zero_toggle.checked);
  update_div_zero();
};

bkg_scroll_toggle.onchange = () => {
  localStorage.setItem(BKG_SCROLL_STRING, bkg_scroll_toggle.checked);
  update_bkg_scroll();
};

// mobile
document.querySelector(".hamburger-button").onclick = () => {
  document.querySelector("#menu-wrapper").classList.toggle("open")
};

// handle text scrolling
const scroll_container = document.querySelector("#scroll-container");
const row_template = document.querySelector("#scroll-row-template");

for (let i = 0; i < 64; i++) {
  const row_instance = row_template.content.cloneNode(true);
  scroll_container.appendChild(row_instance);
}

document.querySelectorAll(".scroll-row").forEach((element) => {
  const ul_template = document.querySelector("#scroll-ul-template");
  for (let i = 0; i < 2; i++) {
    const ul_instance = ul_template.content.cloneNode(true);
    element.appendChild(ul_instance);
  }
});

document.querySelectorAll(".scroll-row ul").forEach((element) => {
  const li_template = document.querySelector("#scroll-li-template");
  for (let i = 0; i < 64; i++) {
    const li_instance = li_template.content.cloneNode(true);
    element.appendChild(li_instance);
  }
});
