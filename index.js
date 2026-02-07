const LIMIT = 100;
const CURRENCY = 'RUB';
const STATUS_IN_LIMIT = 'All is GOOD';
const STATUS_OUT_LIMIT = 'All is BAD';
const STATUS_OUT_LIMIT_OF_NAME = 'status_red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = []

init(expenses);

inputNode.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        buttonNode.click();
    }
});

buttonNode.addEventListener('click', function(){
    
    const expense = getExpanseFromUser();

    if (!expense) {
        return;
    }
    
    trackExpanse(expense);

    render(expenses);
    
});

function init(expenses){
    limitNode.innerText = `${LIMIT} ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
};

function trackExpanse(expense){
    expenses.push(expense);
};

function getExpanseFromUser(){
    if (inputNode.value === ''){
        return null;
    }
    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
};

function clearInput(){
    inputNode.value = '';
};

function calculateExpanses(expenses){
    let sum = 0;
    expenses.forEach(element => {
        sum += element;
    });
    return sum;
};

function render(expenses){
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);

}

function renderHistory(expenses){
    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
};

function renderSum(sum){
    sumNode.innerText = sum; 
};

function renderStatus(sum){

    if (sum > LIMIT) {
        statusNode.innerText = STATUS_OUT_LIMIT;
        statusNode.className = "stats_statusText_negative";
        // statusNode.classList.add(STATUS_OUT_LIMIT_OF_NAME);
    } else {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats_statusText_positive";
        // statusNode.classList.remove(STATUS_OUT_LIMIT_OF_NAME);
    }
};