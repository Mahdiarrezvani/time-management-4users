import { dataBase } from './dataBase.js';
import { backHomePage } from './mixins.js';
backHomePage();
let currentPage = 1;
let numberShow = 30;
let table = document.querySelector('.table');
let andis = 0;
let numberOfMonth = Math.ceil(dataBase[andis].length / numberShow);
let btnPerson = document.querySelectorAll('.btn-person');
//! Event Click Btn
(function () {
    btnPerson.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            andis = e.target.attributes.andis.nodeValue;
            activeFun();
            e.target.classList.add('active');
            createPages(currentPage);
        });
    });
})();

function createPages(page) {
    table.innerHTML = "";
    let newDataBase = [...dataBase[andis]];
    let end = numberShow * page;
    let start = end - numberShow;
    let pages = newDataBase.slice(start, end);
    pages.forEach(function (info) {
        table.insertAdjacentHTML('beforeend', `
    <div class="container-table">
        <div class="user-info">
            <p class="details"><span>${info.date}</span><span>${info.day}<span/></p>
            <p>code: ${info.code} min</p>
            <p>learn: ${info.learn} min</p>
            <p>english: ${info.english} min</p>
            <p>study: ${info.study} min</p>
            <p>wasted time: ${info.wasted} min</p>
        </div>
    </div>`);
    });
}

let btnContainer = document.querySelector('.btn-container');
function createBtnPage() {
    for (let number = 1; number < numberOfMonth + 1; number++) {
        btnContainer.insertAdjacentHTML('beforeend', `<button class="btn-page">${number}</button>`);
    }
}

function eventBtns() {
    let btnPage = document.querySelectorAll('.btn-page');
    btnPage.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            table.innerHTML = '';
            let page = e.target.innerHTML;
            createPages(page);
        });
    });
}

function activeFun() {
    let active = document.querySelector('.active');
    active.classList.remove('active');
}
createPages(currentPage);
createBtnPage();
eventBtns();