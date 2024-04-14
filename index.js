window.addEventListener("load", initialize);
function initialize() {
    const taxForm = document.getElementById("tax-form");
    const grossIncome = document.getElementById("gross-income");
    const extraIncome = document.getElementById("extra-income");
    const ageGroup = document.getElementById("age-group");
    const deductions = document.getElementById("deductions");
    const closeButton = document.getElementById("close-button");

    grossIncome.addEventListener("input", validateGrossIncome);
    extraIncome.addEventListener("input", validateExtraIncome);
    ageGroup.addEventListener("input", validateAgeGroup);
    deductions.addEventListener("input", validateDeductions);
    taxForm.addEventListener("submit", (e) => hanldeTaxCalculation(e));
    closeButton.addEventListener("click", hideResult);

    function hanldeTaxCalculation(e) {
        e.preventDefault();
        if (!isFormValid()) return;

        let [overallIncome, tax] = calculateTax();
        updateResult(overallIncome, tax);
        showResult();
    }

    function calculateTax() {
        let tax = 0;
        let overallIncome =
            parseFloat(grossIncome.value || 0) +
            parseFloat(extraIncome.value || 0) -
            parseFloat(deductions.value || 0);

        if (overallIncome <= 800000) tax = 0;
        else {
            if (ageGroup.value == 1) tax = (overallIncome * 30) / 100;
            else if (ageGroup.value == 2) tax = (overallIncome * 40) / 100;
            else tax = (overallIncome * 10) / 100;
        }
        return [overallIncome, tax];
    }

    function isFormValid() {
        let isValid = true;
        isValid = validateGrossIncome() && isValid;
        isValid = validateExtraIncome() && isValid;
        isValid = validateAgeGroup() && isValid;
        isValid = validateDeductions() && isValid;
        return isValid;
    }

    function validateGrossIncome() {
        const grossWarningButton = document.getElementById(
            "gross-warning-button"
        );
        if (
            !grossIncome.value ||
            isNaN(grossIncome.value) ||
            grossIncome.value < 0
        ) {
            grossWarningButton.classList.remove("hidden");
            grossIncome.classList.add("warning-input");
            return false;
        } else {
            grossWarningButton.classList.add("hidden");
            grossIncome.classList.remove("warning-input");
            return true;
        }
    }
    function validateExtraIncome() {
        const extraWarningButton = document.getElementById(
            "extra-warning-button"
        );
        if (
            !extraIncome.value ||
            isNaN(extraIncome.value) ||
            extraIncome.value < 0
        ) {
            extraWarningButton.classList.remove("hidden");
            extraIncome.classList.add("warning-input");
            return false;
        } else {
            extraWarningButton.classList.add("hidden");
            extraIncome.classList.remove("warning-input");
            return true;
        }
    }
    function validateAgeGroup() {
        const ageGroupWarningButton = document.getElementById(
            "age-group-warning-button"
        );
        if (!ageGroup.value || ageGroup.value < 1) {
            ageGroupWarningButton.classList.remove("hidden");
            ageGroup.classList.add("warning-input");
            return false;
        } else {
            ageGroupWarningButton.classList.add("hidden");
            ageGroup.classList.remove("warning-input");
            return true;
        }
    }
    function validateDeductions() {
        const deductionsWarningButton = document.getElementById(
            "deductions-warning-button"
        );
        if (
            !deductions.value ||
            isNaN(deductions.value) ||
            deductions.value < 0
        ) {
            deductionsWarningButton.classList.remove("hidden");
            deductions.classList.add("warning-input");
            return false;
        } else {
            deductionsWarningButton.classList.add("hidden");
            deductions.classList.remove("warning-input");
            return true;
        }
    }

    function updateResult(overallIncome, tax) {
        const taxDeducted = document.getElementById("tax-deducted");
        const netIncome = document.getElementById("net-income");

        taxDeducted.textContent = tax.toLocaleString("en-IN");
        netIncome.textContent = (overallIncome - tax).toLocaleString("en-IN");
    }

    function showResult() {
        const resultOverlay = document.getElementById("result-overlay");
        resultOverlay.classList.remove("hidden");
    }
    function hideResult() {
        const resultOverlay = document.getElementById("result-overlay");
        resultOverlay.classList.add("hidden");
    }
}
