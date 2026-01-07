document.addEventListener("DOMContentLoaded", () => {

    const goMarket = document.querySelector(".div15");
    const goSecond = document.querySelector(".div14");

    if (goMarket) {
        goMarket.addEventListener("click", () => {
            window.location.href = "ts.html";
        });
    }

    if (goSecond) {
        goSecond.addEventListener("click", () => {
            window.location.href = "ts1.html";
        });
    }

});
 