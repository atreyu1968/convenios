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
    // Añade más casos aquí
];

startButton.addEventListener('click', startGame);
continueButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < cases.length) {
        setNextQuestion();
    } else {
        endGame();
    }
});

function startGame() {
    startButton.style.display = 'none';
    gameContainer.style.display = 'block';
    scoreContainer.style.display = 'block';
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    const currentCase = cases[currentQuestionIndex];
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
    feedback.textContent = '';
    feedback.classList.remove('correct', 'wrong');
    continueButton.style.display = 'none';
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
    resetTimer();
}

function selectAnswer(correct) {
    clearInterval(timerInterval); // Detener el temporizador cuando se selecciona una respuesta
    if (correct) {
        feedback.textContent = "¡Correcto!";
        feedback.classList.add('correct');
        score += 10; // Sumar puntos por respuesta correcta
        correctAnswers++;
    } else {
        feedback.textContent = "¡Incorrecto!";
        feedback.classList.add('wrong');
        score -= 5; // Restar puntos por respuesta incorrecta
    }
    scoreElement.textContent = score; // Actualizar puntuación en pantalla
    continueButton.style.display = 'block'; // Mostrar botón "Continuar"
}

function startTimer() {
    timeLeft = 30; // Tiempo por pregunta
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(false); // Si el tiempo se acaba, cuenta como incorrecto
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval); // Detener cualquier temporizador activo
    startTimer(); // Reiniciar el temporizador
}

function endGame() {
    gameContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalResult.textContent = `¡Juego terminado! Has acertado ${correctAnswers} de ${cases.length} convenios.`;
    finalScore.textContent = `Tu puntuación final es: ${score} puntos.`;
}
