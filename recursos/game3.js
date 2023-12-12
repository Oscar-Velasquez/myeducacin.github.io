//Initial References
let draggableObjects3;
let dropPoints3;

const starButton3 = document.getElementById("start3");
const result3 = document.querySelector(".result3");
const controls3 = document.querySelector(".controls3-container3");
const dragContainer3 = document.querySelector(".draggable-objects3");
const dropContainer3 = document.querySelector(".drop-points3");
const data3 = ["€0.01", "€0.05", "€0.10", "€0.20", "€0.50", "€1.00"];

let deviceType3 = "";
let initialX3 = 0,
    initialY3 = 0;
let currentElement3 = "";
let moveElement3 = false;
let countdown3; // Variable para almacenar el temporizador
let correctCoins3 = 0; // Contador de monedas en la posición correcta
let placedCoins3 = 0; // Contador de monedas colocadas


const isTouchDevice3 = () =>{
    try{
        document.createEvent("TouchEvent");
        deviceType3 = "touch";
        return true;
    }catch(e) {
        deviceType3 = "mouse";
        return false;
    }
};

let count3 = 0;

//Random value from Array
const randomValueGenerator3 = () => {
    return data3[Math.floor(Math.random() * data.length)];
};

const stopGame3 = () =>{
    controls3.classList.remove("hide");
    starButton3.classList.remove("hide");
};

function startTimer3(duration) {
    let timer3 = duration;
    countdown3 = setInterval(function () {
      const countdownDisplay = document.getElementById("countdown3");
      countdownDisplay.textContent = timer3 + " segundos";
  
        if (--timer3 < 0) {
            clearInterval(countdown3); // Detiene el temporizador cuando llega a cero
            result3.innerText = "¡Perdiste 😔!";
            stopGame3(); 
        }
    }, 1000);
};
 
function dragStart(e) {
    if (isTouchDevice3()) {
        initialX3 = e.touches[0].clientX;
        initialY3 = e.touches[0].clientY;

        moveElement3 = true;
        currentElement3 = e.target;
    }else {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function dragOver(e) {
    e.preventDefault();
}

const touchMove3 = (e) =>{
    if (moveElement3) {
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        currentSelectedElement.parentElement.style.top = currentSelectedElement.parentElement.offsetTop - (initialY3 - newY) + "px";
        currentSelectedElement.parentElement.style.left = currentSelectedElement.parentElement.offsetLeft - (initialX3 - newX) + "px";
        initialX3 = newX;
        initialY3 = newY;
    }
};


const drop3 = (e) => {
    e.preventDefault();
    if(isTouchDevice3()) {
        moveElement3 = false;
        const currentDrop = document.querySelector(`div
        [data-id='${e.target.id}']`);
        const currentDropBound = currentDrop.getBoundingClientRect();
        if( initialX3 >= currentDropBound.left && 
            initialX3 <= currentDropBound.right &&
            initialY3 >= currentDropBound.top &&
            initialY3 <= currentDropBound.bottom 
            ) {
                currentDrop.classList.add("dropped");
    
                currentElement3.classList.add("hide");
                currentDrop.innerHTML = ``;
    
                currentDrop.insertAdjacentHTML(
                    "afterbegin", 
                    `<img src= "../recursos/img/Euro/${currentElement3.id}.png">`
                );
                count3 += 1;
            }
        }else {
            const draggedElementData = e.dataTransfer.getData("text");
        
            const droppableElementData = e.target.getAttribute("data-id");
            if(draggedElementData === droppableElementData) {
                const draggedElement = document.getElementById(draggedElementData);
    
                e.target.classList.add("dropped");
    
                draggedElement.classList.add("hide");
    
                draggedElement.setAttribute("draggable", "false");
                e.target.innerHTML = ``;
    
                e.target.insertAdjacentHTML(
                    "afterbegin", 
                    `<img src="../recursos/img/Euro/${draggedElementData}.png">`
                );
                count3 += 1;
            }
        }
    
        if(count3 == 3){
            result3.innerText = `¡Ganaste!`;
            stopGame3();
            clearInterval(countdown3);
        }
    };
    
    const creator3 = () => {
        dragContainer3.innerHTML = "";
        dropContainer3.innerHTML = "";
        let randomData = [];
        for (let i = 1; i <= 3; i++){
            let randomValue = randomValueGenerator3();
            if (!randomData.includes(randomValue)){
                randomData.push(randomValue);
            }else {
                i -= 1;
            }
        }
        for (let i of randomData) {
            const flagDiv = document.createElement("div");
            flagDiv.classList.add("draggable-image");
            flagDiv.setAttribute("draggable", true);
            if(isTouchDevice3()) {
                flagDiv.style.position = "absolute";
            }
            flagDiv.innerHTML = `<img src="../recursos/img/Euro/${i}.png" id="${i}">`;
            dragContainer3.appendChild(flagDiv);
        }
        randomData = randomData.sort(() => 0.5 - Math.random());
        for (let i of randomData) {
            const countryDiv = document.createElement("div");
            countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
            ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
            </div>`;
            dropContainer3.appendChild(countryDiv);
        }
    };
    
    starButton3.addEventListener(
        "click", 
        (startGame = async () => {
            currentElement3 = "";
            controls3.classList.add("hide");
            starButton3.classList.add("hide");
    
            await creator3();
            count3 = 0;
            dropPoints3 = document.querySelectorAll(".countries");
            draggableObjects3 = document.querySelectorAll(".draggable-image");
    
            draggableObjects3.forEach((element) => {
                element.addEventListener("dragstart", dragStart);
    
                element.addEventListener("touchstart", dragStart);
                element.addEventListener("touchend", drop3);
                element.addEventListener("touchmove", touchMove3);
            });
            dropPoints3.forEach((element) => {
                element.addEventListener("dragover", dragOver);
                element.addEventListener("drop", drop3);
            });
    
            startTimer3(60); // 60 segundos
        })
    );
    
    