const display = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
//console.log(buttons);
let a, b = 0;
let expression = "";
let answer = 0;
function add(a, b) {
    console.log(a + b);
    return a + b;
}

function subtract(a, b) {
    console.log(a - b);
    return a - b;
}

function multiply(a, b) {
    console.log(a * b);
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.log("Error! Cannot divide by zero");
        return "Error! Cannot divide by zero";
    } else {
        console.log(a / b);
        return a / b;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
    }
}

buttons.forEach(button =>{
        button.addEventListener("click", function(e){
            expression += e.target.innerHTML;
            display.append(e.target.innerHTML);
            //console.log(e.target.innerHTML)
        });
});

function calculate(expression){
    let operator = "";
    a = parseInt(expression.charAt(0));
    operator = expression.charAt(1);
    b= parseInt(expression.charAt(2));
    answer = operate(operator, a, b);
    console.log(answer);
    display.innerText = answer;
}


