import * as LimitModal from './modal.js';

// Variables - string constant
const CURRENCY = 'RUB';
const STATUS_IN_LIMIT = 'All is GOOD';
const STATUS_OUT_LIMIT = 'All is BAD';
const STORAGE_LABEL_LIMIT = "limit";
const STORAGE_LABEL_EXPENSES = "expenses";

// Variables - references for the html elements
const inputNode = document.querySelector('.js-expense-input');
const addButtonNode = document.querySelector('.js-expense-button');
const clearButtonNode = document.querySelector('.js-clear-button');
const changeLimitButtonNode = document.querySelector('.js-button-change-limit');
const historyNode = document.querySelector('.js-history-list');
const historyListNode = document.querySelector('.history-list');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categorySelectNode = document.querySelector('.js-category-select');

// get limit from element HTML
const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = expensesFromStorageString
  ? JSON.parse(expensesFromStorageString)
  : null;

let expenses = [] //change const on let

const defaultLimit = parseInt(limitNode.innerText);
let LIMIT = defaultLimit;
if (Array.isArray(expensesFromStorage)){
   expenses = expensesFromStorage;
}

function getTotal(){
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });
    return sum;
};


function init(){
    sumNode.innerText = getTotal();

    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT), 10);
    if (Number.isNaN(limitFromStorage)) {
    limitNode.innerText = defaultLimit;
    LIMIT = defaultLimit;
    return;
    }
    limitNode.innerText = limitFromStorage;
    LIMIT = limitFromStorage;

};

init();
render();


// Arrow function - reset input value
const clearInput = () => {
    inputNode.value = "";
}

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

function addButtonHandler(){

    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        alert("Please write sum");
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
    saveExpensesToStorage();

    //render interface
    render();

    //reset input value
    clearInput();
}

function getExpenseFromUser(){
    return parseInt(inputNode.value);
};

//get user his selected category
function getSelectedCategory(){
    return categorySelectNode.value;
};


function renderStatus(){
// debugger
    const total = getTotal();
    sumNode.innerText = total; 
// debugger
    if (total > LIMIT) {
        statusNode.innerText = STATUS_OUT_LIMIT;
        statusNode.classList.remove('stats_statusText_positive');
        statusNode.classList.add('stats_statusText_negative');
        //   statusNode.className = "stats_statusText_negative";
    } else {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove('stats_statusText_negative');
        statusNode.classList.add('stats_statusText_positive');
        //   statusNode.className = "stats_statusText_positive";
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

function render(){
    renderStatus();
    renderHistory();
}

const clearButtonHandler = () => {
    localStorage.removeItem(STORAGE_LABEL_LIMIT);
    localStorage.removeItem(STORAGE_LABEL_EXPENSES);
    expenses = [];

    init();
    render();
}

function changeLimitHandler(){

    LimitModal.openLimitModal(LIMIT);

    // const newLimit = prompt("New limit");
    // const newLimitValue = parseInt(newLimit);

    // if (!newLimitValue){
    //     return;
    // }

    // limitNode.innerText = newLimitValue;

    // LIMIT = newLimitValue;
    // localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);

    // render();
}

LimitModal.onLimitSave((newLimitValue, inputEl) => {
    if (Number.isNaN(newLimitValue) || newLimitValue <= 0) {
        alert('Please enter a valid limit');
        return;
    }

    limitNode.innerText = newLimitValue;
    LIMIT = newLimitValue;
    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);

    render();
    inputEl.value = '';
    LimitModal.closeLimitModal();
});



// binding handler functions to a buttons
addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);
changeLimitButtonNode.addEventListener('click', changeLimitHandler);

inputNode.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addButtonHandler();
    }
});