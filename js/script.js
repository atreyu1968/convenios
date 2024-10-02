const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('game');
const companyInfo = document.getElementById('company-info');
const jobInfo = document.getElementById('job-info');
const choicesContainer = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const continueButton = document.getElementById('continueButton');
const resultContainer = document.getElementById('result');
const finalResult = document.getElementById('final-result');
const finalScore = document.getElementById('final-score');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const scoreContainer = document.getElementById('scoreContainer');
const restartButton = document.getElementById('restartButton');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const cases = [
    {
        company: "Restaurante La Palma",
        job: "Camarero",
        options: [
            { text: "Convenio Colectivo de la Hostelería", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Hotel Sol Tenerife",
        job: "Recepcionista",
        options: [
            { text: "Convenio Colectivo de Hostelería", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    // Añade los otros 48 casos aquí siguiendo el mismo formato
];

// Eventos
startButton.addEventListener('click', startGame);
continueButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < cases.length) {
        setNextQuestion();
    } else {
        endGame();
    }
});
restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.style.display = 'none';
    resultContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    scoreContainer.style.display = 'block';
    restartButton.style.display = 'none'; // Ocultar botón de reinicio al comenzar el juego
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    scoreElement.textContent = score;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    startTimer(); // Iniciar el temporizador con cada nueva pregunta
    const currentCase = cases[currentQuestionIndex];
    console.log(currentCase); // Verificar qué pregunta se está cargando
    companyInfo.textContent = currentCase.company;
    jobInfo.textContent = `Puesto de trabajo: ${currentCase.job}`;
    currentCase.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => selectAnswer(option.correct));
        choicesContainer.appendChild(button);
    });
}

function resetState() {
    clearInterval(timerInterval);
    feedback.textContent = '';
    feedback.classList.remove('correct', 'wrong');
    continueButton.style.display = 'none';
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
    timeLeft = 30;
    timerElement.textContent = timeLeft;
}

function selectAnswer(correct) {
    clearInterval(timerInterval);
    Array.from(choicesContainer.children).forEach(button => {
        button.disabled = true;
    });
    if (correct) {
        feedback.textContent = "¡Correcto!";
        feedback.classList.add('correct');
        score += 10;
        correctAnswers++;
    } else {
        feedback.textContent = "¡Incorrecto!";
        feedback.classList.add('wrong');
        score -= 5;
    }
    scoreElement.textContent = score;
    continueButton.style.display = 'block';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(false);
        }
    }, 1000);
}

function endGame() {
    gameContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    restartButton.style.display = 'block'; // Mostrar el botón de reinicio
    finalResult.textContent = `¡Juego terminado! Has acertado ${correctAnswers} de ${cases.length} convenios.`;
    finalScore.textContent = `Tu puntuación final es: ${score} puntos.`;
}

function restartGame() {
    resultContainer.style.display = 'none';
    startButton.style.display = 'block';
}
