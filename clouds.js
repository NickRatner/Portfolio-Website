const clouds = Array.from(document.querySelectorAll('.sideProject'));

let isHovering = null;


function checkCollisionWithCloud()
{
    const playerRect = player.getBoundingClientRect();
    
    let collisionCloud = null;
    clouds.forEach(cloud => 
    {
        const cloudRect = cloud.getBoundingClientRect();

        // Check if the player is colliding with the cloud
        if (playerRect.right > cloudRect.left &&
            playerRect.left < cloudRect.right &&
            playerRect.bottom > cloudRect.top &&
            playerRect.top < cloudRect.bottom) 
        {
            collisionCloud = cloud;
        }
    });
        
    let isColliding = (collisionCloud != null);
    return collisions = {isColliding: isColliding, collisionCloud: collisionCloud};
}



function enableInfoBox(cloud)
{
    // enable pop ups when colliding
    const infoBox =  cloud.querySelector('.sideProjectInfo');
    if (infoBox) 
    {
        infoBox.style.display = "block";
    }
}


function disableInfoBox() 
{
    clouds.forEach(cloud => 
    {
        const infoBox = cloud.querySelector('.sideProjectInfo');
        if(isHovering != cloud)
        {
            infoBox.style.display = "none";
        }
    });
}


clouds.forEach(cloud => 
{
    const infoBox = cloud.querySelector('.sideProjectInfo');

    // When mouse enters (hover), show the infobox
    cloud.addEventListener('mouseenter', () => 
    {
        isHovering = cloud;
        infoBox.style.display = "block"; // Show infobox
    });

    // When mouse leaves, reset hover flag and check player collision
    cloud.addEventListener('mouseleave', () => 
    {
        isHovering = null;

        let collisionsCloud = checkCollisionWithCloud();
        if(!collisionsCloud.isColliding)
        {
            disableInfoBox(); // Hide only if no collision
        }
    });
});