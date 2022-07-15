let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    animateStartButton();
}

function animateStartButton() {    
        document.getElementById('start_game').classList.remove('start_game_btn_bigger');   
        setTimeout(() => {
            document.getElementById('start_game').classList.add('start_game_btn_bigger');
        }, 1000);  
        setTimeout(() => {
            animateStartButton();
        }, 2000);
}

function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    hideElement('start_screen');
    hideElement('start_game');
    hideElement('navbar_container');
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
}) 

function fullscreen() {
    let content = document.getElementById('game_container');
    if (!document.fullscreenElement) {
        content.requestFullscreen()
    } else {
        document.exitFullscreen();
    }
}

function toggleControls() {
    toggleElement('menu_controls');
    changeButtonText();
}

function changeButtonText() {
    document.getElementById('controls').innerHTML = '';
    Array.from(document.getElementsByClassName('menu_controls')).forEach(button => {
        if (button.classList.contains('d_none')) {
            document.getElementById('controls').innerHTML = 'Controls';
        } else {
            document.getElementById('controls').innerHTML = 'Close';
        }
    });
}

function toggleElement(id) {
    return document.getElementById(`${id}`).classList.toggle('d_none');
}

function showElement(id) {
    return document.getElementById(`${id}`).classList.remove('d_none');
}

function hideElement(id) {
    return document.getElementById(`${id}`).classList.add('d_none');
}