const buttons = document.getElementsByClassName("buttons");
const display = document.getElementById("current");
const history = document.getElementById("history");
const btnArray = Array.from(buttons);
let operation = "";
let input = "";
let regex = /[+|-|\u00f7|\u00d7]/; 

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0){
        return "illegal activity";
    }
    return a / b;
}

function sqr(a){
    return a * a;
}

function factorial(a){
    if(a == 0){
        return 1;
    }

    if(a > 0){
        return factorial(a - 1) * a;
    }
}

function operate(a, b, operator){

    switch(operator){
        case "+":
             return add(a, b);
        case "-":
            return subtract(a, b);
        case "\u00f7":
            
            return divide(a, b);
        case "\u00d7":
            return multiply(a, b);
    }
}

function clear(){
    operation = "";
    display.innerHTML = "";
    history.innerHTML = "";
    input = "";
}

function hasFactorial(a){
    return a.includes("!");
}

function hasSqr(a){
    return a.includes("\u00b2")
}

function operateNegatives(){
    
    let sum = operation.toString(10).trim().split(" ");
    let newSum;
    if(sum.length == 2){
        newSum = [sum[0].concat(sum[1])];
    }

    if(sum.length == 3){
        return sum;
    }
    
    if(sum.length == 4){
        newSum = [sum[0].concat(sum[1]), sum[2], sum[3]];
    }

    if(sum.length == 5){
        newSum = [sum[0], sum[1], sum[3].concat(sum[4])];
    }

    if(sum.length == 6){
        newSum = [sum[0].concat(sum[1]), sum[2], sum[4].concat(sum[5])]; 
    }
    return newSum;
}

function evaluate(sum){
    let regex = /[!|\u00b2]/;
    let value;
    if(sum.length == 1){
        value = sum[0].replace(regex, "");
        if(sum[0].charAt(0) == "-" && hasFactorial(sum[0])){
            return sum[0].charAt(0).concat(factorial(value.replace("-", "")));
        }
        
        if(hasSqr(sum[0])){
            return sqr(value);
        }
    }

    if(hasFactorial(sum[0])){
        if(sum[0].charAt(0) == "-"){
            value = sum[0].replace(regex, "");
            sum[0] = sum[0].charAt(0).concat(factorial(value.replace("-", "")));
        }else{
            sum[0] = factorial(sum[0].replace("!", ""));
        }
    }else if(hasSqr(sum[0])){
        sum[0] = sqr(sum[0].replace("\u00b2", ""));
    }

    if(hasFactorial(sum[2])){
        if(sum[2].charAt(0) == "-"){
            value = sum[2].replace(regex, "");
            sum[2] = sum[2].charAt(0).concat(factorial(value.replace("-", "")));
        }else{
            sum[2] = factorial(sum[2].replace("!", ""));
        }
    }else if(hasSqr(sum[2])){
        sum[2] = sqr(sum[2].replace("\u00b2", ""));
    }
    return sum;
}

function hasFactorialSqr(sumToCheck){
    let hasFSqr = false;
    sumToCheck.forEach(element => {
        if(element.includes("!") || element.includes("\u00b2")){
            hasFSqr = true;
        }
    });
    return hasFSqr;
}

function sumUp(){
    let answer;
    let sum;
    operation = operation.toString(10);
    sum = operation.trim().split(" ");

    if(sum.length == 1){
        if(hasFactorial(input)){
            answer = factorial(operation.replace("!", "")); 
        }else if(hasSqr(input)){
            answer = input = sqr(input.replace("\u00b2", ""));
            
        }else{
            answer = input;
        }
        if(answer.toString(10) === "NaN"){
            display.style.color = "red";
            display.innerHTML = "ERROR.";
            history.innerHTML = "";
            operation = "";
            input = "";
            return;
        }
        display.innerHTML = answer;
        input = display.innerHTML.replace("  ", "");
        history.innerHTML = answer;
        operation = answer.toString(10);
        return;
    }

    if(sum.includes("-")){
        sum = operateNegatives();
    }

    if(hasFactorialSqr(sum)){
        if(sum.length == 1){
            answer = evaluate(sum);
            history.innerHTML = operation;
            operation = answer;
            display.innerHTML = answer;
            input = answer.toString(10);
            return;
        }
        sum = evaluate(sum);
    }

    answer = operate(Number.parseFloat(sum[0]), Number.parseFloat(sum[2]), sum[1]);
    
    if(answer == "illegal activity"){
        display.style.color = "red";
        display.innerHTML = "ERROR. Cannot divide by 0";
        history.innerHTML = "";
        operation = "";
        input = "";
        return;
    }
    if(answer.toString(10) === "NaN"){
        display.style.color = "red";
        display.innerHTML = "ERROR.";
        history.innerHTML = "";
        operation = "";
        input = "";
        return;
    }

    let finalAns = Math.round(answer * 1000) / 1000;
    history.innerHTML = operation;
    operation = finalAns;
    display.innerHTML = finalAns;
    input = finalAns.toString(10);
}

function backspace(){
    let editedInput = input.trim();
    let inputTokens = editedInput.split(" ");
    input = "";
    for(let i = 0; i < inputTokens.length - 1; i++){
        input += inputTokens[i] + " ";
    }
    
    operation = input.trim();
    display.innerHTML = operation;
}

function numbersHandler(event){
    display.style.color = "black";
    operation += event.target.innerHTML;
    display.innerHTML = operation;
    input += event.target.innerHTML + " "; 
}

function decimalHandler(event){
    let hasDecimal = false;
    
    let inputTokens = input.split(regex);
    if(inputTokens.length == 1 && inputTokens[0].lastIndexOf(".") > 0){
        hasDecimal = true;
    }else if(inputTokens.length == 2 && inputTokens[1].lastIndexOf(".") > 0){
        hasDecimal = true;
    }
   
    if(!hasDecimal){
        operation += event.target.innerHTML;
        display.innerHTML = operation;
        input += event.target.innerHTML;
    }
}

function otherFunctionsHandler(event){
    operation += event.target.id;
    display.innerHTML = operation;
    input += event.target.id + " ";
}

function basicOperationsHandler(event){
    let num;
    let count = 0;

    if(operateNegatives()== undefined){
        num = 0;
    }else{
        let a = operateNegatives();
        num = operateNegatives().length;
        for(let i = 0; i < num; i++){
            if(!isNaN(a[i])){
                count++;
            }
        }
    }
    console.log(count);
    if(num == 3 && (event.target.innerHTML != "-" || count >= 2)){
        sumUp();
    }

    if(num == 4){
        sumUp();
    }

    operation += " " + event.target.innerHTML + " ";
    display.innerHTML = operation;
    input += event.target.innerHTML + " ";
}

btnArray.forEach(button => {
    if(!isNaN(button.innerHTML)){
        button.addEventListener("click", numbersHandler);
    }

    if(button.className == "buttons basicOperations"){
    button.addEventListener("click", basicOperationsHandler);
    }

    if(button.innerHTML == "C"){
        button.addEventListener("click", clear);
    }

    if(button.innerHTML == "="){
        button.addEventListener("click", sumUp);
    }

    if(button.id == "del"){
        button.addEventListener("click", backspace);
    }

    if(button.id == "."){
        button.addEventListener("click", decimalHandler);
    }

    if(button.id == "!" || button.id == "\u00b2"){
        button.addEventListener("click", otherFunctionsHandler);
    }
});


