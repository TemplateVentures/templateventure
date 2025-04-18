



const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// Mouse tracking
let mouse = { x: null, y: null, radius: 100 };

window.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Load Base64 Image
const png = new Image();
png.src = "data:image/png;base64,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"; // Replace with full valid Base64 string

png.onload = function () {
    ctx.drawImage(png, 0, 0);
    drawImage();
};

function drawImage() {
    let imageWidth = png.width;
    let imageHeight = png.height;

    // Ensure the image is properly drawn before getting data
    ctx.drawImage(png, 0, 0, imageWidth, imageHeight);

    // Get image data
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    class Particle {
        constructor(x, y, color) {
            this.x = x + canvas.width / 2 - imageWidth / 2;
            this.y = y + canvas.height / 2 - imageHeight / 2;
            this.color = color;
            this.size = 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = Math.random() * 10 + 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 5;

            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                this.x -= (this.x - this.baseX) / 5;
                this.y -= (this.y - this.baseY) / 5;
            }
            this.draw();
        }
    }

    function init() {
        particleArray = [];
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x * 4;
                    let positionY = y * 4;
                    let color = `rgb(${data.data[(y * 4 * data.width) + (x * 4)]}, 
                                    ${data.data[(y * 4 * data.width) + (x * 4) + 1]}, 
                                    ${data.data[(y * 4 * data.width) + (x * 4) + 2]})`;
                    particleArray.push(new Particle(positionX, positionY, color));
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }

    init();
    animate();
    window.addEventListener("resize", function () {
        canvas.width = 500; // Keep width fixed
        canvas.height = window.innerHeight; // Adjust only height
        init(); // Reinitialize particles
    });
}


// Set fixed canvas width
canvas.width = 800;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = 500; // Keep width fixed
    canvas.height = window.innerHeight; // Adjust only height
    init(); // Reinitialize particles
});
