class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.previousOperand = this.currentOperand;
        this.updateDisplay();
        // 
        document.querySelector(".current-operand").scrollTop = document.querySelector(".current-operand").getClientRects()[0].bottom;
        document.querySelector(".previous-operand").scrollTop = document.querySelector(".previous-operand").getClientRects()[0].bottom;
    }

    appendOperation(operation) {
        if (this.currentOperand === '') return;
        this.currentOperand += operation;
        this.previousOperand = this.currentOperand;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }

    sin() {
        const result = Math.sin(this.getCurrentNumberValue() * Math.PI / 180);
        this.setResult(result);
    }

    cos() {
        const result = Math.cos(this.getCurrentNumberValue() * Math.PI / 180);
        this.setResult(result);
    }

    tan() {
        const result = Math.tan(this.getCurrentNumberValue() * Math.PI / 180);
        this.setResult(result);
    }

    sqrt() {
        const result = Math.sqrt(this.getCurrentNumberValue());
        this.setResult(result);
    }

    square() {
        const result = Math.pow(this.getCurrentNumberValue(), 2);
        this.setResult(result);
    }

    cube() {
        const result = Math.pow(this.getCurrentNumberValue(), 3);
        this.setResult(result);
    }

    reciprocal() {
        const result = 1 / this.getCurrentNumberValue();
        this.setResult(result);
    }

    pi() {
        this.currentOperand = Math.PI.toString();
        this.updateDisplay();
    }

    getCurrentNumberValue() {
        return parseFloat(this.currentOperand) || 0;
    }

    setResult(result) {
        this.previousOperand = this.currentOperand;
        this.currentOperand = result.toString();
        this.updateDisplay();
    }

    compute() {
        try {
            let computation = this.currentOperand
                .replace('×', '*')
                .replace('÷', '/');
            const result = eval(computation);
            this.previousOperand = this.currentOperand;
            this.currentOperand = result.toString();
            this.updateDisplay();
        } catch (e) {
            this.currentOperand = 'Error';
            this.updateDisplay();
        }
    }
}

const calculator = new Calculator();
