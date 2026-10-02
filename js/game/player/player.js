import { updateMovement } from "./movement.js";
import { canMoveTo } from "./collision.js";
import {
    updateDash,
    isDashing
} from "./dash.js";


const PLAYER_SIZE = 64;


// Load player sprites
const sprites = {
    idle: new Image(),
    right: new Image(),
    left: new Image()
};

sprites.idle.src = "./assets/sprites/player/player_default.png";
sprites.right.src = "./assets/sprites/player/player_moving_right.png";
sprites.left.src = "./assets/sprites/player/player_moving_left.png";


// Draw the trail behind the player while dashing
function drawDashTrail(context, player) {

    if (!isDashing()) {
        return;
    }

    const direction = player.direction;

    const trailLength = 4;

    for (let i = trailLength; i >= 1; i--) {

        const distance = i * 14;

        const x =
            player.x -
            direction.x * distance;

        const y =
            player.y -
            direction.y * distance;

        const alpha =
            ((trailLength - i + 1) / trailLength) * 0.18;

        context.save();

        context.globalAlpha = alpha;

        context.fillStyle = "#36d878";

        context.beginPath();

        context.arc(
            x,
            y,
            PLAYER_SIZE / 2 - i * 5,
            0,
            Math.PI * 2
        );

        context.fill();

        context.restore();
    }
}


export function createPlayer(startPosition) {

    const player = {
        x: startPosition.x,
        y: startPosition.y,

        width: PLAYER_SIZE,
        height: PLAYER_SIZE,

        speed: 3,

        direction: {
            x: 0,
            y: 1
        },

        facing: "right",
        isMoving: false,

        update(timestamp) {

            updateDash(this, timestamp);

            if (isDashing()) {
                return;
            }

            const movement = updateMovement(this);

            this.isMoving =
                movement.x !== 0 ||
                movement.y !== 0;

            const newX = this.x + movement.x;
            const newY = this.y + movement.y;

            if (canMoveTo(newX, newY, this)) {
                this.x = newX;
                this.y = newY;
            }

            if (movement.x > 0) {
                this.facing = "right";
            } else if (movement.x < 0) {
                this.facing = "left";
            }
        },

        draw(context) {

            // Draw dash trail first so it appears behind the player
            drawDashTrail(context, this);

            let sprite;

            if (!this.isMoving) {
                sprite = sprites.idle;
            } else if (this.facing === "right") {
                sprite = sprites.right;
            } else {
                sprite = sprites.left;
            }


            // Add a subtle glow during the dash
            if (isDashing()) {

                context.save();

                context.shadowColor = "#36d878";
                context.shadowBlur = 18;

                context.drawImage(
                    sprite,
                    this.x - this.width / 2,
                    this.y - this.height / 2,
                    this.width,
                    this.height
                );

                context.restore();

                return;
            }


            // Normal player rendering
            context.drawImage(
                sprite,
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
        }
    };

    return player;
}