import {
    loadMusic,
    playSound
} from "../game/systems/audio.js";


const bootScreen = document.getElementById("boot-screen");
const gameScreen = document.getElementById("game-screen");
const bootOutput = document.getElementById("boot-output");
const bootPrompt = document.getElementById("boot-prompt");

const bootMessages = [
    "NICK_OS v1.0",
    "",
    "Initializing system...",
    "",
    "[ OK ] CPU",
    "[ OK ] MEMORY",
    "[ OK ] GPU",
    "[ OK ] STORAGE",
    "[ OK ] NETWORK",
    "",
    "Loading portfolio...",
    "Loading projects...",
    "Loading experience...",
    "Loading skills...",
    "",
    "SYSTEM READY"
];

let bootIndex = 0;
let bootComplete = false;
let applicationStarted = false;

let onBootComplete = null;


// =============================================
// START BOOT
// =============================================

export function startBootSequence(callback) {
    // load background music so it starts playing right away
    loadMusic(
        "background",
        "./assets/audio/music/background.mp3",
        0.25
    );

    onBootComplete = callback;

    printNextLine();
}


// =============================================
// PRINT LINES
// =============================================

function printNextLine() {
    if (bootIndex >= bootMessages.length) {
        finishBoot();
        return;
    }

    const line = bootMessages[bootIndex];

    const element = document.createElement("div");
    element.textContent = line;

    bootOutput.appendChild(element);

    bootIndex++;

    setTimeout(printNextLine, 100);
}


// =============================================
// FINISH BOOT
// =============================================

function finishBoot() {
    bootComplete = true;

    bootPrompt.classList.remove("hidden");

    document.addEventListener("keydown", handleBootInput);
}


// =============================================
// BOOT INPUT
// =============================================

function handleBootInput(event) {
    if (!bootComplete || applicationStarted) {
        return;
    }

    if (event.code !== "Space" && event.code !== "Enter") {
        return;
    }

    event.preventDefault();

    applicationStarted = true;

    document.removeEventListener("keydown", handleBootInput);

    bootScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    playSound("background"); // start background music
    
    if (onBootComplete) {
        onBootComplete();
    }
}