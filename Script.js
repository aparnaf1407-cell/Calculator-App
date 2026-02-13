const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.classList.contains("clear")) {
            expression = "";
            display.value = "";
            return;
        }

        if (button.classList.contains("back")) {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }

        if (button.classList.contains("equal")) {
            try {
                if (expression === "") return;

                const result = Function('"use strict";return (' + expression + ')')();
                expression = result.toString();
                display.value = expression;
            } catch {
                display.value = "Error";
                expression = "";
            }
            return;
        }

        const value = button.getAttribute("data-value");

        const lastChar = expression.slice(-1);

        // Prevent multiple operators
        if (isOperator(lastChar) && isOperator(value)) {
            return;
        }

        // Prevent multiple decimals in one number
        if (value === ".") {
            const parts = expression.split(/[\+\-\*\/]/);
            if (parts[parts.length - 1].includes(".")) {
                return;
            }
        }

        expression += value;
        display.value = expression;
    });
});

