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
    {
        company: "Construcciones Garcia S.L.",
        job: "Albañil",
        options: [
            { text: "Convenio Colectivo del Sector de la Construcción", correct: true },
            { text: "Convenio Colectivo de la Industria Metálica", correct: false },
            { text: "Convenio Colectivo de la Industria Química", correct: false }
        ]
    },
    {
        company: "Clínica Dental Rodríguez",
        job: "Higienista Dental",
        options: [
            { text: "Convenio Colectivo de Clínicas Dentales", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Supermercados Lopez",
        job: "Cajero",
        options: [
            { text: "Convenio Colectivo de Comercio Minorista", correct: true },
            { text: "Convenio Colectivo de Hostelería", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Metalúrgica Castilla",
        job: "Operario de Producción",
        options: [
            { text: "Convenio Colectivo de la Industria Metálica", correct: true },
            { text: "Convenio Colectivo del Sector de la Construcción", correct: false },
            { text: "Convenio Colectivo de la Industria Química", correct: false }
        ]
    },
    {
        company: "Academia Formativa Canarias",
        job: "Profesor de Inglés",
        options: [
            { text: "Convenio Colectivo de la Enseñanza Privada", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Hostelería", correct: false }
        ]
    },
    {
        company: "Servicios de Limpieza Santa Cruz",
        job: "Limpiador",
        options: [
            { text: "Convenio Colectivo de Limpieza de Edificios", correct: true },
            { text: "Convenio Colectivo de Hostelería", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Transportes Alonso S.L.",
        job: "Conductor de Camión",
        options: [
            { text: "Convenio Colectivo de Transportes por Carretera", correct: true },
            { text: "Convenio Colectivo del Sector de la Construcción", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Granja Avícola La Esperanza",
        job: "Técnico Agrícola",
        options: [
            { text: "Convenio Colectivo del Sector Agrario", correct: true },
            { text: "Convenio Colectivo de la Industria Alimentaria", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Banco Canarias S.A.",
        job: "Administrativo",
        options: [
            { text: "Convenio Colectivo de Banca", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Pescadería La Mar",
        job: "Dependiente",
        options: [
            { text: "Convenio Colectivo de Comercio Minorista", correct: true },
            { text: "Convenio Colectivo de Hostelería", correct: false },
            { text: "Convenio Colectivo de Industrias Pesqueras", correct: false }
        ]
    },
    {
        company: "Fábrica de Quesos El Cabrero",
        job: "Operario de Producción",
        options: [
            { text: "Convenio Colectivo de la Industria Alimentaria", correct: true },
            { text: "Convenio Colectivo del Sector Agrario", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Gráficas Tenerife",
        job: "Diseñador Gráfico",
        options: [
            { text: "Convenio Colectivo del Sector de Artes Gráficas", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Centro Deportivo Las Palmas",
        job: "Monitor de Gimnasio",
        options: [
            { text: "Convenio Colectivo de Instalaciones Deportivas", correct: true },
            { text: "Convenio Colectivo de Hostelería", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Automecánica Pérez",
        job: "Mecánico",
        options: [
            { text: "Convenio Colectivo del Metal", correct: true },
            { text: "Convenio Colectivo del Sector de la Construcción", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Librería La Casa del Libro",
        job: "Dependiente",
        options: [
            { text: "Convenio Colectivo de Comercio Minorista", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Hostelería", correct: false }
        ]
    },
    {
        company: "Escuela Infantil Los Pequeños",
        job: "Educador Infantil",
        options: [
            { text: "Convenio Colectivo de Centros de Educación Infantil", correct: true },
            { text: "Convenio Colectivo de Enseñanza Privada", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Consultoría Fiscal ABC",
        job: "Asesor Fiscal",
        options: [
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: true },
            { text: "Convenio Colectivo de Consultoras Jurídicas", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Farmacia Salud y Bienestar",
        job: "Técnico de Farmacia",
        options: [
            { text: "Convenio Colectivo de Oficinas de Farmacia", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Centro Comercial Atlántico",
        job: "Vigilante de Seguridad",
        options: [
            { text: "Convenio Colectivo de Empresas de Seguridad Privada", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Agencia de Viajes El Mundo",
        job: "Agente de Viajes",
        options: [
            { text: "Convenio Colectivo de Agencias de Viaje", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Jardinería Las Palmeras",
        job: "Jardinero",
        options: [
            { text: "Convenio Colectivo de Jardinería", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Hostelería", correct: false }
        ]
    },
    {
        company: "Estudio de Arquitectura Omega",
        job: "Arquitecto",
        options: [
            { text: "Convenio Colectivo de Oficinas Técnicas y Estudios de Arquitectura", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo del Sector de la Construcción", correct: false }
        ]
    },
    {
        company: "Centro de Estética Bella",
        job: "Esteticista",
        options: [
            { text: "Convenio Colectivo de Peluquerías y Estética", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Fundación Ayuda Canarias",
        job: "Trabajador Social",
        options: [
            { text: "Convenio Colectivo de Intervención Social", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Plataforma Logística S.L.",
        job: "Mozo de Almacén",
        options: [
            { text: "Convenio Colectivo de Logística y Almacenes", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Grupo Hotelero Mediterráneo",
        job: "Gobernanta",
        options: [
            { text: "Convenio Colectivo de Hostelería", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Empresa de Transporte Urgente",
        job: "Repartidor",
        options: [
            { text: "Convenio Colectivo de Transporte de Mercancías", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Centro de Investigación Médica Alfa",
        job: "Investigador Científico",
        options: [
            { text: "Convenio Colectivo de Investigación y Desarrollo", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Agencia de Publicidad Creativa",
        job: "Redactor Publicitario",
        options: [
            { text: "Convenio Colectivo de Publicidad", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Productora Audiovisual Visionarios",
        job: "Editor de Vídeo",
        options: [
            { text: "Convenio Colectivo de Producción Audiovisual", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Asesoría Jurídica López y Asociados",
        job: "Abogado",
        options: [
            { text: "Convenio Colectivo de Despachos de Abogados", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Taller de Muebles El Roble",
        job: "Ebanista",
        options: [
            { text: "Convenio Colectivo de la Madera", correct: true },
            { text: "Convenio Colectivo del Metal", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Gimnasio Fuerza y Control",
        job: "Entrenador Personal",
        options: [
            { text: "Convenio Colectivo de Instalaciones Deportivas", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Residencia de Ancianos Los Abuelos",
        job: "Cuidador",
        options: [
            { text: "Convenio Colectivo de Atención a Personas Dependientes", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Hostelería", correct: false }
        ]
    },
    {
        company: "Restaurante Vegano Tierra Verde",
        job: "Cocinero",
        options: [
            { text: "Convenio Colectivo de la Hostelería", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Empresa de Telecomunicaciones Altavoz",
        job: "Técnico de Telecomunicaciones",
        options: [
            { text: "Convenio Colectivo de Telecomunicaciones", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Aerolíneas Canarias",
        job: "Azafata de Vuelo",
        options: [
            { text: "Convenio Colectivo de Transporte Aéreo", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Suministros Industriales del Atlántico",
        job: "Comercial",
        options: [
            { text: "Convenio Colectivo de Comercio al Por Mayor", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Servicios Informáticos Canarias",
        job: "Programador",
        options: [
            { text: "Convenio Colectivo de Consultoras de Tecnologías de la Información", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Productores Agrícolas Los Verdes",
        job: "Ingeniero Agrónomo",
        options: [
            { text: "Convenio Colectivo del Sector Agrario", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Corporación Energética Isla Verde",
        job: "Técnico en Energías Renovables",
        options: [
            { text: "Convenio Colectivo de Energías Renovables", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Naviera del Atlántico",
        job: "Marinero",
        options: [
            { text: "Convenio Colectivo del Sector Marítimo", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Minería Nacional S.A.",
        job: "Minero",
        options: [
            { text: "Convenio Colectivo del Sector de la Minería", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Correos y Telégrafos",
        job: "Cartero",
        options: [
            { text: "Convenio Colectivo de Correos", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Parque de Atracciones Isla Mágica",
        job: "Operador de Atracciones",
        options: [
            { text: "Convenio Colectivo de Ocio y Entretenimiento", correct: true },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false }
        ]
    },
    {
        company: "Centro Médico Santa Elena",
        job: "Enfermero",
        options: [
            { text: "Convenio Colectivo de Sanidad Privada", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Estudio de Fotografía Luminoso",
        job: "Fotógrafo",
        options: [
            { text: "Convenio Colectivo de Artes Gráficas", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    },
    {
        company: "Editorial Mundo Literario",
        job: "Corrector de Textos",
        options: [
            { text: "Convenio Colectivo de Editoriales", correct: true },
            { text: "Convenio Colectivo de Oficinas y Despachos", correct: false },
            { text: "Convenio Colectivo de Comercio Minorista", correct: false }
        ]
    }
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
    restartButton.style.display = 'none';
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    scoreElement.textContent = score;
    
    shuffleArray(cases); // Barajar las preguntas
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    startTimer();
    const currentCase = cases[currentQuestionIndex];
    companyInfo.textContent = currentCase.company;
    jobInfo.textContent = `Puesto de trabajo: ${currentCase.job}`;
    
    shuffleArray(currentCase.options); // Barajar las respuestas
    
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
    restartButton.style.display = 'block';
    finalResult.textContent = `¡Juego terminado! Has acertado ${correctAnswers} de ${cases.length} convenios.`;
    finalScore.textContent = `Tu puntuación final es: ${score} puntos.`;
}

function restartGame() {
    resultContainer.style.display = 'none';
    startButton.style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
