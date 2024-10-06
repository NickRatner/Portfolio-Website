const animals = Array.from(document.querySelectorAll('.aboutMeSection'));

function checkCollisionWithAnimals()
{
    const playerRect = player.getBoundingClientRect();
    
    let collisionAnimal = null;
    animals.forEach(animal => 
    {
        const animalRect = animal.getBoundingClientRect();

        if (playerRect.right > animalRect.left &&
            playerRect.left < animalRect.right &&
            playerRect.bottom > animalRect.top &&
            playerRect.top < animalRect.bottom) 
        {
            collisionAnimal = animal;
        }
    });
        
    let isColliding = (collisionAnimal != null);
    return {isColliding: isColliding, collisionAnimal: collisionAnimal};
}

function enableSpaceAnimalPopUp(animal)
{
    // enable pop ups when colliding

    let animalRect = animal.getBoundingClientRect();

    PressSpacePopUp.style.display = "block";
    PressSpacePopUp.style.left = animalRect.left + (animalRect.width / 2) - (PressSpacePopUp.offsetWidth / 2) + "px";
    PressSpacePopUp.style.top = animalRect.top - PressSpacePopUp.offsetHeight * 2  + "px";
}