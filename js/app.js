import { dataBase } from './dataBase.js';
let usefulTimeElem = document.querySelector('.useful');
let subjects = ['code', 'learn', 'english', 'study', 'wasted'];
let firstOneContainer = document.querySelector('.first-one-container');
let lastOneContainer = document.querySelector('.last-one-container');
let sumMahdiar, sumAmin, sumAbbas, sumAmirMahdi;
//! storage
function storage(subject) {
    sumMahdiar = 0;
    sumAmin = 0;
    sumAbbas = 0;
    sumAmirMahdi = 0;
    let information = [
        { id: 0, name: 'mahdiar', storage: 0 },
        { id: 1, name: 'amin', storage: 0 },
        { id: 2, name: 'amir abbas', storage: 0 },
        { id: 3, name: 'amir mahdi', storage: 0 },
    ];
    information.forEach(function (info) {
        dataBase[info.id].forEach(function (e) {
            info.storage = info.storage + +e[subject];
        });
    });
    return [
        sumMahdiar = information[0].storage,
        sumAmin = information[1].storage,
        sumAbbas = information[2].storage,
        sumAmirMahdi = information[3].storage,
    ];
}
//! Firs One
function firstOne(subject) {
    let number = null;
    storage(subject);
    if (subject == 'wasted') {
        number = Math.min(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    } else {
        number = Math.max(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    }
    let firstPerson = findPerson(number);
    firstOneContainer.insertAdjacentHTML('beforeend', `
    <p>${subject} : <span>${firstPerson}</span></p>`);
}
//! Last One
function lastOne(subject) {
    storage(subject);
    let number = null;
    if (subject == 'wasted') {
        number = Math.max(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    } else {
        number = Math.min(sumAbbas, sumAmin, sumMahdiar, sumAmirMahdi);
    }
    let lastPerson = findPerson(number);
    lastOneContainer.insertAdjacentHTML('beforeend', `
    <p>${subject} : <span>${lastPerson}</span></p>`);
}

//! Find Person
// ????????????????????????????????????????????? last
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
// ????????????????????????????????????????????? last
//! Create Section First AND Last
subjects.forEach(function (subject) {
    firstOne(subject);
    lastOne(subject);
});
//! Sum Useful Time
function workMofid() {
    let subjectsMofid = ['code', 'learn', 'english', 'study'];
    // let sumMahdiar, sumAmin, sumAbbas;
    let information = [
        { id: 0, name: 'mahdiar', storage: 0 },
        { id: 1, name: 'amin', storage: 0 },
        { id: 2, name: 'amir abbas', storage: 0 },
        { id: 3, name: 'amir mahdi', storage: 0 },
    ];
    information.forEach(function (info) {
        dataBase[info.id].forEach(function (e) {
            subjectsMofid.forEach(function (subject) {
                info.storage = info.storage + +e[subject];
            });
        });
        // switch (info.id) {
        //     case 0:
        //         sumMahdiar = info.storage;
        //         break;
        //     case 1:
        //         sumAmin = info.storage;
        //         break;
        //     case 2:
        //         sumAbbas = info.storage;
        //         break;
        // }
    });
    usefulTimeElem.innerHTML = `
    <p>mahdiar: <span>${information[0].storage}</span></p>
    <p>amin: <span>${information[1].storage}</span></p>
    <p>amir abbas: <span>${information[2].storage}</span></p>
    <p>amir mahdi: <span>${information[1].storage}</span></p>`;
    average(information[0].storage, information[1].storage, information[2].storage, information[3].storage);
    // average(sumMahdiar, sumAmin, sumAbbas)
}
// average
// صدا زده شده workMofid داخل
//! میانگین کار های انجام شده و مفید بوده
function average(sumMahdiar, sumAmin, sumAbbas) {
    let numberDays = dataBase[0].length;
    let averageElem = document.querySelector('.average');
    let mahdiar = Math.floor(sumMahdiar / numberDays);
    let amin = Math.floor(sumAmin / numberDays);
    let amirAbbas = Math.floor(sumAbbas / numberDays);
    let amirMahdi = Math.floor(sumAmirMahdi / numberDays);
    averageElem.innerHTML = `
    <p>mahdiar: <span>${mahdiar}</span></p>
    <p>amin: <span>${amin}</span></p>
    <p>amir abbas: <span>${amirAbbas}</span></p>
    <p>amir mahdi: <span>${amirMahdi}</span></p>`;
}
workMofid();
// ! Last Update
(function () {
    let lastUpdateElem = document.querySelector('.last-update');
    let number = dataBase[0].length - 1;
    let date = dataBase[0][number].date
    let day = dataBase[0][number].day
    lastUpdateElem.innerHTML = `<span>${date}</span> <span>${day}</span>`;
})();