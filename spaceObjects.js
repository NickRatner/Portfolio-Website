const spaceObjects = Array.from(document.querySelectorAll('.experience'));

let isHovering = null;


function checkCollisionWithSpaceObject()
{
    const playerRect = player.getBoundingClientRect();
    
    let collisionSpaceObject = null;
    spaceObjects.forEach(spaceObject => 
    {
        const spaceObjectRect = spaceObject.getBoundingClientRect();

        if (playerRect.right > spaceObjectRect.left &&
            playerRect.left < spaceObjectRect.right &&
            playerRect.bottom > spaceObjectRect.top &&
            playerRect.top < spaceObjectRect.bottom) 
        {
            collisionSpaceObject = spaceObject;
        }
    });
        
    let isColliding = (collisionSpaceObject != null);
    return collisions = {isColliding: isColliding, collisionSpaceObject: collisionSpaceObject};
}



function enableExperienceInfoBox(spaceObject)
{
    // enable pop ups when colliding
    const infoBox = spaceObject.querySelector('.experienceInfo');
    if (infoBox) 
    {
        infoBox.style.display = "block";
    }
}


function disableExperienceInfoBox() 
{
    spaceObjects.forEach(spaceObject => 
    {
        const infoBox = spaceObject.querySelector('.experienceInfo');
        if(isHovering != spaceObject)
        {
            infoBox.style.display = "none";
        }
    });
}


spaceObjects.forEach(spaceObject => 
{
    const infoBox = spaceObject.querySelector('.experienceInfo');

    // When mouse enters (hover), show the infobox
    spaceObject.addEventListener('mouseenter', () => 
    {
        isHovering = spaceObject;
        infoBox.style.display = "block"; // Show infobox
    });

    // When mouse leaves, reset hover flag and check player collision
    spaceObject.addEventListener('mouseleave', () => 
    {
        isHovering = null;

        let collisionSpaceObject = checkCollisionWithSpaceObject();
        if(!collisionSpaceObject.isColliding)
        {
            disableExperienceInfoBox(); // Hide only if no collision
        }
    });
});