const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to start the game 

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initializing css property 

        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();
newGameBtn.addEventListener("click", () =>{
    initGame();
})

function swapTrun() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


// check game over function 
function checkGameOver() {
   let answer = "";

   winningPosition.forEach((position) =>{
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // check if winer is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }
            // stop click 
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // we know winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
   });
    // we have a winner to ui updation
   if(answer !== ""){
        gameInfo.innerText = `Winer player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
   }
   //check  when there is no winner 
   let fillCounter = 0;
   gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCounter++;
        }
   });

   // board is full

   if(fillCounter === 9){
        gameInfo.innerText = `Game Tied`;
        newGameBtn.classList.add("active");
   }

}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap to trun 
        swapTrun();
        // check to game over 
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click", () =>{
       handleClick(index);
    });
});