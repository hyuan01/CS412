
const evaluate = exp => {
    const [left, right] = helper(exp);
    operand = exp.slice(1,2);
    switch(operand) {
        case '*':
            return left*right;
        case '/':
            return left/right;
        case '+':
            return left+right;
        case '-':
            return left-right;
        case '%':
            return left%right;
        case '^':
            return left**right;
    }
};

const helper = exp => [parseInt(exp.slice(0,1)),parseInt(exp.slice(2,3))];

const exp1 = '8%3';
let op1 = evaluate(exp1);
console.log(`${exp1} = ${op1}`);

const exp2 = '4+2';
let op2 = evaluate(exp2);
console.log(`${exp2} = ${op2}`);

const exp3 = '5*7';
let op3 = evaluate(exp3);
console.log(`${exp3} = ${op3}`);

const exp4 = '6-3';
let op4 = evaluate(exp4);
console.log(`${exp4} = ${op4}`);

const exp5 = '9/2';
let op5 = evaluate(exp5);
console.log(`${exp5} = ${op5}`);

const exp6 = '2^8';
let op6 = evaluate(exp6);
console.log(`${exp6} = ${op6}`);