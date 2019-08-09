class Calculator {
    constructor(prevOperandElem, currOperandElem){
        this.prevOperandElem = prevOperandElem;
        this.currOperandElem = currOperandElem;
        this.prevOperand = prevOperandElem.textContent;
        this.currOperand = currOperandElem.textContent;
        this.operation = undefined
    }

    updateOutputScreen(){
        this.currOperandElem.textContent = this.currOperand;
        this.prevOperandElem.textContent = this.prevOperand
    }

    compute(){
        if(this.currOperand && this.prevOperand){
            let op1 = parseFloat(this.prevOperand.split(" ")[0]);
            let operation = this.prevOperand.split(" ")[1];
            let op2 = parseFloat(this.currOperand);
            let res = null;
            switch(operation){
                case '/':
                    res = op1 / op2;
                    break;
                case 'X':
                    res = op1 * op2;
                    break;
                case '+':
                    res = op1 + op2;
                    break;
                case '-':
                    res = op1 - op2;
                    break;
                case '%':
                    res = op1 % op2;
                    break;
            }
            this.prevOperand = '';
            this.operation = undefined;
            this.currOperand = res.toString();
            this.updateOutputScreen();
        }

    }

    allClear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
        this.updateOutputScreen();
    }

    deleteSingle () {
        if(this.currOperand === '' && this.prevOperand){
            this.currOperand = this.prevOperand.slice(0, this.prevOperand.length-2);
            this.prevOperand = '';
            this.operation = undefined;
            this.updateOutputScreen();
        }else{
            this.currOperand = this.currOperand.slice(0, -1);
            this.updateOutputScreen();
        }
        
        
    }

    setOperation(e){
        if(!this.operation && this.currOperand){
            this.operation = e.target.textContent;
            this.prevOperand = `${this.currOperand} ${e.target.textContent}`;
            this.currOperand = '';
            this.updateOutputScreen();
        }else if(this.prevOperand && this.currOperand) {
            this.compute();
            this.operation = e.target.textContent;
            this.prevOperand = `${this.currOperand} ${e.target.textContent}`;
            this.currOperand = '';
            this.updateOutputScreen();
        }else if(this.currOperand === '' && this.prevOperand){
            this.operation = e.target.textContent;
            this.prevOperand = `${this.prevOperand.slice(0, this.prevOperand.length-1)}${this.operation}`;
            this.updateOutputScreen();
        }
    }

    appendNumber(e){
        if((!this.prevOperand && !this.operation) || (this.prevOperand && this.operation)){
            if((e.target.textContent === '.' && this.currOperandElem.textContent.includes('.')) || (e.target.textContent === '0' && this.currOperand.startsWith('0'))) return
            this.currOperand = this.currOperand + e.target.textContent;
            this.updateOutputScreen();
        }
    }
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const prevOperandElem = document.querySelector(".previous-operand");
const currOperandElem = document.querySelector(".current-operand");
const allClear = document.querySelector(".all-clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");

const calculator = new Calculator(prevOperandElem, currOperandElem);

numbers.forEach(number => {
    number.addEventListener("click", (e) => calculator.appendNumber(e))
});

allClear.addEventListener('click', () => calculator.allClear());

deleteBtn.addEventListener('click', () => calculator.deleteSingle());

operators.forEach(operator => {
    operator.addEventListener('click', (e) => calculator.setOperation(e))
})

equalBtn.addEventListener('click', () => calculator.compute());