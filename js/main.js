import { startBootSequence } from "./boot/bootSequence.js";
import { startGame } from "./game/game.js";


// =============================================
// APPLICATION
// =============================================

function startApplication() {
    startGame();
}


// =============================================
// INITIALIZATION
// =============================================

function initialize() {
    startBootSequence(startApplication);
}


// Wait until HTML has loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
} else {
    initialize();
}