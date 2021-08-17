const buttons = document.getElementsByClassName("buttons");
const display = document.getElementById("current");
const history = document.getElementById("history");
const btnArray = Array.from(buttons);
let operation = "";
let input = "";

function numbersListener(event){
    if((!isNaN(event.target.innerHTML))){
        
            operation += event.target.innerHTML;
        
            display.innerHTML = operation;
            input += event.target.innerHTML + " ";
            //console.log(input);
    }  
}

function decimal(event){

    

    console.log(input);

    let hasDecimal = false;
    let regex = /[+|-|\u00f7|\u00d7]/; 
    let inputTokens = input.split(regex);
    console.log(inputTokens);
    if(inputTokens.length == 1 && inputTokens[0].lastIndexOf(".") > 0){
        hasDecimal = true;
    }else if(inputTokens.length == 2 && inputTokens[1].lastIndexOf(".") > 0){
        hasDecimal = true;
    }
   
    if(!hasDecimal){
        operation += event.target.innerHTML;
        
        display.innerHTML = operation;
        input += event.target.innerHTML + " ";
    }
    
    console.log(hasDecimal);
}
function operations(event){
    if(event.target.className == "buttons basicOperations"){
        operation += " " + event.target.innerHTML + " ";
        //display.innerHTML = "";
        display.innerHTML = operation;
        //history.innerHTML += operation;
        //console.log(operation);
        input += event.target.innerHTML + " ";
    }
    
}

btnArray.forEach(button => {
    button.addEventListener("click", numbersListener);
    button.addEventListener("click", operations);
})

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
    if(b === 0){
        return "Error. Cannot divide by 0";
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
    return factorial(a - 1) * a;
}

function clear(){
    operation = "";
    display.innerHTML = "";
    history.innerHTML = "";
    input = "";
}

function sumUp(){
    operation = operation.toString(10);
    if(!operation.includes("+") && !operation.includes("-") && !operation.includes("\u00d7") && !operation.includes("\u00f7")){
        if(input.includes("!")){
            input = factorial(input.replace("!", ""));
            display.innerHTML = input;
            operation = input;
            return;
        }
        if(input.includes("\u00b2")){
            input = sqr(input.replace("\u00b2", ""));
            display.innerHTML = input;
            operation = input;
            return;
        }
        
        input = display.innerHTML.replace("  ", "");
        display.innerHTML = input;
        return;
    }
    let sum = operation.trim().split(" ");
    //console.log(sum[0]);

    if(sum[0] == "-"){
        sum[0] = sum[0].concat(sum[1]);
        let value = sum.(1);
    }
    if(sum[0].includes("\u00b2")){
        let value = sum[0].replace("\u00b2", "");
        sum[0] = sqr(value);
    }else if(sum[0].includes("!")){
        let value = sum[0].replace("!", "");
        sum[0] = factorial(value);
    }
   
    console.log(sum);
    if(sum[2].includes("\u00b2")){
        let value = sum[2].replace("\u00b2", "");
        sum[2] = sqr(value);
    }else if(sum[2].includes("!")){
        let value = sum[2].replace("!", "");
        sum[2] = factorial(value);
    }
    //console.log(operation);
    //console.log(sum[0]);
    //console.log(sum[2]);
    history.innerHTML = operation;
    let answer = operate(Number.parseFloat(sum[0]), Number.parseFloat(sum[2]), sum[1]);
    operation = answer;
    display.innerHTML = answer;
    input = answer.toString(10);
}

function backspace(){
    let inputTokens = input.split(" ");
    console.log(inputTokens);
    input = "";
    for(let i = 0; i < inputTokens.length - 2; i++){
        input += inputTokens[i] + " ";
    }
    console.log(input);
    display.innerHTML = input;
    operation = input;
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

function otherFunctions(event){
        operation += event.target.id;
        display.innerHTML = operation;
        input += event.target.id + " ";
    }

for(let i = 0; i < btnArray.length; i++){
    if(btnArray[i].innerHTML == "C"){
        btnArray[i].addEventListener("click", clear);
    }
    if(btnArray[i].innerHTML == "="){
        btnArray[i].addEventListener("click", sumUp);
    }
    if(btnArray[i].id == "del"){
        btnArray[i].addEventListener("click", backspace);
    }
    if(btnArray[i].id == "."){
        btnArray[i].addEventListener("click", decimal);
    }
    if(btnArray[i].id == "!" || btnArray[i].id == "\u00b2"){
        btnArray[i].addEventListener("click", otherFunctions);
    }
}