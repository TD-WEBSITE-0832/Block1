const search = document.querySelector(".search");

search.addEventListener("focus", () => {
    search.placeholder = "";
});

search.addEventListener("blur", () => {
    if (search.value === "") {
        search.placeholder = "Mahsulotlarni qidirish";
    }
});

console.log("Hello Teacher")


