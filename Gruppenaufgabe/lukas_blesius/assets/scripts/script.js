// Inline code is for educational purposes. Best practice is to put your scripts in external files.
// Based on the tutorial at https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API

(window.onload=()=> {
    let canvas_element = document.getElementById("canvas_element");
    let context = canvas_element.getContext("2d");
    for (i = 0; i < 33; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let r = Math.random() * 120 + 30;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.fillStyle = '#2E281F';
        context.fill();
    }

})();