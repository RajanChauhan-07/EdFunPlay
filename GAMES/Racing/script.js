const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400; 
canvas.height = 600;

let gameOver = false;
let score = 0;

// Load car images
const carImg = new Image();
carImg.src = "car.png";

const roadImg = new Image();
roadImg.src = "road.png"; // Optional background image

// Car properties
let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 100,
    speed: 5
};

// Obstacles
let obstacles = [];
let obstacleSpeed = 3;

// Controls
let keys = {};

// Listen for key events
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// Game loop
function updateGame() {
    if (gameOver) {
        alert("Game Over! Score: " + score);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw road background (optional)
    if (roadImg.complete) {
        ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    }

    // Move car
    if (keys["ArrowLeft"] && car.x > 0) car.x -= car.speed;
    if (keys["ArrowRight"] && car.x < canvas.width - car.width) car.x += car.speed;

    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);

    // Generate obstacles
    if (Math.random() < 0.02) {
        let obsX = Math.random() * (canvas.width - 50);
        obstacles.push({ x: obsX, y: 0, width: 50, height: 100 });
    }

    // Move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.y += obstacleSpeed;

        ctx.fillStyle = "red";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Check collision
        if (
            car.x < obs.x + obs.width &&
            car.x + car.width > obs.x &&
            car.y < obs.y + obs.height &&
            car.y + car.height > obs.y
        ) {
            gameOver = true;
        }
    }

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obs => obs.y < canvas.height);

    // Increase score and speed over time
    score++;
    document.getElementById("score").textContent = "Score: " + score;
    if (score % 500 === 0) obstacleSpeed += 0.5;

    requestAnimationFrame(updateGame);
}

carImg.onload = () => {
    updateGame();
};
