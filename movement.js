
const player = document.getElementById('player');
const playableArea = document.getElementById('gameArea');

const playerSideLength = 50; // Side length of player in pixels (assuming square sprite)
let posX = player.offsetLeft; // player's X position
let posY = player.offsetTop; // player's Y position

let speed = 10; // Movement speed
const dashSpeed = 30; // Dash movement speed
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
    speed = 10
    canDash = true;
}

function setDashSpeed()
{
    speed = dashSpeed;
}

function movePlayer() 
{
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
    switch(event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = true;
            break;

        case "s":
        case 'ArrowDown':
            moving.down = true;
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = true;
            break;

        case "d":
        case 'ArrowRight':
            moving.right = true;
            break;
    }
});

document.addEventListener('keyup', (event) => 
{
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