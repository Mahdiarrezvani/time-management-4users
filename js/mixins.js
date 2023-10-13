export function backHomePage() {
    let backHomeBtn = document.querySelector('.back-history')
    backHomeBtn.addEventListener('click', function () {
        history.back();
    });
}