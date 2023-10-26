document.onkeydown = detectKey;
let score = 0;
let plane = document.getElementById('plane');
let planeLeft = plane.offsetLeft;
let planeTop = plane.offsetTop;
let container = document.querySelector('.container-md');
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;
let moveDistance = 100;  
let asteroid = document.getElementById('asteroid');
let asteroidTop = asteroid.offsetTop;
let asteroidLeft = asteroid.offsetLeft;
let stop = 0;
let seconds = 0;

function start() {
    document.getElementById("asteroid").style = "visibility: visibil";
    document.getElementById("start").style= "visibility: hidden";
    setInterval(increaseScore, 1000);
    newAsteroid();
}

function detectKey(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
        plane.style.left = (planeLeft - moveDistance) + "px";
    } else if (e.keyCode === 39) {
        plane.style.left = (planeLeft + moveDistance) + "px";
    } else if (e.keyCode === 38) {
        plane.style.top = (planeTop - moveDistance) + "px";
    } else if (e.keyCode === 40) {
        plane.style.top = (planeTop + moveDistance) + "px";
    }
}

function increaseScore() {
    if (stop == 0) {
        ++seconds;
        asteroidAtack();
        document.getElementById("score").innerHTML = "Time: " + seconds;
    }
}

function asteroidAtack() {
    if (asteroidTop < containerHeight) {
        setInterval(asteroidMove, 100);
    }
}

function asteroidMove() {
    if (stop == 0) {
        asteroid.style.top = (asteroidTop) + "px";
        asteroidTop += 1;
        if (asteroidTop == containerHeight - 120) {
            asteroidTop = 0;
            newAsteroid();
            ++score;
        }
        verifPositions();
    }
}

function newAsteroid() {
    let nweAsteroidPosition = Math.floor((Math.random()  * 2) + 1);
    if (nweAsteroidPosition == 1) {
        asteroid.style.left = 1 + "px";
    } else {
        asteroid.style.left = 180 + "px";
    }
}

function verifPositions() {
    if ((parseInt(asteroid.style.top)) + 170 == parseInt(plane.style.top)) {
        if ((asteroid.style.left == 180 + "px" &&  plane.style.left == 248 + "px") ||
            (asteroid.style.left == 1 + "px" &&  plane.style.left == 48 + "px"))  {
                document.getElementById("finalMesage").innerText = "Game over! Your score is " + score;
                stop = 1;
        }
    }
}
