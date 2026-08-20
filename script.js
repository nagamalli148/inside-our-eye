// ---------------------------------
// GET HTML ELEMENTS
// ---------------------------------

const object = document.getElementById("object");

const eye = document.getElementById("eye");

const lens = document.getElementById("lens");

const feedback = document.getElementById("feedback");

const conceptText = document.getElementById("concept-text");

const distanceSlider = document.getElementById("distance-slider");

const rays = document.querySelectorAll(".ray");


// ---------------------------------
// DRAGGING STATE
// ---------------------------------

let isDragging = false;


// ---------------------------------
// START DRAGGING
// ---------------------------------

object.addEventListener("mousedown", function () {

    isDragging = true;

    object.style.cursor = "grabbing";

});


// ---------------------------------
// MOVE OBJECT
// ---------------------------------

document.addEventListener("mousemove", function (event) {

    if (!isDragging) {
        return;
    }

    const simulationArea =
        document.querySelector(".simulation-area");

    const areaPosition =
        simulationArea.getBoundingClientRect();


    // Calculate mouse position inside simulation area

    let newX =
        event.clientX - areaPosition.left - 25;


    // Keep apple inside simulation area

    const minX = 20;

    const maxX =
        simulationArea.clientWidth - 80;


    newX = Math.max(minX, Math.min(newX, maxX));


    // Move apple

    object.style.left = newX + "px";


    // Calculate distance

    const eyePosition =
        eye.getBoundingClientRect();

    const objectPosition =
        object.getBoundingClientRect();


    const distance =
        eyePosition.left - objectPosition.right;


    updateSimulation(distance);

});


// ---------------------------------
// STOP DRAGGING
// ---------------------------------

document.addEventListener("mouseup", function () {

    isDragging = false;

    object.style.cursor = "grab";

});


// ---------------------------------
// SLIDER CONTROL
// ---------------------------------

distanceSlider.addEventListener("input", function () {

    const value = Number(distanceSlider.value);


    const simulationArea =
        document.querySelector(".simulation-area");


    const minX = 20;

    const maxX =
        simulationArea.clientWidth - 80;


    const newX =
        minX +
        ((maxX - minX) * value / 100);


    object.style.left = newX + "px";


    const eyePosition =
        eye.getBoundingClientRect();

    const objectPosition =
        object.getBoundingClientRect();


    const distance =
        eyePosition.left - objectPosition.right;


    updateSimulation(distance);

});


// ---------------------------------
// UPDATE SIMULATION
// ---------------------------------

function updateSimulation(distance) {

    /*
        Smaller distance = object is near.

        Larger distance = object is far.
    */

    if (distance < 180) {

        showNearState();

    } else {

        showFarState();

    }

}


// ---------------------------------
// NEAR OBJECT
// ---------------------------------

function showNearState() {

    // Change lens shape

    lens.style.width = "70px";

    lens.style.height = "120px";


    // Change light rays

    rays[0].style.transform = "rotate(-8deg)";

    rays[1].style.transform = "rotate(2deg)";

    rays[2].style.transform = "rotate(8deg)";


    // Update feedback

    feedback.innerHTML = `
        <h3>🔍 Looking at something NEAR</h3>

        <p>
            The lens becomes more curved to help focus
            light from a nearby object.
        </p>
    `;


    conceptText.textContent =
        "When you look at something nearby, the lens changes shape so the light can be focused clearly on the retina.";

}


// ---------------------------------
// FAR OBJECT
// ---------------------------------

function showFarState() {

    // Change lens shape

    lens.style.width = "45px";

    lens.style.height = "95px";


    // Change light rays

    rays[0].style.transform = "rotate(-12deg)";

    rays[1].style.transform = "rotate(0deg)";

    rays[2].style.transform = "rotate(12deg)";


    // Update feedback

    feedback.innerHTML = `
        <h3>🔭 Looking at something FAR</h3>

        <p>
            The lens becomes flatter to help focus
            light from a distant object.
        </p>
    `;


    conceptText.textContent =
        "When you look at something far away, the lens changes shape so the light can be focused clearly on the retina.";

}


// ---------------------------------
// INITIAL STATE
// ---------------------------------

showFarState();