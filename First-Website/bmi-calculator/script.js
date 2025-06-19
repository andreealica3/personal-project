document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#bmi-form");
    const weightInput = document.querySelector("#weight");
    const heightInput = document.querySelector("#height");
    const result = document.getElementById("bmi-result");
    const bmiBtn = document.getElementById("bmi-btn");

    let isResetState = false;

    weightInput.addEventListener("blur", function () {
        const value = weightInput.value.replace(/[^\d.]/g, "");
        if (value && !weightInput.value.includes("kg")) {
            weightInput.value = `${value} kg`;
        }
    });

heightInput.addEventListener("blur", function () {
    const value = heightInput.value.replace(/[^\d.]/g, "");
    if (value) {
        if (value.includes(".")) {
            heightInput.value = `${value} m`;
        } else {
            heightInput.value = `${value} cm`;
        }
    }
});

    weightInput.addEventListener("input", function () {
        weightInput.value = weightInput.value.replace(/[^\d.]/g, "");
    });

    heightInput.addEventListener("input", function () {
        heightInput.value = heightInput.value.replace(/[^\d.]/g, "");
    });

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isResetState) {
        weightInput.value = "";
        heightInput.value = "";
        result.textContent = "";
        result.classList.remove("visible", "underweight", "normal", "overweight", "obese");

        weightInput.disabled = false;
        heightInput.disabled = false;

        bmiBtn.textContent = "Calculate";
        isResetState = false;

        weightInput.focus();
        return;
    }

    const weight = parseFloat(weightInput.value.replace(/[^\d.]/g, ""));
    let rawHeight = parseFloat(heightInput.value.replace(/[^\d.]/g, ""));

    if (rawHeight < 3) {
        rawHeight *= 100;
    }

    const height = rawHeight / 100;

    if (!weight || !height || weight <= 0 || height <= 0) {
        result.innerText = "Oops! Make sure both fields are filled in correctly.";
        result.classList.add("visible");
        return;
    }

    const bmi = (weight / (height ** 2)).toFixed(1);
    const bmiValue = parseFloat(bmi);
    let status = "";
    let icon = "";

    result.classList.remove("underweight", "normal", "overweight", "obese");

    if (bmiValue < 18.5) {
        status = "esti putin aschilopat";
        icon = "🥄";
        result.classList.add("underweight");
    } else if (bmiValue < 25) {
        status = "nu esti grasut";
        icon = "🍏";
        result.classList.add("normal");
    } else if (bmiValue < 30) {
        status = "iti place papica";
        icon = "🍔";
        result.classList.add("overweight");
    } else {
        status = "esti grasut";
        icon = "⚠️";
        result.classList.add("obese");
    }

    result.innerText = `${icon} BMI: ${bmi} — ${status}`;
    result.classList.add("visible");

    weightInput.disabled = true;
    heightInput.disabled = true;

    bmiBtn.textContent = "Reset";
    isResetState = true;
});

});


