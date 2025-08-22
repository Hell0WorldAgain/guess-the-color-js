const colorCodeContainer = document.getElementById('color_code');
const optionsContainer = document.getElementById('options_conatiner');
const scoreContainer = document.getElementById('score');
let randomColor = null;
let score = 0;

function genrateRandomNumberBetween(min, max){
    return min + Math.floor(Math.random() * (max - min + 1))
}
function genrateRandomColor(){
    const red = genrateRandomNumberBetween(0,255);
    const green = genrateRandomNumberBetween(0,255);
    const blue = genrateRandomNumberBetween(0,255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function incrementScore() {
    score += 1;
    scoreContainer.innerText = score;
}

function validateResult(el){
    //console.log(el.target);
    const selectedColor = el.target.style.backgroundColor;
    if(selectedColor === randomColor){
        incrementScore();
    }
    else{
        score = 0;
    }
    window.localStorage.setItem('score', score);
    startGame();
}

function startGame(){
    score = Number(window.localStorage.getItem('score')) ?? 0;
    scoreContainer.innerText = score;
    optionsContainer.innerHTML = null;
    randomColor = genrateRandomColor();
    colorCodeContainer.innerText = randomColor;

    const ansIndex = genrateRandomNumberBetween(0,5);

    for(let i = 1; i <= 6; i++){
        const div = document.createElement('div');
        div.addEventListener('click', validateResult)
        div.style.backgroundColor = i === ansIndex ? randomColor : genrateRandomColor() ;
        optionsContainer.append(div);
    }
}

window.addEventListener("load", () => startGame() )