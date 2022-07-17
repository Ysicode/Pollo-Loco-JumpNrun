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
    showElement('game_controls');
    addMobileButtonsEventListeners();
}

function fullscreen() {
    let content = document.getElementById('game_container');
    if (!document.fullscreenElement) {
        content.requestFullscreen()
    } else {
        document.exitFullscreen();
    }
}

function toggleControlDescription() {
    toggleElement('menu_controls');
    changeButtonText('controls', 'menu_controls');
}

function changeButtonText(id, className) {
    document.getElementById(id).innerHTML = '';
    Array.from(document.getElementsByClassName(className)).forEach(button => {
        if (button.classList.contains('d_none')) {
            document.getElementById(id).innerHTML = 'Controls';
        } else {
            document.getElementById(id).innerHTML = 'Close';
        }
    });
}

function toggleControls() {
    toggleElement('left_buttons');
    toggleElement('right_buttons');
    changeButtonText('open_close_btn', 'area_controls_buttons_left')
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

function addMobileButtonsEventListeners() {
    document.getElementById('left_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('left_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('right_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('right_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('jump_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jump_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('throw_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throw_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}