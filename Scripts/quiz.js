const questions = [
    {
        question: "¿Cuál es el nombre del reno de nariz roja?",
        answers: ["Rudolf", "Dasher", "Blitzen"],
        correct: 0
    },
    {
        question: "¿Qué día se celebra la Navidad?",
        answers: ["24 de Diciembre", "25 de Diciembre", "31 de Diciembre"],
        correct: 1
    },
    {
        question: "¿Quién trae los regalos en Navidad según la tradición?",
        answers: ["Papá Noel", "El Grinch", "El Conejo de Pascua"],
        correct: 0
    },
    {
        question: "¿Qué planta se besan las personas debajo de ella en Navidad?",
        answers: ["Muérdago", "Rosa", "Tulipán"],
        correct: 0
    },
    {
        question: "¿Qué bebida es tradicional en Navidad?",
        answers: ["Cerveza", "Vino caliente", "Refresco"],
        correct: 1
    },
    {
        question: "¿Qué animal se asocia con la Navidad?",
        answers: ["Reno", "Conejo", "Gato"],
        correct: 0
    },
    {
        question: "¿Qué adorno se pone en la punta del árbol de Navidad?",
        answers: ["Estrella", "Bola", "Campana"],
        correct: 0
    },
    {
        question: "¿Qué dulce es típico en Navidad?",
        answers: ["Turrón", "Helado", "Galletas"],
        correct: 0
    },
    {
        question: "¿Qué color es típico de la Navidad?",
        answers: ["Rojo", "Azul", "Amarillo"],
        correct: 0
    },
    {
        question: "¿Qué se celebra el 6 de enero?",
        answers: ["Reyes Magos", "Nochebuena", "Año Nuevo"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

selectedQuestions = getRandomQuestions();

const questionElement = document.getElementById('question');
const scoreElement = document.getElementById('score');
const answersContainer = document.getElementById('answers-container');

function loadQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('.answer');

    buttons.forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'red';
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
        scoreElement.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            loadQuestion();
        } else {
            alert('Quiz terminado! Tu puntuación es: ' + score);
            // Reiniciar el quiz
            currentQuestionIndex = 0;
            score = 0;
            scoreElement.textContent = score;
            selectedQuestions = getRandomQuestions();
            loadQuestion();
        }
    }, 2000);
}

loadQuestion();