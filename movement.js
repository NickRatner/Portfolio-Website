
// player sprite images
const playerSpriteRight = "url('playerSpriteRight.png')";
const playerSpriteLeft = "url('playerSpriteLeft.png')";
const playerSpriteUp = "url('playerSpriteUp.png')";
const playerSpriteDown = "url('playerSpriteDown.png')";

const player = document.getElementById('player');
player.style.backgroundImage = playerSpriteRight;
const playableArea = document.getElementById('gameArea');

const playerSideLength = player.offsetWidth; // Side length of player in pixels (assuming square sprite)
let posX = player.offsetLeft; // player's X position
let posY = player.offsetTop; // player's Y position

const initialSpeed = 8;
let speed = initialSpeed; // Movement speed
const dashSpeed = 20; // Dash movement speed
let canDash = true;

const numberOfAfterimages = 4; // number of afterimages created
const afterimageDelay = 25; // Delay between afterimages in milliseconds
const spacingMultiplier = 3; // after image distance from each other
const initialOffsetMultiplier = -1; // after image distance from cube


let playableAreaWidth = playableArea.offsetWidth;
let playableAreaHeight = playableArea.offsetHeight;

let moving = { up: false, down: false, left: false, right: false };

setInterval(movePlayer, 16); // set up interval to call movePlayer every 16 milliseconds


function resetSpeed()
{
    speed = initialSpeed;
    canDash = true;
}

function setDashSpeed()
{
    speed = dashSpeed;
}

function movePlayer() 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open

    if(moving.up)
    {
        posY = Math.max(0, posY - speed);
    }

    if(moving.down)
    {
        posY = Math.min(playableAreaHeight - playerSideLength, posY + speed);
    }

    if(moving.left)
    {
        posX = Math.max(0, posX - speed);
    }

    if(moving.right)
    {
        posX = Math.min(playableAreaWidth - playerSideLength, posX + speed);
    }
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';
}

function createAfterImages()
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open

    const dashDirection = { x: 0, y: 0 };

    if (moving.up) dashDirection.y = -dashSpeed;
    if (moving.down) dashDirection.y = dashSpeed;
    if (moving.left) dashDirection.x = -dashSpeed;
    if (moving.right) dashDirection.x = dashSpeed;


    for (let i = 1; i <= numberOfAfterimages; i++) 
    {
        setTimeout(() => 
        {
            // create new afterimage
            const afterimage = document.createElement('div');
            afterimage.className = 'afterimage';

            // Position based on dash direction
            afterimage.style.left = (posX - (dashDirection.x * (i * spacingMultiplier + initialOffsetMultiplier))) + 'px'; 
            afterimage.style.top = (posY - (dashDirection.y * (i * spacingMultiplier + initialOffsetMultiplier))) + 'px';
            afterimage.style.backgroundImage = player.style.backgroundImage;
            playableArea.appendChild(afterimage);
            

            // Fade out and remove afterimage after 100ms
            setTimeout(() => 
            {
                afterimage.style.opacity = '0';
                setTimeout(() => 
                {
                    playableArea.removeChild(afterimage);
                }, 100); // Remove after 100ms

            }, 10); // Fade out after 10ms
        }, afterimageDelay * i);
    }

}



document.addEventListener('keydown', (event) => 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
    switch(event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = true;
            player.style.backgroundImage = playerSpriteUp;
            break;

        case "s":
        case 'ArrowDown':
            moving.down = true;
            player.style.backgroundImage = playerSpriteDown;
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = true;
            player.style.backgroundImage = playerSpriteLeft;
            break;

        case "d":
        case 'ArrowRight':
            moving.right = true;
            player.style.backgroundImage = playerSpriteRight;
            break;
    }
});

document.addEventListener('keyup', (event) => 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
    switch (event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = false;
            break;

        case "s":
        case 'ArrowDown':
            moving.down = false;
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = false;
            break;
        
        case "d":
        case 'ArrowRight':
            moving.right = false;
            break;
    }
});


document.addEventListener('keypress', (event) => 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
    switch(event.key)
    {
        case " ": // when space bar is pressed, dash
            if(canDash)
            {
                setDashSpeed();
                canDash = false;
                createAfterImages();

                setTimeout(() => 
                {
                    resetSpeed();
                }, 100); // reset speed after 100ms
            }
            break;
    }
});