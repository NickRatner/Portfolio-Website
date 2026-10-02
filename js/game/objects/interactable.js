import { playSound } from "../systems/audio.js";

export function createInteractable({
    x,
    y,
    name,
    prompt,
    label,
    sprite,
    width,
    height,
    onInteract
}) {
    return {
        x,
        y,

        name,
        prompt,
        label,

        width,
        height,

        sprite,

        isHighlighted: false,
        isMouseHovered: false,

        draw(context) {
            if (this.label) {
                drawLabel(
                    context,
                    this.x,
                    this.y,
                    this.width,
                    this.height,
                    this.label
                );
            }

            if (
                this.isHighlighted ||
                this.isMouseHovered
            ) {
                drawHighlight(
                    context,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }

            if (!this.sprite) {
                return;
            }

            context.drawImage(
                this.sprite,
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
        },

        interact() {
            playSound("interact");
            if (onInteract) {
                onInteract();
            }
        }
    };
}

function drawLabel(
    context,
    x,
    y,
    width,
    height,
    text
) {
    const connectorLength = 24;
    const labelY =
        y + height / 2 + connectorLength + 18;

    context.save();

    // Connector
    context.strokeStyle = "#397453";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(
        x,
        y + height / 2 + connectorLength
    );
    context.stroke();

    // Connector dot
    context.fillStyle = "#5ee89a";
    context.beginPath();
    context.arc(
        x,
        y + height / 2 + connectorLength,
        3,
        0,
        Math.PI * 2
    );
    context.fill();

    // Label
    context.font = "bold 12px monospace";

    const textWidth =
        context.measureText(text).width;

    const boxWidth = textWidth + 24;
    const boxHeight = 26;

    const boxX = x - boxWidth / 2;
    const boxY = labelY - boxHeight / 2;

    context.fillStyle = "rgba(6, 20, 12, 0.95)";
    context.fillRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );

    context.strokeStyle = "#397453";
    context.lineWidth = 1;
    context.strokeRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );

    context.fillStyle = "#72eaa3";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
        text,
        x,
        labelY
    );

    context.restore();
}


/*
 * Draw a pixel-style interaction glow around
 * the component.
 */
function drawHighlight(
    context,
    x,
    y,
    width,
    height
) {
    const padding = 8;

    context.save();

    context.shadowColor = "#36d878";
    context.shadowBlur = 18;

    context.strokeStyle = "#36d878";
    context.lineWidth = 2;

    context.strokeRect(
        x - width / 2 - padding,
        y - height / 2 - padding,
        width + padding * 2,
        height + padding * 2
    );

    context.restore();

    drawCornerBracket(
        context,
        x - width / 2 - padding,
        y - height / 2 - padding,
        12,
        1,
        1
    );

    drawCornerBracket(
        context,
        x + width / 2 + padding,
        y - height / 2 - padding,
        12,
        -1,
        1
    );

    drawCornerBracket(
        context,
        x - width / 2 - padding,
        y + height / 2 + padding,
        12,
        1,
        -1
    );

    drawCornerBracket(
        context,
        x + width / 2 + padding,
        y + height / 2 + padding,
        12,
        -1,
        -1
    );
}


function drawCornerBracket(
    context,
    x,
    y,
    size,
    directionX,
    directionY
) {
    context.strokeStyle = "#55e891";
    context.lineWidth = 3;
    context.lineCap = "square";

    context.beginPath();

    context.moveTo(x, y);
    context.lineTo(
        x + size * directionX,
        y
    );

    context.moveTo(x, y);
    context.lineTo(
        x,
        y + size * directionY
    );

    context.stroke();
}