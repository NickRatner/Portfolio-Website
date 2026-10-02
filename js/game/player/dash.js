import { playSound } from "../systems/audio.js";
import { getGameState } from "../gameState.js";
import {
    WORLD_WIDTH,
    WORLD_HEIGHT
} from "../world/world.js";

const DASH_DISTANCE = 120;
const DASH_DURATION = 150;
const DASH_COOLDOWN = 500;

let lastDashTime = 0;

let dashState = {
    active: false,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    startTime: 0
};

export function attemptDash(player) {
    const now = performance.now();

    const state = getGameState();

    // Don't dash if an interface is open
    if (
        state.ui.menuOpen ||
        state.ui.mapOpen ||
        state.ui.terminalOpen ||
        state.ui.modalOpen
    ) {
        return;
    }

    // Don't dash while already dashing
    if (dashState.active) {
        return;
    }

    // Cooldown
    if (now - lastDashTime < DASH_COOLDOWN) {
        return;
    }

    // Calculate desired dash target
    let targetX =
        player.x + player.direction.x * DASH_DISTANCE;

    let targetY =
        player.y + player.direction.y * DASH_DISTANCE;

    // Keep the player inside the world boundaries.
    const halfWidth = player.width / 2;
    const halfHeight = player.height / 2;

    targetX = Math.max(
        halfWidth,
        Math.min(WORLD_WIDTH - halfWidth, targetX)
    );

    targetY = Math.max(
        halfHeight,
        Math.min(WORLD_HEIGHT - halfHeight, targetY)
    );

    // Don't start a dash if the target is effectively
    // the same position as the current position.
    if (
        targetX === player.x &&
        targetY === player.y
    ) {
        return;
    }

    dashState.active = true;

    playSound("dash");
    
    dashState.startX = player.x;
    dashState.startY = player.y;

    dashState.targetX = targetX;
    dashState.targetY = targetY;

    dashState.startTime = now;

    lastDashTime = now;
}

export function updateDash(player, timestamp) {
    if (!dashState.active) {
        return;
    }

    const progress = Math.min(
        (timestamp - dashState.startTime) / DASH_DURATION,
        1
    );

    const easedProgress =
        1 - Math.pow(1 - progress, 3);

    player.x =
        dashState.startX +
        (dashState.targetX - dashState.startX) *
        easedProgress;

    player.y =
        dashState.startY +
        (dashState.targetY - dashState.startY) *
        easedProgress;

    if (progress >= 1) {
        player.x = dashState.targetX;
        player.y = dashState.targetY;

        dashState.active = false;
    }
}

export function isDashing() {
    return dashState.active;
}