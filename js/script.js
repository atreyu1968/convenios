const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('game');
const questionContainer = document.getElementById('question-container');
const companyInfo = document.getElementById('company-info');
const jobInfo = document.getElementById('job-info');
const choicesContainer = document.getElementById('choices');
const nextButton = document.getElementById('nextButton');
const resultContainer = document.getElementById('result');
const finalResult = document.getElementById('final-result');

let currentQuestionIndex = 0;
let correctAnswers = 0;

const cases = [
  {
    company: "Empresa de Servicios XYZ",
    job: "Recepcionista",
    options: [
      { text: "Convenio de Hostelería", correct: false },
      { text: "Convenio de Oficinas y Despachos", correct: true },
      { text: "Convenio de Comercio", correct: false }
    ]
  },
  {
    company: "Fábrica de Alimentos ABC",
    job: "Operario de Producción",
    options: [
      { text: "Convenio de la Industria Alimentaria", correct: true },
      { text: "Convenio de la Construcción", correct: false },
      { text: "Convenio de Limpieza", correct: false }
    ]
  }
  // Puedes añadir más casos aquí
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
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
  setNextQuestion();
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
  nextButton.style.display = 'none';
  while (choicesContainer.firstChild) {
    choicesContainer.removeChild(choicesContainer.firstChild);
  }
}

function selectAnswer(correct) {
  if (correct) {
    correctAnswers++;
  }
  nextButton.style.display = 'block';
}

function endGame() {
  gameContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  finalResult.textContent = `Has acertado ${correctAnswers} de ${cases.length} convenios colectivos.`;
}

