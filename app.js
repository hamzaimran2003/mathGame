let operators = ["+", "-", "*"];

const startBtn = document.getElementById("startBtn")

const question = document.getElementById("question")

const controls = document.querySelector(".controls-container")

const result = document.getElementById("result")

const submitBtn = document.getElementById("submitBtn")

const errorMessage = document.getElementById("errorMsg")

const score = document.getElementById("score")

let answerValue;
let operatorQuestion;
let scoreVal = 0;
let level = 0;
let [num1, num2] = [0, 0];


//Random Value Generator Function
const randomValue = (min, max) => {
    const finalVal = Math.floor(Math.random() * (max - min)) + min;
    return finalVal
}

//Level- Wise Question Generator Function
const questionGenerator = () => {

    //random values between 1 and 20 according to levels
    if (level == 0) {
        [num1, num2] = [randomValue(1,5), randomValue(1,5)];
    }
    else if (level == 1) {
        [num1, num2] = [randomValue(5,10), randomValue(1,10)];
    }
    else if (level == 2) {
        [num1, num2] = [randomValue(5,15), randomValue(10,15)];
    }
    else if (level == 3) {
        [num1, num2] = [randomValue(10,20), randomValue(10,20)];
    }
    else if (level == 4) {
        [num1, num2] = [randomValue(15,25), randomValue(10,25)];
    }
    else if (level == 5) {
        [num1, num2] = [randomValue(15,30), randomValue(20,30)];
    }


    //random operator generator
    
    let OperatorCalc = Math.floor(Math.random() * operators.length)
    let randomOperator = operators[OperatorCalc];


    //only multiplication questions in level 4 and 5
    if (level >= 4) {
        randomOperator = operators[2];
    }


    //incase num2 is greater than num1 and there's a minus sign operator, exchange places of num1 and num2
    if (randomOperator == "-" && num2 > num1) {
        [num1, num2] = [num2, num1];
    }

    let solution = Function(`"use strict";return (${num1}${randomOperator}${num2})`)();
        

    //placing input at a random position
    //1 for num1, 2 for num2, 3 for result, 4 for operator

    let randomVar = randomValue(1,5);

    //no guess "operator" questions in level 4 and 5
    if (level >= 4) {
        randomVar = randomValue(1,4);
    }

    if (randomVar == 1) {
        operatorQuestion = false;
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`
    }
    else if (randomVar == 2) {
        operatorQuestion = false;
        answerValue = num2;
        question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`
    }
    else if (randomVar == 3) {
        operatorQuestion = false;
        answerValue = solution;
        question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`
        
    }
    else {
        //if its a operator question, then true
        operatorQuestion = true;
        answerValue = randomOperator;
        question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}` 
    }

    AnswerCheck();
};


//Answer Checking Function
const AnswerCheck = () => {

    

    //Checking User's Input
    submitBtn.addEventListener("click", ()=> {
        errorMessage.classList.add("hide");

        let userInput = document.getElementById("inputValue").value;

        //if user's input is not empty
        if (userInput != "") {

            //if user guessed correctly
            if (userInput == answerValue) {
                scoreVal++;

                switch (scoreVal) {
                    case 5:
                      level = 1;
                      break;
                    case 10:
                      level = 2;
                      break;
                    case 15:
                      level = 3;
                      break;
                    case 20:
                      level = 4;
                      break;
                    case 25:
                      level = 5;
                      break;
                  }

                score.innerText = `Score : ${scoreVal} - Level : ${level}`
                questionGenerator();
                //stopGame(`"You Won!" <span>Correct</span> Answer`);
            }

            //if user inputs operator other than +,-,*
            else if (operatorQuestion && !operators.includes(userInput)) {
                errorMessage.classList.remove("hide");
                errorMessage.innerHTML = "Please enter a valid operator"
            }

            //if user guessed wrong
            else {
                stopGame(`<span>Wrong Answer, Score: ${scoreVal}</span>`);
            }
        }

    });

};


//Starting the Game
startBtn.addEventListener("click", ()=> {

    //mainContainer.classList.remove("hide");
    scoreVal = 0;
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    
    
    //controls and buttons visibility
    controls.classList.add("hide");
    startBtn.classList.add("hide");
    score.classList.remove("hide");
    score.innertext = `score : 0  Level : 0`;
    questionGenerator();

});



//Stopping the Game
const stopGame = (resultText) => {
    result.innerHTML = resultText;
    startBtn.innerText = "Restart";
    //mainContainer.classList.add("hide");
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    score.classList.add("hide");
    level = 0;
}
