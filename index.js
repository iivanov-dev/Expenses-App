// Variables - string constant
const CURRENCY = 'RUB';
const STATUS_IN_LIMIT = 'All is GOOD';
const STATUS_OUT_LIMIT = 'All is BAD';

// Variables - references for the html elements
const inputNode = document.querySelector('.js-expense-input');
const addButtonNode = document.querySelector('.js-expense-button');
const clearButtonNode = document.querySelector('.js-clear-button ');
const changeLimitButtonNode = document.querySelector('.js-button-change-limit');
const historyNode = document.querySelector('.js-history-list');
const historyListNode = document.querySelector('.history-list');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categorySelectNode = document.querySelector('.js-category-select');


let expenses = [] //change const on let
let LIMIT = parseInt(limitNode.innerText);

function getTotal(){
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });
    return sum;
};

function init(expenses){
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = getTotal();
};

init(expenses);

// Arrow function - reset input value
const clearInput = () => {
    inputNode.value = "";
}

function addButtonHandler(){

    const currentAmount = getExpanseFromUser();
    if (!currentAmount) {
        return;
    } 

    const currentCategory = getSelectedCategory();
    if (currentCategory === "Choose the category") {
        alert("Please choose the Category");
        return;
    } 

    const newExpense = {
        amount: currentAmount,
        category: currentCategory
    };
 
    //add element in array
    expenses.push(newExpense);

    //render interface
    render();

    //reset input value
    clearInput();
}

function getExpanseFromUser(){
    return parseInt(inputNode.value);
};

//get user his selected category
function getSelectedCategory(){
    return categorySelectNode.value;
};


function renderStatus(){

    const total = getTotal();
    sumNode.innerText = total; 

    if (total > LIMIT) {
        statusNode.innerText = STATUS_OUT_LIMIT;
        statusNode.className = "stats_statusText_negative";
        // statusNode.classList.add(STATUS_OUT_LIMIT_OF_NAME);
    } else {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats_statusText_positive";
        // statusNode.classList.remove(STATUS_OUT_LIMIT_OF_NAME);
    }
};

function renderHistory(){
    historyListNode.innerHTML = "";
    expenses.forEach(expense =>{
        const historyItem = document.createElement("li");
        historyItem.className = "rub";
        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        historyListNode.appendChild(historyItem);
    });
};

function render(expenses){
    renderStatus();
    renderHistory();
}

const clearButtonHandler = () => {
    expenses = [];
    render();
}

function changeLimitHandler(){
    const newLimit = prompt("New limit");
    const newLimitValue = parseInt(newLimit);

    if (!newLimitValue){
        return;
    }

    limitNode.innerText = newLimitValue;

    LIMIT = newLimitValue;

    render();
}



// binding handler functions to a buttons
addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);
changeLimitButtonNode.addEventListener('click', changeLimitHandler);

inputNode.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addButtonHandler();
    }
});