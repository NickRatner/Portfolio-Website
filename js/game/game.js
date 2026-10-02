import {
    setRunning,
    setPlayerPosition
} from "./gameState.js";

import { createPlayer } from "./player/player.js";
import { createWorld } from "./world/world.js";
import { createCamera } from "./world/camera.js";

import {
    initializeInput
} from "./systems/input.js";

import {
    initializeInteraction,
    updateInteraction
} from "./systems/interaction.js";

import {
    loadSound,
    loadMusic
} from "./systems/audio.js";


import { initializeNavigation } from "../ui/navigation.js";
import { initializeMapMenu } from "../ui/mapMenu.js";
import { initializeTerminalUI } from "../ui/terminalUI.js";
import { initializeModal } from "../ui/modal.js";


// =============================================
// GAME VARIABLES
// =============================================

let canvas;
let context;

let player;
let world;
let camera;


// =============================================
// START GAME
// =============================================

export function startGame() {
    canvas = document.getElementById("game-canvas");
    context = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load audio
    initializeAudio();

    // Initialize systems that listen for world events
    // BEFORE creating the world.
    initializeInteraction();

    world = createWorld();
    player = createPlayer(world.playerStart);
    camera = createCamera();

    setPlayerPosition(player.x, player.y);

    initializeInput(player, camera);

    initializeNavigation();
    initializeMapMenu();
    initializeTerminalUI();
    initializeModal();

    setRunning(true);

    requestAnimationFrame(gameLoop);
}


// =============================================
// AUDIO
// =============================================

function initializeAudio() {
    // SFX
    loadSound(
        "interact",
        "./assets/audio/sfx/interact.mp3"
    );

    loadSound(
        "dash",
        "./assets/audio/sfx/dash.mp3",
        0.25
    );
}


// =============================================
// GAME LOOP
// =============================================

function gameLoop(timestamp) {
    if (!getGameRunning()) {
        requestAnimationFrame(gameLoop);
        return;
    }

    update(timestamp);
    render(timestamp);

    requestAnimationFrame(gameLoop);
}


// =============================================
// UPDATE
// =============================================

function update(timestamp) {
    player.update(timestamp);
    updateInteraction(player);
    camera.update(player);
    setPlayerPosition(player.x, player.y);
}


// =============================================
// RENDER
// =============================================

function render(timestamp) {
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.save();

    camera.apply(context);

    world.draw(context, timestamp);
    player.draw(context);

    context.restore();
}


// =============================================
// HELPERS
// =============================================

function getGameRunning() {
    return true;
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}