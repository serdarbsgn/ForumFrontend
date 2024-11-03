export function snake(){
    const canvas = document.getElementById('gameCanvas');//make sure to have a <canvas id="gameCanvas" width="800" height="800"></canvas> canvas object like this before importing it.
    canvas.width = parseInt(window.innerWidth / 10) * 8;
    canvas.height = parseInt(window.innerHeight / 10) * 8;
    const ctx = canvas.getContext('2d');
    const Direction = {
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
    };
    const playPauseText = "Press Space To Play or Pause, Or Start or Option button on Controller.";
    const controlsText = "WASD or Arrow Keys to Move, Or DPAD or Left Analog on Controller";
    const boostText = "B or Left Shift to boost,or Right shoulder or A button on Controller";
    const boostText2 = "you can pass through yourself if you time it right"
    const gameOverText = "Game Over, Your Score: "
    let colour = 255
    // Define player position
    let playerX = parseInt((canvas.width / 2) / 10) * 10;
    let playerY = parseInt((canvas.height / 2) / 10) * 10;
    let playerArr = []
    let direction = NaN;
    let acceptInput = true
    let speed = 10;
    let snakeSize = 10;
    let baitX = 0;
    let baitY = 0;
    setBaitCoordinates()
    let playerSize = 1;
    let playerScore = 0;
    let playerHighScore = 0;
    let startGame = false;
    let gameOver = false;
    let pauseGame = false;
    let lastFrameTime = 0;
    let gamepadConnected = 0;
    let pauseBlocked = 0;
    let keyboardBoosted = false;
    const frameDelay = 1000 / 25;

    //no need for this since snake moves 10 pixels per draw
    function normalizeCoordinates(normX, normY) {
        if (normX % 10 > 6) {
            normX = parseInt(((normX / 10) + 1)) * 10;
        } else normX = parseInt(normX / 10) * 10;
        if (normY % 10 > 6) {
            normY = parseInt(((normY / 10) + 1)) * 10;
        } else normY = parseInt(normY / 10) * 10;
        return [normX, normY];
    }

    function setBaitCoordinates() {
        baitX = parseInt(((Math.random() * (canvas.width - 60)) + 20) / 10) * 10;
        baitY = parseInt(((Math.random() * (canvas.height - 60)) + 20) / 10) * 10;
    }

    // Main game loop
    function gameLoop() {

        const currentTime = performance.now();
        const deltaTime = currentTime - lastFrameTime;

        if (deltaTime > frameDelay) {
            lastFrameTime = currentTime;
            if (gamepadConnected > 0) {
                updateGamepadStatus();
            }
            if (startGame) {
                if (pauseGame) {
                    renderPause()
                }
                else {
                    if (baitX === playerX && baitY === playerY) {
                        playerSize += 1;
                        if (playerSize > playerHighScore) {
                            playerHighScore = playerSize;
                        }
                        setBaitCoordinates();
                    }
                    if (direction === Direction.UP && playerY > 20) {
                        playerY -= speed;
                        acceptInput = true;
                    }
                    if (direction === Direction.DOWN && playerY < canvas.height - 30) {
                        playerY += speed;
                        acceptInput = true;
                    }
                    if (direction === Direction.LEFT && playerX > 20) {
                        playerX -= speed;
                        acceptInput = true;
                    }
                    if (direction === Direction.RIGHT && playerX < canvas.width - 30) {
                        playerX += speed;
                        acceptInput = true;
                    }
                    const collisionIndex = playerArr.findIndex(c => c[0] === playerX && c[1] === playerY);
                    if (collisionIndex !== -1) {
                        playerScore = playerSize
                        playerSize = playerSize - Math.ceil(collisionIndex / snakeSize)
                        if (playerSize <= 0) {
                            startGame = false
                            gameOver = true
                        }
                        playerArr.splice(0, collisionIndex);
                    }
                    if (playerArr.length > playerSize * snakeSize) {
                        playerArr.shift();
                    }
                    //playerArr.push(normalizeCoordinates(playerX,playerY));//to get a clear snake line,needs revision
                    playerArr.push([playerX, playerY]);//to get more fluid snake line

                    render();
                }

            }
            else {
                if (gameOver) {
                    renderGameOver();
                }
                else {
                    renderMenu();
                    playerX = parseInt((canvas.width / 2) / 10) * 10;
                    playerY = parseInt((canvas.height / 2) / 10) * 10;
                    playerArr = [];
                    direction = NaN;
                    speed = 10;
                    snakeSize = 10;
                    setBaitCoordinates();
                    playerSize = 1;
                    playerHighScore = 0;
                }
            }
        }
        requestAnimationFrame(gameLoop);
    }

    // Function to render the game state
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(25, 25, canvas.width - 50, canvas.height - 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(baitX, baitY, 10, 10);
        let snakeParts = 0;
        const lastIndex = playerArr.length - 1;
        playerArr.forEach(function (e) {
            ctx.beginPath();
            ctx.arc(e[0] + 5, e[1] + 5, 5, 0, Math.PI * 2);
            if (snakeParts == lastIndex) {
                ctx.fillStyle = 'black';
            }
            else {
                let hue = ((playerSize - Math.floor(((snakeParts)) / 10) - 1) * 12) % 360;
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            }
            snakeParts += 1;
            ctx.fill();
            ctx.closePath();
        });
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(playerSize, canvas.width / 2, 20)
    }

    function renderMenu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(playPauseText, (canvas.width - ctx.measureText(playPauseText).width) / 2, canvas.height / 2 - 30)
        ctx.fillText(controlsText, (canvas.width - ctx.measureText(controlsText).width) / 2, canvas.height / 2)
        ctx.fillText(boostText, (canvas.width - ctx.measureText(boostText).width) / 2, canvas.height / 2 + 30)
        ctx.fillText(boostText2, (canvas.width - ctx.measureText(boostText2).width) / 2, canvas.height / 2 + 60)

    }
    function renderPause() {

    }
    function renderGameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`${gameOverText} ${playerHighScore}`, (canvas.width - ctx.measureText(`${gameOverText} ${playerHighScore}`).width) / 2, canvas.height / 2)
    }
    gameLoop();

    document.addEventListener('keydown', function (event) {

        if ((event.key == 'ArrowUp' || event.key.toUpperCase() == 'W') && direction != Direction.DOWN && direction != Direction.UP && acceptInput) {
            direction = Direction.UP
            const normArr = [playerX, playerY]
            playerX = normArr[0]
            playerY = normArr[1]
            acceptInput = false
        }
        if ((event.key == 'ArrowDown' || event.key.toUpperCase() == 'S') && direction != Direction.DOWN && direction != Direction.UP && acceptInput) {
            direction = Direction.DOWN
            const normArr = [playerX, playerY]
            playerX = normArr[0]
            playerY = normArr[1]
            acceptInput = false
        }
        if ((event.key == 'ArrowLeft' || event.key.toUpperCase() == 'A') && direction != Direction.LEFT && direction != Direction.RIGHT && acceptInput) {
            direction = Direction.LEFT
            const normArr = [playerX, playerY]
            playerX = normArr[0]
            playerY = normArr[1]
            acceptInput = false
        }
        if ((event.key == 'ArrowRight' || event.key.toUpperCase() == 'D') && direction != Direction.LEFT && direction != Direction.RIGHT && acceptInput) {
            direction = Direction.RIGHT
            const normArr = [playerX, playerY]
            playerX = normArr[0]
            playerY = normArr[1]
            acceptInput = false
        }

        if (event.key == ' ' && startGame == true) {
            if (pauseGame) {
                pauseGame = false
            }
            else {
                pauseGame = true
            }
        }


        if (event.key == ' ' && startGame == false && gameOver == false) {
            startGame = true
            direction = Direction.RIGHT
        }

        if (event.key == ' ' && startGame == false && gameOver) {
            gameOver = false
        }

        if (event.key.toLowerCase() == 'b' || event.code == 'ShiftLeft') {
            speed = 20;
            keyboardBoosted = true;
        }

    });
    document.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() == 'b' || event.code == 'ShiftLeft') {
            speed = 10;
            keyboardBoosted = false;
        }
    });

    window.addEventListener("gamepadconnected", (event) => {
        gamepadConnected += 1;
    });

    window.addEventListener("gamepaddisconnected", (event) => {
        gamepadConnected -= 1;
    });


    function updateGamepadStatus() {
        const currentGamepads = navigator.getGamepads();
        let gp = null;
        for (let j = 0; j < currentGamepads.length; j++) {
            if (currentGamepads[j] !== null) { gp = currentGamepads[j] }
        }//use the last connected controller.
        let speedBoosted = false;
        for (let j = 0; j < gp.buttons.length; j++) {
            if (gp.buttons[j].pressed) {
                if (j == 12 && direction != Direction.DOWN && direction != Direction.UP && acceptInput) {//this corresponds to up arrow on Xbox controller
                    direction = Direction.UP
                    const normArr = [playerX, playerY]
                    playerX = normArr[0]
                    playerY = normArr[1]
                    acceptInput = false
                }
                else if (j == 13 && direction != Direction.DOWN && direction != Direction.UP && acceptInput) {//this corresponds to down arrow on Xbox controller
                    direction = Direction.DOWN
                    const normArr = [playerX, playerY]
                    playerX = normArr[0]
                    playerY = normArr[1]
                    acceptInput = false
                }
                else if (j == 14 && direction != Direction.LEFT && direction != Direction.RIGHT && acceptInput) {//this corresponds to left arrow on Xbox controller
                    direction = Direction.LEFT
                    const normArr = [playerX, playerY]
                    playerX = normArr[0]
                    playerY = normArr[1]
                    acceptInput = false
                }
                else if (j == 15 && direction != Direction.LEFT && direction != Direction.RIGHT && acceptInput) {//this corresponds to right arrow on Xbox controller
                    direction = Direction.RIGHT
                    const normArr = [playerX, playerY]
                    playerX = normArr[0]
                    playerY = normArr[1]
                    acceptInput = false
                }
                else if (j == 5 || j == 0) {//right shoulder or A button is boost
                    speed = 20;
                    speedBoosted = true;
                }
                else if (j == 8 || j == 9) {//these are option and start buttons, to pause or play.
                    if (pauseBlocked <= 0) {
                        if (startGame) {
                            if (pauseGame) {
                                pauseGame = false
                            }
                            else {
                                pauseGame = true
                            }
                        }

                        else if (startGame == false && gameOver == false) {
                            startGame = true
                            direction = Direction.RIGHT
                        }

                        else if (startGame == false && gameOver) {
                            gameOver = false
                        }
                        pauseBlocked = 3;
                    }
                    else {
                        pauseBlocked--;
                    }
                }
            }
        }
        if (speedBoosted == false && keyboardBoosted == false) {
            speed = 10
        }
        if (gp.axes.length > 0) {
            for (let k = 0; k < gp.axes.length; k++) {
                if (Math.abs(gp.axes[k]) > 0.4) { // Simple dead zone check
                    if (k == 1 && direction != Direction.DOWN && direction != Direction.UP && acceptInput) {//this corresponds to up left analog stick y axis on Xbox controller
                        if (gp.axes[k] > 0) {
                            direction = Direction.DOWN;
                        }
                        else {
                            direction = Direction.UP;
                        }
                        const normArr = [playerX, playerY]
                        playerX = normArr[0]
                        playerY = normArr[1]
                        acceptInput = false
                    }
                    else if (k == 0 && direction != Direction.LEFT && direction != Direction.RIGHT && acceptInput) {//this corresponds to left analog stick x axis on Xbox controller
                        if (gp.axes[k] > 0) {
                            direction = Direction.RIGHT;
                        }
                        else {
                            direction = Direction.LEFT;
                        }
                        const normArr = [playerX, playerY]
                        playerX = normArr[0]
                        playerY = normArr[1]
                        acceptInput = false
                    }
                }
            }
        }
    }

}