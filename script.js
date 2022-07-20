const digits = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const topDisplay = document.querySelector("#topDisplay");
const botDisplay = document.querySelector("#botDisplay");
const dot = document.querySelector("#dot");
const neg = document.querySelector("#neg");


var num1 = 0;
var num2 = 0;
var sign = "";
var negative = false;

function handleClick(){ //clicking calculator
    digits.forEach(e =>{
        e.addEventListener("click", ()=>{ //numbers
            appendNumberBot(e.innerText);
        })
    })

    operator.forEach(e =>{ //operators
        e.addEventListener("click", () => operatorRules(e));
    })

    dot.addEventListener("click", () => addDecimal());
}
handleClick();

function handleKeyboard(){ //using keyboard
    document.addEventListener('keydown', ()=>{
        if(event.key>=0 && event.key<=9) //numbers
            appendNumberBot(event.key);
        if(event.key == "+" || event.key == "-" || event.key == "/" ||event.key == "*" || event.key == "Enter") //operators
        {
            operatorRules(event.key);
        }
        if(event.key == ".")
        {
            addDecimal();
        }

    })
}
handleKeyboard();

function operatorRules(e){
    if(sign == ""){ //inputting num1 and sign
        if(e.innerText == "=" || e == "Enter")
            return null;
        sign = e.innerText;
        if(sign == undefined) //if keyboard is used
            sign = e;
        appendNumberBot(sign);
    }
    else if(e.innerText == "=" || e == "Enter"){ //when user presses equal
        const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
        if(numbers[1]=='') //cannot press equal if both numbers not inputted
            return null;
        equate(sign,numbers[0], numbers[1]);
        sign = "";
    }
    else{ //inputting multiple signs instead of equal continues the equation
        const numbers = botDisplay.innerHTML.split(/[*]|[+]|[-]|[\/]/);
        console.log(numbers);
        if(numbers[1]=='') //cannot input multiple signs e.g 25++
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
        return null;
    }
    if(!numbers[1].includes("."))
    {
        appendNumberBot(".");
        return null;
    }
}

function roundThreeDP(num){ //keep it to 3dp
    var number = Math.round(num *1000)/1000
    return number;
}

function equate(sign,num1,num2){ //work the top display
    topDisplay.innerHTML = botDisplay.innerHTML;
    topDisplay.innerHTML += "=";
    botDisplay.innerHTML = roundThreeDP(operation(sign,num1,num2));
}

function operation(sign,num1,num2){
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
                return null;
            else
                return num1/num2;
            break;  
        default:
            return null; 
    }
}

