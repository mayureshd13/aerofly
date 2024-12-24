const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Game variables
        const player = {
            x: 100,
            y: canvas.height / 2,
            width: 50,
            height: 30,
            color: "#ff4500",
            speed: 5,
        };

        const obstacles = [];
        let gameRunning = true;
        let score = 0;

        function drawPlane(plane) {
            ctx.fillStyle = plane.color;
            ctx.fillRect(plane.x, plane.y, plane.width, plane.height);
        }

        function generateObstacle() {
            const obstacle = {
                x: canvas.width,
                y: Math.random() * (canvas.height - 30),
                width: 50,
                height: 30,
                color: "#000",
                speed: 3,
            };
            obstacles.push(obstacle);
        }

        function drawObstacles() {
            obstacles.forEach((obstacle) => {
                ctx.fillStyle = obstacle.color;
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        }

        function moveObstacles() {
            obstacles.forEach((obstacle) => {
                obstacle.x -= obstacle.speed;
            });
            // Remove off-screen obstacles
            obstacles.splice(0, obstacles.findIndex((obs) => obs.x + obs.width > 0));
        }

        function detectCollision() {
            obstacles.forEach((obstacle) => {
                if (
                    player.x < obstacle.x + obstacle.width &&
                    player.x + player.width > obstacle.x &&
                    player.y < obstacle.y + obstacle.height &&
                    player.y + player.height > obstacle.y
                ) {
                    gameRunning = false;
                }
            });
        }

        function updateScore() {
            score++;
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(`Score: ${score}`, 10, 30);
        }

        function gameLoop() {
            if (!gameRunning) {
                ctx.font = "40px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
                ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 120, canvas.height / 2 + 50);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawPlane(player);
            drawObstacles();

            moveObstacles();
            detectCollision();

            updateScore();
            requestAnimationFrame(gameLoop);
        }

        // Event listeners for movement
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && player.y > 0) player.y -= player.speed;
            if (e.key === "ArrowDown" && player.y < canvas.height - player.height) player.y += player.speed;
        });

        // Generate obstacles at intervals
        setInterval(() => {
            if (gameRunning) generateObstacle();
        }, 2000);

        // Start game loop
        gameLoop();
