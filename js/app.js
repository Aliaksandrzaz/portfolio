const canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.px;
        this.py;
        this.z = 4 * Math.random();
    }

    update() {
        this.px = this.x;
        this.py = this.y;
        this.z += speed;
        this.x += this.x * (.2 * speed) * this.z;
        this.y += this.y * (.2 * speed) * this.z;
        (this.x > canvas.width / 2 + 50 || this.x < -canvas.width / 2 - 50 || this.y > canvas.height / 2 + 50 || this.y < -canvas.height / 2 - 50) && (this.x = Math.random() * canvas.width - canvas.width / 2,
            this.y = Math.random() * canvas.height - canvas.height / 2, this.px = this.x, this.py = this.y, this.z = 0)
    }

    show() {
        c.lineWidth = this.z;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.px, this.py);
        c.stroke();
    }
}

let speed = .01,
    stars = [];

for (let e = 0; 800 > e; e++) {
    stars.push(new Star)
}
c.fillStyle = "rgba(0, 0, 0, 0.4)";
c.strokeStyle = "rgb(255, 255, 255)";
c.translate(canvas.width / 2, canvas.height / 2);

function draw() {
    requestAnimationFrame(draw);
    c.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    for (let e of stars) {
        e.update();
        e.show();
    }
}

draw();