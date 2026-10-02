const WORLD_WIDTH = 2000;
const WORLD_HEIGHT = 1200;


/* =========================================================
   PCB BASE
   ========================================================= */

export function drawPCBBackground(context) {
    // Main board
    context.fillStyle = "#06120d";
    context.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Inner board
    context.fillStyle = "#091a12";
    context.fillRect(
        20,
        20,
        WORLD_WIDTH - 40,
        WORLD_HEIGHT - 40
    );

    drawSubtleBoardTexture(context);
    drawGrid(context);
    drawBoardBorder(context);
    drawBoardDetails(context);
    drawTechnicalLabels(context);
}


/* =========================================================
   BACKGROUND TEXTURE
   ========================================================= */

function drawSubtleBoardTexture(context) {
    context.fillStyle = "#0b1e15";

    // Very subtle PCB texture
    for (let y = 60; y < WORLD_HEIGHT - 40; y += 64) {
        for (let x = 60; x < WORLD_WIDTH - 40; x += 64) {
            context.fillRect(x, y, 2, 2);
        }
    }
}


/* =========================================================
   GRID
   ========================================================= */

function drawGrid(context) {
    const GRID_SIZE = 32;

    context.strokeStyle = "#0b2419";
    context.lineWidth = 1;

    context.beginPath();

    for (let x = 32; x < WORLD_WIDTH; x += GRID_SIZE) {
        context.moveTo(x, 0);
        context.lineTo(x, WORLD_HEIGHT);
    }

    for (let y = 32; y < WORLD_HEIGHT; y += GRID_SIZE) {
        context.moveTo(0, y);
        context.lineTo(WORLD_WIDTH, y);
    }

    context.stroke();

    // Larger PCB grid
    context.strokeStyle = "#0d2b1e";

    context.beginPath();

    for (let x = 128; x < WORLD_WIDTH; x += 128) {
        context.moveTo(x, 0);
        context.lineTo(x, WORLD_HEIGHT);
    }

    for (let y = 128; y < WORLD_HEIGHT; y += 128) {
        context.moveTo(0, y);
        context.lineTo(WORLD_WIDTH, y);
    }

    context.stroke();
}


/* =========================================================
   BOARD BORDER
   ========================================================= */

function drawBoardBorder(context) {
    context.strokeStyle = "#174d35";
    context.lineWidth = 6;

    context.strokeRect(
        12,
        12,
        WORLD_WIDTH - 24,
        WORLD_HEIGHT - 24
    );

    context.strokeStyle = "#0d3021";
    context.lineWidth = 2;

    context.strokeRect(
        25,
        25,
        WORLD_WIDTH - 50,
        WORLD_HEIGHT - 50
    );
}


/* =========================================================
   EXTRA BOARD DETAILS
   ========================================================= */

function drawBoardDetails(context) {
    // Mounting holes
    drawMountingHole(context, 55, 55);
    drawMountingHole(context, WORLD_WIDTH - 55, 55);
    drawMountingHole(context, 55, WORLD_HEIGHT - 55);
    drawMountingHole(
        context,
        WORLD_WIDTH - 55,
        WORLD_HEIGHT - 55
    );

    // Small board labels
    drawBoardLabel(context, 90, 110, "NICK-01");
    drawBoardLabel(context, 1720, 110, "PCB-01");
    drawBoardLabel(context, 90, 1130, "REV 1.0");
    drawBoardLabel(context, 1690, 1130, "SYSTEM");
}


function drawMountingHole(context, x, y) {
    context.fillStyle = "#040b08";
    context.strokeStyle = "#174d35";
    context.lineWidth = 3;

    context.beginPath();
    context.arc(x, y, 14, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.strokeStyle = "#0b2419";
    context.lineWidth = 2;

    context.beginPath();
    context.arc(x, y, 8, 0, Math.PI * 2);
    context.stroke();
}


function drawBoardLabel(context, x, y, text) {
    context.fillStyle = "#174b34";
    context.font = "10px monospace";
    context.fillText(text, x, y);
}


/* =========================================================
   TRACES
   ========================================================= */

export function drawTrace(context, points) {
    if (points.length < 2) {
        return;
    }

    // Dark under-layer
    context.strokeStyle = "#06150e";
    context.lineWidth = 9;
    context.lineJoin = "miter";
    context.lineCap = "square";

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();

    // Copper trace
    context.strokeStyle = "#18583b";
    context.lineWidth = 4;

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();
}


/*
 * Thin decorative traces.
 */
export function drawThinTrace(context, points) {
    if (points.length < 2) {
        return;
    }

    context.strokeStyle = "#123f2b";
    context.lineWidth = 2;
    context.lineJoin = "miter";
    context.lineCap = "square";

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();
}


/*
 * Bright trace highlight.
 */
export function drawHighlightedTrace(context, points) {
    if (points.length < 2) {
        return;
    }

    context.strokeStyle = "#23734c";
    context.lineWidth = 3;
    context.lineJoin = "miter";
    context.lineCap = "square";

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();
}


/* =========================================================
   VIAS
   ========================================================= */

export function drawVia(context, x, y, radius = 5) {
    context.fillStyle = "#07140f";
    context.strokeStyle = "#359465";
    context.lineWidth = 2;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillStyle = "#1b593b";

    context.beginPath();
    context.arc(
        x,
        y,
        Math.max(1, radius - 2),
        0,
        Math.PI * 2
    );

    context.fill();
}


/* =========================================================
   COMPONENT FOOTPRINT
   ========================================================= */

export function drawFootprint(
    context,
    x,
    y,
    width,
    height
) {
    // Outer glow / clearance
    context.strokeStyle = "#0e3323";
    context.lineWidth = 5;

    context.strokeRect(
        x - width / 2 - 6,
        y - height / 2 - 6,
        width + 12,
        height + 12
    );

    // Interior
    context.fillStyle = "#0a2016";

    context.fillRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    // Border
    context.strokeStyle = "#164c34";
    context.lineWidth = 2;

    context.strokeRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    // Corner markings
    const marker = 8;

    context.fillStyle = "#267b51";

    const left = x - width / 2;
    const right = x + width / 2;
    const top = y - height / 2;
    const bottom = y + height / 2;

    context.fillRect(left - 2, top - 2, marker, 3);
    context.fillRect(right - marker + 2, top - 2, marker, 3);
    context.fillRect(left - 2, bottom - 1, marker, 3);
    context.fillRect(right - marker + 2, bottom - 1, marker, 3);
}


/* =========================================================
   PINS
   ========================================================= */

export function drawPins(
    context,
    x,
    y,
    width,
    height,
    count = 8
) {
    const spacing = width / (count + 1);

    context.fillStyle = "#318b5d";

    for (let i = 1; i <= count; i++) {
        const px = x - width / 2 + spacing * i;

        // Top
        context.fillRect(
            px - 1,
            y - height / 2 - 7,
            3,
            7
        );

        // Bottom
        context.fillRect(
            px - 1,
            y + height / 2,
            3,
            7
        );
    }

    const verticalSpacing = height / (count + 1);

    for (let i = 1; i <= count; i++) {
        const py = y - height / 2 + verticalSpacing * i;

        // Left
        context.fillRect(
            x - width / 2 - 7,
            py - 1,
            7,
            3
        );

        // Right
        context.fillRect(
            x + width / 2,
            py - 1,
            7,
            3
        );
    }
}


/* =========================================================
   DECORATIVE RESISTORS
   ========================================================= */

export function drawResistor(
    context,
    x,
    y,
    horizontal = true
) {
    context.strokeStyle = "#236c49";
    context.lineWidth = 3;
    context.lineCap = "square";

    context.beginPath();

    if (horizontal) {
        context.moveTo(x - 22, y);
        context.lineTo(x - 9, y);

        context.moveTo(x + 9, y);
        context.lineTo(x + 22, y);
    } else {
        context.moveTo(x, y - 22);
        context.lineTo(x, y - 9);

        context.moveTo(x, y + 9);
        context.lineTo(x, y + 22);
    }

    context.stroke();

    context.strokeStyle = "#3a9663";
    context.lineWidth = 2;

    context.strokeRect(
        horizontal ? x - 9 : x - 6,
        horizontal ? y - 6 : y - 9,
        horizontal ? 18 : 12,
        horizontal ? 12 : 18
    );

    // Bands
    context.strokeStyle = "#1a5136";
    context.lineWidth = 1;

    if (horizontal) {
        for (let i = -4; i <= 4; i += 4) {
            context.beginPath();
            context.moveTo(x + i, y - 5);
            context.lineTo(x + i, y + 5);
            context.stroke();
        }
    }
}


/* =========================================================
   CAPACITOR
   ========================================================= */

export function drawCapacitor(context, x, y) {
    context.strokeStyle = "#2d8257";
    context.lineWidth = 3;

    context.beginPath();

    context.moveTo(x - 8, y - 6);
    context.lineTo(x + 8, y - 6);

    context.moveTo(x - 8, y + 6);
    context.lineTo(x + 8, y + 6);

    context.stroke();

    context.lineWidth = 2;

    context.beginPath();

    context.moveTo(x, y - 17);
    context.lineTo(x, y - 6);

    context.moveTo(x, y + 6);
    context.lineTo(x, y + 17);

    context.stroke();
}


/* =========================================================
   SMALL CHIP
   ========================================================= */

export function drawSmallChip(
    context,
    x,
    y,
    width = 36,
    height = 28
) {
    context.fillStyle = "#0b2318";
    context.strokeStyle = "#236c49";
    context.lineWidth = 2;

    context.fillRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    context.strokeRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    context.fillStyle = "#318b5d";

    for (let i = 0; i < 3; i++) {
        const px = x - 8 + i * 8;

        context.fillRect(
            px,
            y - height / 2 - 5,
            3,
            5
        );

        context.fillRect(
            px,
            y + height / 2,
            3,
            5
        );
    }
}


/* =========================================================
   LED
   ========================================================= */

export function drawLED(context, x, y, phase = 0) {
    const pulse =
        (Math.sin(performance.now() / 500 + phase) + 1) / 2;

    const glow =
        4 + pulse * 8;

    const brightness =
        0.45 + pulse * 0.55;

    context.save();

    context.shadowColor = "#36d878";
    context.shadowBlur = glow;

    context.fillStyle =
        `rgba(54, 216, 120, ${brightness})`;

    context.beginPath();
    context.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
    );
    context.fill();

    context.shadowBlur = 0;

    context.strokeStyle =
        `rgba(61, 166, 107, ${0.4 + pulse * 0.5})`;

    context.lineWidth = 1;

    context.beginPath();
    context.arc(
        x,
        y,
        7,
        0,
        Math.PI * 2
    );
    context.stroke();

    context.restore();
}


/* =========================================================
   CONNECTOR
   ========================================================= */

export function drawConnector(
    context,
    x,
    y,
    count = 6,
    horizontal = true
) {
    context.fillStyle = "#0b2117";
    context.strokeStyle = "#205f40";
    context.lineWidth = 2;

    const width = horizontal
        ? count * 9 + 10
        : 26;

    const height = horizontal
        ? 26
        : count * 9 + 10;

    context.fillRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    context.strokeRect(
        x - width / 2,
        y - height / 2,
        width,
        height
    );

    context.fillStyle = "#318b5d";

    for (let i = 0; i < count; i++) {
        if (horizontal) {
            context.fillRect(
                x - width / 2 + 7 + i * 9,
                y - 4,
                5,
                8
            );
        } else {
            context.fillRect(
                x - 4,
                y - height / 2 + 7 + i * 9,
                8,
                5
            );
        }
    }
}


/* =========================================================
   DECORATIONS
   ========================================================= */

export function drawDecorations(context) {

    /*
     * BOARD IDENTIFICATION
     */

    drawSmallChip(context, 1100, 700, 70, 45);
    drawSmallChip(context, 1100, 780, 50, 35);

    drawConnector(context, 320, 110, 6, true);
    drawConnector(context, 1660, 1030, 6, true);

    drawResistor(context, 420, 750, true);
    drawResistor(context, 500, 750, true);

    drawCapacitor(context, 1550, 650);
    drawCapacitor(context, 1600, 650);

    /*
     * LEFT SIDE
     */

    drawResistor(context, 180, 230, true);
    drawResistor(context, 270, 230, true);
    drawCapacitor(context, 350, 230);

    drawSmallChip(context, 190, 330);
    drawSmallChip(context, 280, 330);
    drawSmallChip(context, 370, 330);

    drawConnector(context, 160, 520, 8, false);
    drawConnector(context, 260, 520, 6, false);

    drawResistor(context, 170, 680, false);
    drawCapacitor(context, 240, 680);
    drawResistor(context, 310, 680, false);

    drawSmallChip(context, 200, 930);
    drawSmallChip(context, 300, 930);
    drawSmallChip(context, 400, 930);

    drawConnector(context, 170, 1040, 8, true);


    /*
     * TOP
     */

    drawSmallChip(context, 480, 130);
    drawSmallChip(context, 550, 130);

    drawResistor(context, 680, 150, true);
    drawResistor(context, 760, 150, true);

    drawCapacitor(context, 840, 150);
    drawCapacitor(context, 890, 150);

    drawConnector(context, 1100, 100, 10, true);

    drawSmallChip(context, 1250, 130);
    drawSmallChip(context, 1330, 130);

    drawResistor(context, 1450, 140, true);
    drawCapacitor(context, 1540, 140);

    drawConnector(context, 1750, 140, 7, true);


    /*
     * RIGHT SIDE
     */

    drawSmallChip(context, 1780, 330);
    drawSmallChip(context, 1680, 350);

    drawConnector(context, 1870, 470, 8, false);

    drawResistor(context, 1780, 580, false);
    drawCapacitor(context, 1700, 580);

    drawSmallChip(context, 1800, 700);
    drawSmallChip(context, 1710, 760);

    drawResistor(context, 1850, 850, true);

    drawConnector(context, 1870, 950, 8, false);


    /*
     * BOTTOM
     */

    drawConnector(context, 650, 1080, 8, true);

    drawSmallChip(context, 850, 1060);
    drawSmallChip(context, 940, 1060);

    drawResistor(context, 1050, 1080, true);
    drawCapacitor(context, 1140, 1080);

    drawSmallChip(context, 1250, 1060);
    drawSmallChip(context, 1340, 1060);

    drawResistor(context, 1450, 1080, true);
    drawCapacitor(context, 1540, 1080);

    drawConnector(context, 1700, 1080, 8, true);


    /*
     * LEDS
     */

    drawLED(context, 140, 150, 0);
    drawLED(context, 420, 180, 1.5);

    drawLED(context, 1820, 150, 3);
    drawLED(context, 1900, 300, 4.5);

    drawLED(context, 150, 850, 2);
    drawLED(context, 1850, 800, 5);

    drawLED(context, 450, 1100, 3.5);
    drawLED(context, 1600, 1100, 1);
}


/* =========================================================
   DENSE TRACE NETWORK
   ========================================================= */

export function drawDenseTraces(context) {

    /*
     * CPU AREA
     */

    drawTrace(context, [
        { x: 920, y: 300 },
        { x: 760, y: 300 },
        { x: 760, y: 250 },
        { x: 500, y: 250 }
    ]);

    drawTrace(context, [
        { x: 920, y: 320 },
        { x: 780, y: 320 },
        { x: 780, y: 270 },
        { x: 500, y: 270 }
    ]);

    drawThinTrace(context, [
        { x: 920, y: 340 },
        { x: 800, y: 340 },
        { x: 800, y: 290 },
        { x: 450, y: 290 }
    ]);

    drawThinTrace(context, [
        { x: 920, y: 360 },
        { x: 820, y: 360 },
        { x: 820, y: 310 },
        { x: 420, y: 310 }
    ]);


    /*
     * CPU -> GPU BUS
     */

    drawTrace(context, [
        { x: 1080, y: 300 },
        { x: 1200, y: 300 },
        { x: 1200, y: 400 },
        { x: 1400, y: 400 }
    ]);

    drawTrace(context, [
        { x: 1080, y: 320 },
        { x: 1220, y: 320 },
        { x: 1220, y: 420 },
        { x: 1400, y: 420 }
    ]);

    drawThinTrace(context, [
        { x: 1080, y: 340 },
        { x: 1240, y: 340 },
        { x: 1240, y: 440 },
        { x: 1400, y: 440 }
    ]);

    drawThinTrace(context, [
        { x: 1080, y: 360 },
        { x: 1260, y: 360 },
        { x: 1260, y: 460 },
        { x: 1400, y: 460 }
    ]);

    drawThinTrace(context, [
        { x: 1100, y: 280 },
        { x: 1300, y: 280 },
        { x: 1300, y: 380 },
        { x: 1400, y: 380 }
    ]);


    /*
     * CPU -> NETWORK
     */

    drawTrace(context, [
        { x: 1000, y: 220 },
        { x: 1000, y: 170 },
        { x: 1500, y: 170 },
        { x: 1500, y: 200 },
        { x: 1600, y: 200 }
    ]);

    drawThinTrace(context, [
        { x: 980, y: 220 },
        { x: 980, y: 150 },
        { x: 1480, y: 150 },
        { x: 1480, y: 180 },
        { x: 1600, y: 180 }
    ]);

    drawThinTrace(context, [
        { x: 1020, y: 220 },
        { x: 1020, y: 130 },
        { x: 1460, y: 130 },
        { x: 1460, y: 160 },
        { x: 1600, y: 160 }
    ]);


    /*
     * RAM AREA
     */

    drawTrace(context, [
        { x: 600, y: 390 },
        { x: 600, y: 350 },
        { x: 700, y: 350 },
        { x: 700, y: 300 }
    ]);

    drawTrace(context, [
        { x: 620, y: 390 },
        { x: 620, y: 330 },
        { x: 740, y: 330 },
        { x: 740, y: 280 }
    ]);

    drawThinTrace(context, [
        { x: 580, y: 390 },
        { x: 580, y: 320 },
        { x: 680, y: 320 },
        { x: 680, y: 280 }
    ]);

    drawThinTrace(context, [
        { x: 560, y: 390 },
        { x: 560, y: 300 },
        { x: 660, y: 300 },
        { x: 660, y: 270 }
    ]);


    /*
     * RAM -> STORAGE
     */

    drawTrace(context, [
        { x: 550, y: 450 },
        { x: 450, y: 450 },
        { x: 450, y: 650 },
        { x: 600, y: 650 },
        { x: 600, y: 800 },
        { x: 700, y: 800 }
    ]);

    drawTrace(context, [
        { x: 570, y: 470 },
        { x: 430, y: 470 },
        { x: 430, y: 670 },
        { x: 620, y: 670 },
        { x: 620, y: 800 }
    ]);

    drawThinTrace(context, [
        { x: 550, y: 490 },
        { x: 410, y: 490 },
        { x: 410, y: 690 },
        { x: 640, y: 690 },
        { x: 640, y: 800 }
    ]);


    /*
     * GPU -> NETWORK
     */

    drawTrace(context, [
        { x: 1400, y: 400 },
        { x: 1550, y: 400 },
        { x: 1550, y: 300 },
        { x: 1700, y: 300 },
        { x: 1700, y: 200 }
    ]);

    drawThinTrace(context, [
        { x: 1400, y: 380 },
        { x: 1570, y: 380 },
        { x: 1570, y: 280 },
        { x: 1720, y: 280 },
        { x: 1720, y: 200 }
    ]);


    /*
     * GPU -> TERMINAL
     */

    drawTrace(context, [
        { x: 1400, y: 480 },
        { x: 1480, y: 480 },
        { x: 1480, y: 700 },
        { x: 1500, y: 700 },
        { x: 1500, y: 850 }
    ]);

    drawThinTrace(context, [
        { x: 1400, y: 500 },
        { x: 1460, y: 500 },
        { x: 1460, y: 720 },
        { x: 1480, y: 720 },
        { x: 1480, y: 850 }
    ]);


    /*
     * STORAGE -> TERMINAL
     */

    drawTrace(context, [
        { x: 700, y: 860 },
        { x: 700, y: 960 },
        { x: 1500, y: 960 },
        { x: 1500, y: 850 }
    ]);

    drawTrace(context, [
        { x: 720, y: 860 },
        { x: 720, y: 980 },
        { x: 1520, y: 980 },
        { x: 1520, y: 850 }
    ]);

    drawThinTrace(context, [
        { x: 680, y: 860 },
        { x: 680, y: 940 },
        { x: 1480, y: 940 },
        { x: 1480, y: 850 }
    ]);


    /*
     * LARGE DECORATIVE BUS THROUGH LOWER BOARD
     */

    drawTrace(context, [
        { x: 250, y: 900 },
        { x: 400, y: 900 },
        { x: 400, y: 1000 },
        { x: 1200, y: 1000 },
        { x: 1200, y: 1050 }
    ]);

    drawThinTrace(context, [
        { x: 250, y: 920 },
        { x: 420, y: 920 },
        { x: 420, y: 1020 },
        { x: 1220, y: 1020 },
        { x: 1220, y: 1050 }
    ]);

    drawThinTrace(context, [
        { x: 300, y: 880 },
        { x: 450, y: 880 },
        { x: 450, y: 980 },
        { x: 1180, y: 980 },
        { x: 1180, y: 1050 }
    ]);


    /*
     * RIGHT SIDE DECORATIVE NETWORK
     */

    drawTrace(context, [
        { x: 1600, y: 240 },
        { x: 1800, y: 240 },
        { x: 1800, y: 500 }
    ]);

    drawThinTrace(context, [
        { x: 1580, y: 240 },
        { x: 1760, y: 240 },
        { x: 1760, y: 520 }
    ]);

    drawThinTrace(context, [
        { x: 1620, y: 240 },
        { x: 1840, y: 240 },
        { x: 1840, y: 550 }
    ]);


    /*
     * LEFT EDGE BUS
     */

    drawTrace(context, [
        { x: 120, y: 350 },
        { x: 300, y: 350 },
        { x: 300, y: 600 },
        { x: 450, y: 600 }
    ]);

    drawThinTrace(context, [
        { x: 120, y: 370 },
        { x: 280, y: 370 },
        { x: 280, y: 620 },
        { x: 430, y: 620 }
    ]);

    drawThinTrace(context, [
        { x: 120, y: 390 },
        { x: 260, y: 390 },
        { x: 260, y: 640 },
        { x: 410, y: 640 }
    ]);


    /*
     * RANDOM PCB BRANCHES
     */

    drawThinTrace(context, [
        { x: 300, y: 350 },
        { x: 300, y: 280 },
        { x: 380, y: 280 },
        { x: 380, y: 230 }
    ]);

    drawThinTrace(context, [
        { x: 400, y: 600 },
        { x: 340, y: 600 },
        { x: 340, y: 720 },
        { x: 280, y: 720 }
    ]);

    drawThinTrace(context, [
        { x: 800, y: 450 },
        { x: 800, y: 520 },
        { x: 900, y: 520 },
        { x: 900, y: 650 }
    ]);

    drawThinTrace(context, [
        { x: 900, y: 520 },
        { x: 1000, y: 520 },
        { x: 1000, y: 600 }
    ]);

    drawThinTrace(context, [
        { x: 1200, y: 450 },
        { x: 1200, y: 550 },
        { x: 1100, y: 550 },
        { x: 1100, y: 700 }
    ]);

    drawThinTrace(context, [
        { x: 1300, y: 450 },
        { x: 1300, y: 600 },
        { x: 1200, y: 600 },
        { x: 1200, y: 750 }
    ]);

    drawThinTrace(context, [
        { x: 1550, y: 600 },
        { x: 1650, y: 600 },
        { x: 1650, y: 700 },
        { x: 1750, y: 700 }
    ]);

    drawThinTrace(context, [
        { x: 800, y: 800 },
        { x: 900, y: 800 },
        { x: 900, y: 900 },
        { x: 1000, y: 900 }
    ]);

    drawThinTrace(context, [
        { x: 900, y: 800 },
        { x: 950, y: 800 },
        { x: 950, y: 740 },
        { x: 1050, y: 740 }
    ]);

    drawThinTrace(context, [
        { x: 1100, y: 800 },
        { x: 1100, y: 870 },
        { x: 1200, y: 870 },
        { x: 1200, y: 920 }
    ]);

    drawThinTrace(context, [
        { x: 1250, y: 850 },
        { x: 1300, y: 850 },
        { x: 1300, y: 780 },
        { x: 1400, y: 780 }
    ]);
}


/* =========================================================
   VIA NETWORK
   ========================================================= */

export function drawDenseVias(context) {

    const vias = [
        // CPU
        [850, 300],
        [850, 250],
        [800, 320],
        [780, 270],
        [1150, 300],
        [1200, 300],
        [1200, 400],
        [1220, 420],

        // Network
        [1000, 170],
        [1500, 170],
        [1480, 150],
        [1600, 180],
        [1700, 300],
        [1720, 280],

        // RAM
        [600, 350],
        [700, 350],
        [740, 330],
        [580, 320],

        // Storage
        [450, 450],
        [450, 650],
        [430, 470],
        [430, 670],
        [500, 690],
        [620, 670],

        // GPU
        [1550, 400],
        [1570, 380],
        [1700, 300],

        // Terminal
        [1480, 700],
        [1460, 720],
        [1500, 700],
        [1520, 980],

        // Lower bus
        [400, 900],
        [400, 1000],
        [420, 920],
        [450, 980],
        [1200, 1000],
        [1220, 1020],

        // Left bus
        [300, 350],
        [300, 600],
        [280, 620],
        [260, 640],

        // Center decorative
        [800, 520],
        [900, 520],
        [1000, 520],
        [1100, 550],
        [1200, 600],
        [900, 800],
        [950, 800],
        [1100, 870],
        [1300, 780]
    ];

    vias.forEach(([x, y]) => {
        drawVia(context, x, y, 4);
    });
}


/* =========================================================
   PCB ANIMATION
   ========================================================= */

const animatedRoutes = [
    [
        { x: 920, y: 300 },
        { x: 760, y: 300 },
        { x: 760, y: 250 },
        { x: 500, y: 250 }
    ],

    [
        { x: 1080, y: 300 },
        { x: 1200, y: 300 },
        { x: 1200, y: 400 },
        { x: 1400, y: 400 }
    ],

    [
        { x: 1000, y: 220 },
        { x: 1000, y: 170 },
        { x: 1500, y: 170 },
        { x: 1500, y: 200 },
        { x: 1600, y: 200 }
    ],

    [
        { x: 550, y: 450 },
        { x: 450, y: 450 },
        { x: 450, y: 650 },
        { x: 600, y: 650 },
        { x: 600, y: 800 },
        { x: 700, y: 800 }
    ],

    [
        { x: 1400, y: 480 },
        { x: 1480, y: 480 },
        { x: 1480, y: 700 },
        { x: 1500, y: 700 },
        { x: 1500, y: 850 }
    ],

    [
        { x: 700, y: 860 },
        { x: 700, y: 960 },
        { x: 1500, y: 960 },
        { x: 1500, y: 850 }
    ],

    [
        { x: 250, y: 900 },
        { x: 400, y: 900 },
        { x: 400, y: 1000 },
        { x: 1200, y: 1000 },
        { x: 1200, y: 1050 }
    ]
];


function getRouteLength(points) {
    let length = 0;

    for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;

        length += Math.sqrt(
            dx * dx + dy * dy
        );
    }

    return length;
}


function getPointAlongRoute(points, distance) {
    let remaining = distance;

    for (let i = 1; i < points.length; i++) {
        const start = points[i - 1];
        const end = points[i];

        const dx = end.x - start.x;
        const dy = end.y - start.y;

        const segmentLength = Math.sqrt(
            dx * dx + dy * dy
        );

        if (remaining <= segmentLength) {
            const progress =
                remaining / segmentLength;

            return {
                x: start.x + dx * progress,
                y: start.y + dy * progress
            };
        }

        remaining -= segmentLength;
    }

    return points[points.length - 1];
}


export function drawPCBAnimations(context, timestamp) {
    if (!timestamp) {
        return;
    }

    context.save();

    animatedRoutes.forEach((route, index) => {
        const length = getRouteLength(route);

        // Each route has a slightly different speed.
        const speed =
            0.08 + index * 0.012;

        // Offset each pulse so they don't all move together.
        const offset =
            index * 180;

        const distance =
            ((timestamp * speed + offset) % length);

        const position =
            getPointAlongRoute(route, distance);

        // Outer glow
        context.shadowColor = "#3ee58a";
        context.shadowBlur = 12;

        context.fillStyle = "#3ee58a";

        context.beginPath();
        context.arc(
            position.x,
            position.y,
            4,
            0,
            Math.PI * 2
        );
        context.fill();

        // Bright center
        context.shadowBlur = 0;
        context.fillStyle = "#b8ffd5";

        context.beginPath();
        context.arc(
            position.x,
            position.y,
            1.5,
            0,
            Math.PI * 2
        );
        context.fill();
    });

    context.restore();
}


function drawTechnicalLabels(context) {
    context.save();

    context.fillStyle = "#123b29";
    context.font = "9px monospace";

    context.fillText("CPU_BUS", 820, 250);
    context.fillText("GPU_LINK", 1220, 370);
    context.fillText("MEMORY", 470, 410);
    context.fillText("IO_CTRL", 1570, 330);
    context.fillText("DATA_BUS", 850, 990);

    context.font = "8px monospace";

    context.fillText("R01", 165, 220);
    context.fillText("C07", 335, 220);
    context.fillText("U12", 180, 310);
    context.fillText("U13", 270, 310);
    context.fillText("U14", 360, 310);

    context.restore();
}