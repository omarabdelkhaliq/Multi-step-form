const stepContents = document.querySelectorAll(".step-content");
const stepNums = document.querySelectorAll(".num");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const confirmBtn = document.querySelector(".confirm-btn");

const fields = document.querySelectorAll(".field");
const personalInputs = document.querySelectorAll(".inputs input");

const planSection = document.querySelector(".plan");
const planCards = document.querySelectorAll(".card");
const planPrices = document.querySelectorAll(".plan-price");
const switchBtn = document.querySelector(".switch");
const monthlyText = document.querySelector(".monthly-text");
const yearlyText = document.querySelector(".yearly-text");

const addonCards = document.querySelectorAll(".addon-card");
const addonCheckboxes = document.querySelectorAll(".addon-card input");
const addonPrices = document.querySelectorAll(".addon-price");

const selectedPlanName = document.querySelector(".selected-plan-name");
const selectedPlanPrice = document.querySelector(".selected-plan-price");
const changePlanBtn = document.querySelector(".change-plan-btn");
const summaryAddons = document.querySelector(".summary-addons");
const totalLabel = document.querySelector(".total-label");
const totalPrice = document.querySelector(".total-price");

let currentNum = 0;

function showStep() {
  stepContents.forEach((content) => {
    content.classList.remove("active");
  });
  stepNums.forEach((step) => {
    step.classList.remove("active");
  });
  if (currentNum > 3) {
    stepNums[3].classList.add("active");
  } else {
    stepNums[currentNum].classList.add("active");
  }
  stepContents[currentNum].classList.add("active");
}

nextBtns.forEach((next) => {
  next.addEventListener("click", function () {
    if (currentNum === 0 && validateStep() === false) {
      return;
    } else {
      currentNum++;
      showStep();
    }
if (currentNum === 3) {
      const activeCard = document.querySelector(".card.active");
      const planName = activeCard.dataset.plan;
      
      let planPriceVal = isyeerly ? Number(activeCard.dataset.yearly) : Number(activeCard.dataset.monthly);
      let duration = isyeerly ? "yr" : "mo";
      let durationText = isyeerly ? "Yearly" : "Monthly";

      selectedPlanName.textContent = `${planName} (${durationText})`;
      selectedPlanPrice.textContent = `$${planPriceVal}/${duration}`;
      summaryAddons.innerHTML = "";
      
      let total = planPriceVal;
      addonCards.forEach((card) => {
        const checkbox = card.querySelector("input");
        if (checkbox.checked) {
          const addonName = card.dataset.name;
          const addonPriceVal = isyeerly ? Number(card.dataset.yearly) : Number(card.dataset.monthly);
          total += addonPriceVal;
          const addonItem = document.createElement("div");
          addonItem.classList.add("summary-addon-item");
          addonItem.innerHTML = `
            <p class="addon-title">${addonName}</p>
            <span class="addon-cost">+$${addonPriceVal}/${duration}</span>
          `;
          summaryAddons.appendChild(addonItem);
        }
      });
      totalLabel.textContent = isyeerly ? "Total (per year)" : "Total (per month)";
      totalPrice.textContent = `+$${total}/${duration}`;
    }
  });
});

prevBtns.forEach((prev) => {
  prev.addEventListener("click", function () {
    currentNum--;
    showStep();
  });
});

changePlanBtn.addEventListener("click", function () {
  currentNum = 1;
  showStep();
});

confirmBtn.addEventListener("click", function () {
  currentNum++;
  showStep();
});

function validateStep() {
  let isvalid = true;
  fields.forEach((field) => {
    const input = field.querySelector("input");
    if (
      input.value.trim() === "" ||
      (input.type === "email" && !input.value.includes("@"))
    ) {
      field.classList.add("error");
      isvalid = false;
    } else {
      field.classList.remove("error");
    }
  });
  return isvalid;
}

let selectedPlan = "Arcade";

planCards.forEach((card) => {
  card.addEventListener("click", function () {
    planCards.forEach((active) => {
      active.classList.remove("active");
    });
    card.classList.add("active");
    selectedPlan = card.dataset.plan;
    console.log(selectedPlan);
  });
});

let isyeerly = false;

switchBtn.addEventListener("click", function () {
  isyeerly = !isyeerly;
  switchBtn.classList.toggle("yearly");
  planSection.classList.toggle("yearly");
  monthlyText.classList.toggle("active");
  yearlyText.classList.toggle("active");
  planCards.forEach((card) => {
    const priceEl = card.querySelector(".plan-price");
    if (isyeerly === true) {
      priceEl.textContent = `$${card.dataset.yearly}/yr`;
    } else {
      priceEl.textContent = `$${card.dataset.monthly}/mo`;
    }
  });
  addonCards.forEach((card) => {
    const priceAD = card.querySelector(".addon-price");
    if (isyeerly === true) {
      priceAD.textContent = `+$${card.dataset.yearly}/yr`;
    } else {
      priceAD.textContent = `+$${card.dataset.monthly}/mo`;
    }
  });
});

addonCards.forEach((card) => {
  card.addEventListener("change", function () {
    const checkbox = card.querySelector("input");
    card.classList.toggle("active", checkbox.checked);
  });
});
