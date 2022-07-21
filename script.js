const digits = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const topDisplay = document.querySelector("#topDisplay");
const botDisplay = document.querySelector("#botDisplay");
const dot = document.querySelector("#dot");
const neg = document.querySelector("#neg");
const clear = document.querySelector("#clear");
const bs = document.querySelector("#bs");


var num1 = 0;
var num2 = 0;
var sign = "";

function handleClick(){ //clicking calculator
    digits.forEach(e =>{
        e.addEventListener("click", ()=>{ //numbers
            appendNumberBot(e.innerText);
        })
    })

    operator.forEach(e =>{ //operators
        e.addEventListener("click", () => operatorRules(e));
    })

    dot.addEventListener("click", () => addDecimal()); //decimal

    clear.addEventListener("click", () => clearCalc()); //clear screen

    bs.addEventListener("click", () => backspace()); //backspace

    neg.addEventListener("click", () => addNegative());
}
handleClick();

function handleKeyboard(){ //using keyboard
    document.addEventListener('keydown', ()=>{
        if(event.key>=0 && event.key<=9) //numbers
            appendNumberBot(event.key);

        if(event.key == "+" || event.key == "-" || event.key == "/" ||event.key == "*" || event.key == "Enter" || event.key == "=") //operators
            operatorRules(event.key);

        if(event.key == ".")
            addDecimal();

        if(event.key == "Backspace")
            backspace();

        if(event.key == "~")
            addNegative();
    })
}
handleKeyboard();

function operatorRules(e){
    if(sign == ""){ //inputting num1 and sign
        if(e.innerText == "=" || e == "Enter" || e == "=")
            return null;
        sign = e.innerText;
        if(sign == undefined) //if keyboard is used
            sign = e;
        /*const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
        if(numbers[0]=='')
            return null;*/
        appendNumberBot(sign);
    }
    else if(e.innerText == "=" || e == "Enter" || e == "="){ //when user presses equal
        const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
        
        if(numbers[1]=='' || numbers[0]=='') //cannot press equal if both numbers not inputted
            return null;
        equate(sign,numbers[0], numbers[1]);
        sign = "";
    }
    else{ //inputting multiple signs instead of equal continues the equation
        const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
        if(numbers[1]=='' || numbers[0]=='') //cannot input multiple signs e.g 25++
            return null;
        equate(sign,numbers[0], numbers[1]);
        sign = e.innerText;
        if(sign == undefined) //if keyboard is used
            sign = e;
        appendNumberBot(sign);
    }
    
    
}

function appendNumberBot(num){ //work the bottom display
    botDisplay.innerHTML+=num;
}

function addDecimal(){
    const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
    if(sign == "" && !numbers[0].includes("."))
    {
        appendNumberBot(".");
    }
    if(!numbers[1].includes("."))
    {
        appendNumberBot(".");
    }
}

function addNegative(){
    const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
    if(sign == "" && !numbers[0].includes("~"))
    {
        botDisplay.innerHTML = "~" + botDisplay.innerHTML;
    }
    if(!numbers[1].includes("~"))
    {
        botDisplay.innerHTML = botDisplay.innerHTML.replace('+','+~')
        botDisplay.innerHTML = botDisplay.innerHTML.replace('-','-~')
        botDisplay.innerHTML = botDisplay.innerHTML.replace('*','*~')
        botDisplay.innerHTML = botDisplay.innerHTML.replace('/','/~')
    }

}

function clearCalc(){
    sign = '';
    topDisplay.innerHTML = "";
    botDisplay.innerHTML = "";
}

function backspace(){
    botDisplay.innerHTML = botDisplay.innerHTML.slice(0, -1);
}

function roundThreeDP(num){ //keep it to 3dp
    var number = Math.round(num *1000)/1000
    return number;
}

function equate(sign,num1,num2){ //work the top display
    topDisplay.innerHTML = botDisplay.innerHTML;
    topDisplay.innerHTML += "=";
    var result = operation(sign,num1,num2);
    if(result == "Error")
    {
        alert("Don't divide by 0! Clearing calculator...");
        clearCalc();
    }
    else
    {
        result = roundThreeDP(result)
        if(result<0)
            botDisplay.innerHTML = "~" + -result;
        else
            botDisplay.innerHTML = result;
    }
}

function operation(sign,num1,num2){
    num1 = num1.toString();
    num2 = num2.toString();
    if(num1.includes("~")) //check for negative numbers, negative numbers represtened by ~
    {
        num1 = num1.replace('~','');
        num1 = -num1;
    }
    if(num2.includes("~"))
    {
        num2 = num2.replace('~','');
        num2 = -num2;
    }
    num1 = Number(num1);
    num2 = Number(num2);
    switch(sign){
        case "+" :
            return num1 + num2;
            break;
        case "-" :
            return num1-num2;
            break;
        case "*" :
            return num1*num2;
            break;
        case "/":
            if(num2 == 0)
                return "Error";
            else
                return num1/num2;
            break;  
        default:
            return null; 
    }
}

