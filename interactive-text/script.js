const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// Handle mouse movement
const mouse = {
    x: null,
    y: null,
    radius: 50
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log('X: ' + mouse.x, 'Y: ' + mouse.y);
})

// Format the text
ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('A', 0, 40);

const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirecctionX = dx / distance;
        let forceDirecctionY = dy / distance;
        let maxDistance = mouse.radius;
        // Calculate the speed a particle should move based on its distance from the cursor
        // Force is a number between 0 and 1, multiply a particle's speed by this to slow it
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirecctionX * force * this.density;
        let directionY = forceDirecctionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else { // Return the particle to its base position
            if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 40;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 40;
            }
        }
    }
}

function init() {
    particleArray = [];
    // Loop through each row of pixel data, then each pixel in that row
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            // Check that a pixel's 'alpha' value is above 50% opacity (128)
            // Checks the 4th element in each pixel's rgba properties
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 10) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
    // Random distribution of particles
    //for (let i = 0; i < 800; i++) {
    //    let x = Math.random() * canvas.width;
    //    let y = Math.random() * canvas.height;
    //    particleArray.push(new Particle(x, y));
    //}
}
init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();