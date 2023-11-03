document.addEventListener("DOMContentLoaded", () => {

    const circle = document.getElementById("circle")
    const upbtn = document.getElementById("upbtn")
    const downbtn = document.getElementById("downbtn")

    let rotateValue = circle.style.transform;
    let rotateSum;

    upbtn.addEventListener("click", () => {
        rotateSum = rotateValue + "rotate(-90deg)";
        circle.style.transform = rotateSum;
        rotateValue = rotateSum;
    })

    downbtn.addEventListener("click", () => {
        rotateSum = rotateValue + "rotate(90deg)";
        circle.style.transform = rotateSum;
        rotateValue = rotateSum;
    })

})


