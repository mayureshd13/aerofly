<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aeroplane Game</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
            background-color: #87ceeb; /* Sky blue background */
        }

        canvas {
            display: block;
        }

        img.hidden {
            display: none;
        }

        #gameOverPopup {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border: 2px solid black;
            padding: 20px;
            text-align: center;
            font-size: 18px;
        }

        #restartButton {
            margin-top: 10px;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007BFF;
            color: white;
            border: none;
            cursor: pointer;
        }

        #restartButton:hover {
            background-color: #0056b3;
        }

        #controls {
            display: none;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        .control-button {
            width: 50px;
            height: 50px;
            margin: 0 10px;
            background-color: #007BFF;
            color: white;
            font-size: 20px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
        }

        .control-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <img id="playerPlane" src="our.png" class="hidden" alt="Player Plane">
    <img id="enemyPlane" src="oppo.png" class="hidden" alt="Enemy Plane">
    <img id="mountain" src="mount.png" class="hidden" alt="Mountain">
    <div id="gameOverPopup">
        <p>Game Over!</p>
        <p id="finalScore">Score: 0</p>
        <button id="restartButton">Restart</button>
    </div>
    <div id="controls">
        <button id="upButton" class="control-button">&#8593;</button>
        <button id="downButton" class="control-button">&#8595;</button>
    </div>
    <canvas id="gameCanvas"></canvas>

    <script src="aero.js"> </script>
</body>
</html>
