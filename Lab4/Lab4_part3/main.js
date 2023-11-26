// Set up canvas
const canvas = document.querySelector('canvas'); // Selecting the canvas element
const ctx = canvas.getContext('2d'); // Getting 2D rendering context

const width = canvas.width = window.innerWidth; // Setting canvas width to the window width
const height = canvas.height = window.innerHeight; // Setting canvas height to the window height

// Function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class definition
class Ball {
   constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
   }

   // Method to draw the ball
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   // Method to update the ball's position
   update() {
      // Bounce off the canvas edges
      if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
         this.velX = -this.velX;
      }

      if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
         this.velY = -this.velY;
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   // Method to detect collisions between balls
   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If collision occurs, change the colors of colliding balls
            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }
}

const balls = [];

// Create an array of 25 balls with random properties
while (balls.length < 25) {
   const size = random(10,20);
   const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
}

// Animation loop
function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   // Update, draw, and check collisions for each ball in the array
   for (const ball of balls) {
     ball.draw();
     ball.update();
     ball.collisionDetect();
   }

   // Request the next animation frame
   requestAnimationFrame(loop);
}

// Start the animation loop
loop();
