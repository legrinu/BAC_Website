
window.onload = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let start;

    const size = {
        width: 138,
        height: 130
    }

    let pos = {
        x: 0,
        y:0
    }
    let vel = {
        x: 100,
        y: 100
    }

    const image = new Image(size.width, size.height);
    image.src = "/assets/image/logo.png";

    let canvas_step = (timestamp) => {
        if (start === undefined)
            start = timestamp;
        const elapsed = (timestamp - start) / 1000;

        if(pos.x <= 0 || pos.x + size.width >= ctx.canvas.width){
            vel.x *= -1;

            if(pos.x <= 0){
                pos.x = 0;
            }else{
                pos.x = ctx.canvas.width - size.width;
            }
        }

        if(pos.y <= 0 || pos.y + size.height >= ctx.canvas.height){
            vel.y *= -1;

            if(pos.y <= 0){
                pos.y = 0;
            }else{
                pos.y = ctx.canvas.height - size.height;
            }
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)

        pos.x += vel.x * elapsed;
        pos.y += vel.y * elapsed;

        ctx.fillStyle = "black";
        ctx.drawImage(image, pos.x, pos.y)

        start = timestamp

        if (elapsed < 2000) { // Stop the animation after 2 seconds
            setTimeout(() => {
                window.requestAnimationFrame(canvas_step);
            }, 10);
            
        }
    }

    window.requestAnimationFrame(canvas_step)

}
