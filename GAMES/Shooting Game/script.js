const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 600;

// Load spaceship image
const shipImg = new Image();
shipImg.src = "images/spaceship.png"; // Ensure 'images/' folder contains spaceship.png

// Spaceship properties
const ship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 60,
    speed: 5
};

// Bullet array
let bullets = [];
// Enemy array
let enemies = [];
let score = 0;
let gameRunning = true;

// Move spaceship with arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && ship.x > 0) {
        ship.x -= ship.speed * 2;
    } else if (event.key === "ArrowRight" && ship.x + ship.width < canvas.width) {
        ship.x += ship.speed * 2;
    } else if (event.key === " ") {
        bullets.push({ x: ship.x + ship.width / 2 - 3, y: ship.y, width: 6, height: 10, speed: 5 });
    }
});

// Create enemies
function createEnemy() {
    let enemyX = Math.random() * (canvas.width - 40);
    enemies.push({ x: enemyX, y: 0, width: 40, height: 40, speed: 2 });
}

// Update bullets and enemies
function updateObjects() {
    // Move bullets
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;

        // Remove bullets that go out of screen
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }

    // Move enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemies[i].speed;

        // Check collision with bullets
        for (let j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].x + bullets[j].width > enemies[i].x &&
                bullets[j].y < enemies[i].y + enemies[i].height &&
                bullets[j].y + bullets[j].height > enemies[i].y
            ) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score++;
                break;
            }
        }

        // Check if enemy reaches the bottom
        if (enemies[i]?.y > canvas.height) {
            gameRunning = false;
            alert("Game Over! Your Score: " + score);
            document.location.reload();
        }
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw spaceship
    ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // Draw bullets
    ctx.fillStyle = "yellow";
    for (let bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw enemies
    ctx.fillStyle = "red";
    for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        draw();
        updateObjects();

        // Add enemies randomly
        if (Math.random() < 0.02) createEnemy();

        requestAnimationFrame(gameLoop);
    }
}

// Start the game
gameLoop();
