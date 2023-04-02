let isXPlayerTurn = true;
let isGameFinished = false;
const score = {
    x: {
        score: 0,
        domElement: document.querySelector('.x-score span:last-child'),
        increase: function(){
            this.score++;
            this.domElement.innerText = this.score.toString();
        }
    },
    o: {
        score: 0,
        domElement: document.querySelector('.o-score span:last-child'),
        increase: function(){
            this.score++;
            this.domElement.innerText = this.score.toString();
        }
    }
};
const elements = document.querySelectorAll(`.item span`);
const turnElement = document.getElementById('turn-information');
const combinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
    
function clicked(item){
    if(isGameFinished) return;
    if(item.querySelector('span').innerText !== '') return;

    item.querySelector('span').innerText = isXPlayerTurn ? 'X' : 'O';
    isXPlayerTurn = !isXPlayerTurn;
    changeTurnElement(isXPlayerTurn);

    checkGameResult();
}

function changeTurnElement(isXPlayerTurn){
    turnElement.classList.toggle('xPlayer', isXPlayerTurn);
    turnElement.classList.toggle('victoryX', false);
    turnElement.classList.toggle('victoryO', false);
    turnElement.classList.toggle('victoryXYXYXY', false);

}

function checkGameResult(){

    for(arr of combinations){
        if(elements[arr[0]].innerText === elements[arr[1]].innerText
            && elements[arr[0]].innerText === elements[arr[2]].innerText
            && elements[arr[0]].innerText !== ''){
     
            endGame(elements[arr[0]].innerText, arr);
            return;
        }
    }

    for(element of elements){
        if(element.innerText === '') return
    }
    endGame('XYXYXY');
}

function endGame(winnerString, arr){
    updateScore(winnerString.toLowerCase());

    isGameFinished = true;
    turnElement.classList.add(`victory${winnerString.toUpperCase()}`);
    if (winnerString === "X") {
        arr?.forEach(index => elements[index].classList.add('active'));
    } else if (winnerString === "O") {
        arr?.forEach(index => elements[index].classList.add('active2'));
    }

    if (turnElement.classList.contains('victoryX')) {
        turnElement.style.color = 'red'
    } else if (turnElement.classList.contains('victoryO')) {
        turnElement.style.color = 'green'
    }  else if (turnElement.classList.contains('victoryXYXYXY')) {
        turnElement.style.color = '#FFB300'
    }
}


function updateScore(winnerPlayer){
    if(winnerPlayer === 'x'){
        score.x.increase();
    }else if(winnerPlayer === 'o'){
        score.o.increase();
    }
}


function reMatch(){
    if(!isGameFinished){
        alert('Game IS NOT FINISHED');
        return
    }
    turnElement.style.color = 'white';

    for(element of elements){
        element.innerText = '';

        if(element.classList.contains('active')){
            element.classList.remove('active');
        } else if (element.classList.contains('active2')) {
            element.classList.remove('active2');
        }
    }

    isXPlayerTurn = true;
    isGameFinished = false;

    changeTurnElement(isXPlayerTurn);
}