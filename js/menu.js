// Button Menu
let menu = document.querySelector('.menu');
let btnOpenMenu = document.querySelector('.btn-open-menu');
let closeMenuBtn = document.querySelector('.close-menu-btn');
btnOpenMenu.addEventListener('click', function () {
    menu.classList.remove('closeMenu');
    menu.classList.add('openMenu');
});
closeMenuBtn.addEventListener('click', function () {
    menu.classList.remove('openMenu');
    menu.classList.add('closeMenu');
});