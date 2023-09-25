let CIRCLE_CLASS = 'circle'
let X_CLASS = 'x'

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const colsElements = document.querySelectorAll('[data-col]')
const winnerMessageElement = document.querySelector('#winning-message')
const winnerMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartGame = document.querySelector('#restart-button')

let circleTurn

startGame()

function startGame() {
    winnerMessageElement.classList.remove('show')

    colsElements.forEach(col => {
        col.addEventListener('click', handleClick, {once:true})
        col.firstChild.classList.remove(X_CLASS)
        col.firstChild.classList.remove(CIRCLE_CLASS)
    })
}

function handleClick(e) {
    const col = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placeMark
    placeMark(col, currentClass)
    //check For Win
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        //Check For Draw
        endGame(true)
    }else{
        //Switch Turns
        switchTurns()
    }
}


function placeMark(col, currentClass) {
    col.firstChild.classList.add(currentClass)

}

function switchTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return colsElements[index].firstChild.classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...colsElements].every(col => {
        return col.firstChild.classList.contains(CIRCLE_CLASS) || col.firstChild.classList.contains(X_CLASS)
    })
}

function endGame(draw) {
    if(draw){
        winnerMessageTextElement.innerText = "It's a Draw"

    }else{
        winnerMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins `
    }
    winnerMessageElement.classList.add('show')
}

restartGame.addEventListener('click', () =>{
    startGame()

})