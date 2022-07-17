let canvas;
let world;
let keyboard = new Keyboard();



/**
 * This function is used on onload index.html 
 * sets variable to Canvas and start animate button
 */
function init() {
    canvas = document.getElementById('canvas');
    animateStartButton();
}

/**
 * This function is used to animate the startButton by setting 2 different timeouts
 */
function animateStartButton() {
    document.getElementById('start_game').classList.remove('start_game_btn_bigger');
    setTimeout(() => {
        document.getElementById('start_game').classList.add('start_game_btn_bigger');
    }, 1000);
    setTimeout(() => {
        animateStartButton();
    }, 2000);
}

/**
 * This function is used to start the game and init the first level
 * hides elements from the startingpage
 */
function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    hideElement('start_screen');
    hideElement('start_game');
    hideElement('navbar_container');
    checkClientDeviceWidth();
    addMobileButtonsEventListeners();
}

/**
 * This function is used to toggle fullscreen by onclick
 */
function fullscreen() {
    let content = document.getElementById('game_container');
    if (!document.fullscreenElement) {
        content.requestFullscreen()
    } else {
        document.exitFullscreen();
    }
}

/**
 * This function is used to check the width of the client width
 */
 function checkClientDeviceWidth() {
        if (window.innerWidth > 1000) {
            hideElement('game_controls');
        } else {
            showElement('game_controls');
        }
}

/**
 * This function is used to toggle the control description at start screen
 * 
 */
function toggleControlDescription() {
    toggleElement('menu_controls');
    changeButtonText('controls', 'menu_controls');
}

/**
 * This function is used to change the text of elements (buttons)
 * 
 * @param {string} id - this paramter is the id of the element
 * @param {string} className - the parameter is a className of an element
 */
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

/**
 * This function is used to toggle the control buttons in the Game while playing
 */
function toggleControls() {
    toggleElement('left_buttons');
    toggleElement('right_buttons');
    changeButtonText('open_close_btn', 'area_controls_buttons_left')
}

/**
 * This function is used as a template to toggle elements
 * 
 * @param {string} id - this parameter is the id of an element
 * @returns 
 */
function toggleElement(id) {
    return document.getElementById(`${id}`).classList.toggle('d_none');
}

/**
 * This function is used as a template to show elements
 * 
 * @param {string} id - this parameter is the id of an element
 * @returns 
 */
function showElement(id) {
    return document.getElementById(`${id}`).classList.remove('d_none');
}

/**
 * This function is used as a template to hide elements
 * 
 * @param {string} id - this parameter is the id of an element
 * @returns 
 */
function hideElement(id) {
    return document.getElementById(`${id}`).classList.add('d_none');
}

/**
 * This function is used to check if a specific key is down 
 */
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

/**
 * This function is used to check if a specific key is down to move the character
 */
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

/**
 * This function is used to check if an elements is touched or not to move the character
 */
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
