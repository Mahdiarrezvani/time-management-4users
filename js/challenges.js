import { dataBase } from "../database/dataBaseChallenges.js";
import { backHomePage } from "./mixins.js";
backHomePage();
// ! متغیر ها
let typeChallenge = 'code';
let numberChallenge = 0;
let arrayChallenge = dataBase[typeChallenge][numberChallenge];
let numberChallengeElems;
let subject = document.querySelector('.subject');
subject.innerHTML = typeChallenge;
// 
let sectionBtnNumber = document.querySelector('.section-btn-number');
function createBtn() {
    sectionBtnNumber.innerHTML = "";
    let number = 1;
    let lengthArray = dataBase[typeChallenge];
    lengthArray.forEach(function () {
        sectionBtnNumber.insertAdjacentHTML('beforeend', `<p class="number-challenge">${number}</p>`);
        number++;;
    });
    let numberChallenge1 = document.querySelectorAll('.number-challenge')
    numberChallenge1[0].classList.add('active-number');
    // 
    numberChallengeElems = document.querySelectorAll('.number-challenge');
}
createBtn();
// for number
function bgColorBtns() {
    let activeBtn = document.querySelector('.active-number');
    activeBtn.classList.remove('active-number');
}
function removeClassActive() {
    let activeBtn = document.querySelector('.active');
    activeBtn.classList.remove('active');
}
// 
let challengeBtn = document.querySelectorAll('.btn-challenge');
function createBtnChallnge() {
    challengeBtn.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            removeClassActive();
            e.target.classList.add('active');
            typeChallenge = e.target.attributes.type.nodeValue;
            subject.innerHTML = typeChallenge;
            arrayChallenge = dataBase[typeChallenge][0]
            createBtn();
            infoChallenFunc();
            sumNumbersChallenge();
            createNumberBtn();
        });
    })
}
function createNumberBtn() {
    numberChallengeElems.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            bgColorBtns();
            e.target.classList.add('active-number');
            numberChallenge = e.target.innerHTML - 1;
            arrayChallenge = dataBase[typeChallenge][numberChallenge];
            infoChallenFunc();
            sumNumbersChallenge();
        });
    })
}
// ! Functions
let infoChallengeElem = document.querySelector('.info-challenge');
function infoChallenFunc() {
    infoChallengeElem.innerHTML = '';
    let infoChallenge = arrayChallenge.infoChallenge;
    infoChallengeElem.insertAdjacentHTML('beforeend', `
        <p>start : <span class="value">${infoChallenge.start}</span></p>
        <p>end : <span class="value">${infoChallenge.end}</span></p>
        <p>period : <span class="value">${infoChallenge.period} day</span></p>
        <p>target : <span class="value">${infoChallenge.target}</span></p>`);
}
// let stateChallengeElem = document.querySelector('.state-challenge');
// function createSectionInfo() {
//     let andis = 0;
//     let day = 0;
//     for (let a = 0; a < 2; a++) {
//         day++;
//         stateChallengeElem.insertAdjacentHTML('beforeend', `
//         <tr>
//             <td>${arrayChallenge.mahdiar.arrayChallengeProcess[andis]}</td>
//             <td>${arrayChallenge.amin.arrayChallengeProcess[andis]}</td>
//             <td>${arrayChallenge.abbas.arrayChallengeProcess[andis]}</td>
//             <td>${day}</td>
//         </tr>`);
//         andis++;
//     }
// }
// createSectionInfo();
// todo اسم
function sumNumbersChallenge() {
    checkIsEndChallenge();
    fewDayFail();
    let lengthArray = arrayChallenge.mahdiar.arrayChallengeProcess;
    let andis = 0;
    let mahdiar = 0;
    let amin = 0;
    let abbas = 0;
    // let amirAbbas = 0;
    let amirMahdi = 0;
    for (let a = 0; a < lengthArray.length; a++) {
        // todo اسم
        mahdiar = mahdiar + +arrayChallenge.mahdiar.arrayChallengeProcess[andis];
        amin = amin + +arrayChallenge.amin.arrayChallengeProcess[andis];
        abbas = abbas + +arrayChallenge.abbas.arrayChallengeProcess[andis];
        amirMahdi = amirMahdi + +arrayChallenge.mahdi.arrayChallengeProcess[andis];
        andis++;
    }
    arrayChallenge.mahdiar.result = mahdiar;
    arrayChallenge.amin.result = amin;
    arrayChallenge.abbas.result = abbas;
    arrayChallenge.mahdi.result = amirMahdi;
    checkIsSucssesfullChallenge(mahdiar, amin, abbas, amirMahdi)
}
function checkIsSucssesfullChallenge(mahdiar, amin, abbas, amirMahdi) {
    let target = arrayChallenge.infoChallenge.target;
    if (mahdiar >= target) {
        arrayChallenge.mahdiar.state = '👍';
    }
    if (amin >= target) {
        arrayChallenge.amin.state = '👍';
    }
    if (abbas >= target) {
        arrayChallenge.abbas.state = '👍';
    }
    if (amirMahdi >= target) {
        arrayChallenge.mahdi.state = '👍';
    }
    createResult();
}
let stateChallengeElem = document.querySelector('.state-challenge');
let persons = ["mahdiar", 'amin', 'abbas', "mahdi"];
function createResult() {
    stateChallengeElem.innerHTML = "";
    for (let a = 0; a < persons.length; a++) {
        stateChallengeElem.insertAdjacentHTML('beforeend', `
        <div>
            <p class="name-person">${arrayChallenge[persons[a]].name}</p>
            <p>state : <span>${arrayChallenge[persons[a]].state}</span></p>
            <p>result : ${arrayChallenge[persons[a]].result}</p>
        </div>`);
    }
}
function fewDayFail() {
    let fewDayFailElem = document.querySelector('.few-day-fail');
    let period = arrayChallenge.infoChallenge.period;
    let lastFewDays = arrayChallenge.mahdiar.arrayChallengeProcess.length;
    if (period - lastFewDays == 0) {
        fewDayFailElem.innerHTML = "finish";
    } else {
        fewDayFailElem.innerHTML = period - lastFewDays + " days until the end";
    }
}
function checkIsEndChallenge() {
    let isFinishChallenge = document.querySelector('.is-finish-challenge');
    if (arrayChallenge.infoChallenge.period <= arrayChallenge.mahdiar.arrayChallengeProcess.length) {
        isFinishChallenge.innerHTML = 'end of the challenge';
        isFinishChallenge.style.backgroundColor = "#830000";
        isFinishChallenge.style.color = "white";
    } else {
        isFinishChallenge.innerHTML = 'doing the challenge'
        isFinishChallenge.style.backgroundColor = "#eeff00";
        isFinishChallenge.style.color = "black";
    }
}
createBtnChallnge();
createNumberBtn();
infoChallenFunc();
sumNumbersChallenge();