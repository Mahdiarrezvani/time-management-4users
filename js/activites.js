import { dataBase } from './dataBase.js'
import { backHomePage } from './mixins.js'
backHomePage();

// let activitesContainer = document.querySelector('.activites');
// let activiteArray = ["learn", "language", "study", "wasted"];
// function createBtnActiviteEleme() {
//     activiteArray.forEach(function (value) {
//         activitesContainer.insertAdjacentHTML('beforeend', `
//         <p class="btn-activite" name="${value}">${value}</p>`);
//     });
// }
// createBtnActiviteEleme();
let resultMahdiar = document.querySelector('.mahdiar');
let resultAbbas = document.querySelector('.abbas');
let resultAmin = document.querySelector('.amin');
let resultAmirMahdi = document.querySelector('.amir-mahdi');
let subjectElem = document.querySelector('.subject');
let btnFirst = document.querySelectorAll('.btn-activite');
let fewDay = document.querySelector('.few-day');
let subject = "code";
fewDay.innerHTML = "in " + dataBase[0].length + " day";
// 

btnFirst.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        activeFun();
        e.target.classList.add('active');
        subject = e.target.attributes.name.nodeValue;
        sectionShowResult();
        firstPersonFind()
        lastPersonFind()
        firstOneForWastedTime();
    });
});

function activeFun() {
    let activeBtn = document.querySelector('.active');
    activeBtn.classList.remove('active')
}

// !!!! این کد برای اینه که اگه چیزی اضافه کردی از همون روز محسبه کنه
//  ? متنیه که میزنه در چند روز یا in 30 day
// function learnSubject() {
//     switch (subject) {
//         case 'learn':
//             fewDay.innerHTML = "in " + (dataBase[0].length - 30) + " day";
//             break;
//         default:
//             fewDay.innerHTML = "in " + dataBase[0].length + " day";
//             break;
//     }
// }
let sumMahdiar, sumAmin, sumAbbas, sumAmirMahdi;
// محاسبه جمع موضوع مورد نظر
function sectionShowResult() {
    subjectElem.innerHTML = subject;
    let information = [
        { id: 0, name: 'mahdiar', storage: 0, elem: resultMahdiar },
        { id: 1, name: 'amin', storage: 0, elem: resultAmin },
        { id: 2, name: 'amir abbas', storage: 0, elem: resultAbbas },
        { id: 3, name: 'amir mahdi', storage: 0, elem: resultAmirMahdi },
    ];


    information.forEach(function (info) {
        info.storage = 0;
        dataBase[info.id].forEach(function (e) {
            info.storage = info.storage + +e[subject];
        });
        info.elem.innerHTML = `<div><p class="name-person">${info.name}</p> <p class="section-time">time: ${info.storage} min</p></div>${averageFunc(info.storage)}`;
    });

    sumMahdiar = information[0].storage;
    sumAmin = information[1].storage;
    sumAbbas = information[2].storage;
    sumAmirMahdi = information[3].storage;
}

let firstPerson = null;
function firstPersonFind() {
    let bigger = Math.max(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    firstPerson = findPerson(bigger);
}

let lastPerson = null;
function lastPersonFind() {
    let smaller = Math.min(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    lastPerson = findPerson(smaller);
}

// For Wasted Time
// show last AND first person
function firstOneForWastedTime() {
    let firstOne = document.querySelector('.first-one');
    let lastOne = document.querySelector('.last-one');
    if (subject == "wasted") {
        firstOne.innerHTML = `<span>first one</span> <span class="name-first">${lastPerson}</span>`;
        lastOne.innerHTML = `<span>last one</span> <span class="name-last">${firstPerson}</span>`;
    }
    else {
        lastOne.innerHTML = `<span>last one</span> <span class="name-last">${lastPerson}</span>`;
        firstOne.innerHTML = `<span>first one</span> <span class="name-first">${firstPerson}</span>`;
    }
}

// !!!!!!!!!!!
function averageFunc(person) {
    let averageNumber = null;
    averageNumber = Math.ceil(person / dataBase[0].length);
    return `<div>per one day : ${averageNumber}</div>`;
}
// ! برای گرفتن میانگینیه که جدید اضافه میشه و از همون لحظه میانگین میگیره
// function average(person) {
//     let average = null;
//     switch (subject) {
//         case 'learn':
//             average = Math.ceil(person / (dataBase[0].length - 30));
//             break;
//         default:
//             average = Math.ceil(person / dataBase[0].length);
//             break;
//     }
//     return `<div>in day : ${average}</div>`;
// }
function findPerson(number) {
    let person = null;
    switch (number) {
        case sumMahdiar:
            person = "mahdiar";
            break;
        case sumAmin:
            person = "amin";
            break;
        case sumAbbas:
            person = "amir abbas";
            break;
        case sumAmirMahdi:
            person = "amir mahdi";
            break;
    }
    return person;
}
sectionShowResult();
firstPersonFind()
lastPersonFind()
firstOneForWastedTime();