const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

updateCanvasSize();

const playerPlaneImg = document.getElementById('playerPlane');
const enemyPlaneImg = document.getElementById('enemyPlane');
const mountainImg = document.getElementById('mountain');

const gameOverPopup = document.getElementById('gameOverPopup');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const controls = document.getElementById('controls');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');

const mountainHeight = canvas.height * 0.15;

const player = {
    x: 100,
    y: canvas.height / 2 - 25,
    width: canvas.width * 0.1, // scale to width
    height: canvas.height * 0.05, // scale to height
    speed: 2.9
};

const enemies = [];
let enemySpeed = 3;
let spawnInterval = 2000;
let score = 0;
let gameOver = false;

function spawnEnemy() {
    const enemy = {
        x: canvas.width,
        y: Math.random() * (canvas.height - mountainHeight - player.height),
        width: player.width,
        height: player.height
    };
    enemies.push(enemy);
}

function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw mountains
    ctx.drawImage(mountainImg, 0, canvas.height - mountainHeight, canvas.width, mountainHeight);

    // Draw player
    ctx.drawImage(playerPlaneImg, player.x, player.y, player.width, player.height);

    // Move and draw enemies
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.x -= enemySpeed;
        if (enemy.x + enemy.width < 0) {
            enemies.splice(i, 1);
            i--;
            continue;
        }
        ctx.drawImage(enemyPlaneImg, enemy.x, enemy.y, enemy.width, enemy.height);

        if (detectCollision(player, enemy)) {
            gameOver = true;
            showGameOverPopup();
            return;
        }
    }

    // Detect collision with mountains
    if (player.y + player.height > canvas.height - mountainHeight) {
        gameOver = true;
        showGameOverPopup();
        return;
    }

    // Increment score dynamically
    score += 1;

    // Increase difficulty as score progresses
    if (score % 1000 === 0 && score > 0) {
        enemySpeed += 1;
        spawnInterval = Math.max(1000, spawnInterval - 200);
        clearInterval(spawnTimer);
        spawnTimer = setInterval(spawnEnemy, spawnInterval);
    }

    // Draw score
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(updateGame);
}

function showGameOverPopup() {
    finalScore.textContent = `Score: ${score}`;
    gameOverPopup.style.display = 'block';
}

function restartGame() {
    gameOver = false;
    score = 0;
    enemySpeed = 3;
    spawnInterval = 2000;
    enemies.length = 0;
    player.y = canvas.height / 2 - player.height / 2;
    gameOverPopup.style.display = 'none';
    clearInterval(spawnTimer);
    spawnTimer = setInterval(spawnEnemy, spawnInterval);
    updateGame();
}

function setupControls() {
    let isUpPressed = false;
    let isDownPressed = false;

    if (canvas.width < 768) {
        controls.style.display = 'block';

        // Handle up button press and release (mobile touch events)
        upButton.addEventListener('touchstart', () => {
            isUpPressed = true;
        });
        upButton.addEventListener('touchend', () => {
            isUpPressed = false;
        });

        // Handle down button press and release (mobile touch events)
        downButton.addEventListener('touchstart', () => {
            isDownPressed = true;
        });
        downButton.addEventListener('touchend', () => {
            isDownPressed = false;
        });

        // Move the plane as long as the button is pressed
        function movePlane() {
            if (isUpPressed && player.y > 0) {
                player.y -= player.speed; // Slight move up
            }
            if (isDownPressed && player.y < canvas.height - mountainHeight - player.height) {
                player.y += player.speed; // Slight move down
            }
        }

        setInterval(movePlane, 50); // Move the plane every 50 milliseconds when the button is held
    } else {
        controls.style.display = 'none';

        // Handle arrow keys for desktop (keydown events)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && player.y > 0) {
                player.y -= player.speed; // Slight move up
            } else if (e.key === 'ArrowDown' && player.y < canvas.height - mountainHeight - player.height) {
                player.y += player.speed; // Slight move down
            }
        });
    }
}

restartButton.addEventListener('click', restartGame);

window.addEventListener('resize', () => {
    updateCanvasSize();
    setupControls();
});

// Spawn enemies at intervals
let spawnTimer = setInterval(spawnEnemy, spawnInterval);

setupControls();
updateGame();
