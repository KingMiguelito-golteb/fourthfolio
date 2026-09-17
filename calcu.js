function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult(){
    const display = document.getElementById('display');
    const expr = display.value.trim();
    if (!expr) return;
    // Allow only safe characters: digits, operators, dots, parentheses
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
        display.value = "Error";
        setTimeout(clearDisplay, 1200);
        return;
    }
    try {
        // Use Function instead of eval, still evaluate math expression safely
        const result = Function('"use strict"; return (' + expr + ')')();
        if (!isFinite(result)) throw new Error("Invalid");
        display.value = String(result);
    } catch (e) {
        display.value = "Error";
        setTimeout(clearDisplay, 1200);
    }
}
