const state = {
    running: false,

    paused: false,

    player: {
        x: 400,
        y: 300
    },

    ui: {
        menuOpen: false,
        mapOpen: false,
        terminalOpen: false,
        modalOpen: false
    },

    input: {
        up: false,
        down: false,
        left: false,
        right: false
    },

    interaction: {
        current: null
    }
};


// =============================================
// STATE ACCESS
// =============================================

export function getGameState() {
    return state;
}


// =============================================
// GAME STATE
// =============================================

export function setRunning(value) {
    state.running = value;
}


export function setPaused(value) {
    state.paused = value;
}


// =============================================
// PLAYER STATE
// =============================================

export function getPlayerPosition() {
    return {
        x: state.player.x,
        y: state.player.y
    };
}


export function setPlayerPosition(x, y) {
    state.player.x = x;
    state.player.y = y;
}


// =============================================
// UI STATE
// =============================================

export function setUIState(key, value) {
    state.ui[key] = value;

    if (value) {
        clearMovementInput();
    }
}

function clearMovementInput() {
    state.input.up = false;
    state.input.down = false;
    state.input.left = false;
    state.input.right = false;
}


export function isUIOpen(name) {
    return state.ui[name] === true;
}


// =============================================
// INTERACTION STATE
// =============================================

export function setCurrentInteraction(object) {
    state.interaction.current = object;
}


export function getCurrentInteraction() {
    return state.interaction.current;
}