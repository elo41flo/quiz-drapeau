const questions = [
    {
        question: "Le drapeau est constitué de rose, de violet et bleu, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Bisexuel', correct: true },
            { text: 'Pansexuel', correct: false },
            { text: 'Transgenre', correct: false },
        ]
    },
    {
        question: "Le drapeau est constitué de noir, de gris, de blanc et de violet, les couleurs sont à la l'horizontale.",
        answers: [
            { text: 'Intersexe', correct: false },
            { text: 'Pansexuel', correct: false},
            { text: 'asexuel', correct: true},
        ]
    },
    {
        question: "Le drapeau est constitué de jaune et il contient un cercle violet.",
        answers: [
            { text: 'Lesbienne', correct: false},
            { text: 'Genderqueer', correct: false},
            { text: 'Intersexe', correct: true},
        ]
    },
    {
        question: "Le drapeau est constiué de gris foncé, de gris clair, de jaune, de blanc, de jaune, de gris clair et de gris foncé, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Demigenres', correct: true},
            { text: 'Demiboy', correct: false },
            { text: 'Demigirl', correct: false},
        ]
    },
    {
        question: "Le drapeau est constitué de noir, de gris, de rose, de jaune et de bleu, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Lesbien', correct: false},
            { text: 'Transgenre', correct: false},
            { text: 'Polygenre', correct: true},
        ]
    },
    {
        question: "Le drapeau est constiué de violet, de blanc et de vert, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Genderqueer', correct: true},
            { text: 'Genderfluid', correct: false},
            { text: 'Agenre', correct: false},
        ]
    },
    {
        question: "Le drapeau est constitué de bleu, de rose, de blanc, de rose et de bleu, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Asexuel', correct: false},
            { text: 'Trangenre', correct: true},
            { text: 'Aromantique', correct: false},
        ]
    },
    {
        question: "Le drapeau est consitué de rose, de vert et de bleu, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Polysexuel', correct: true},
            { text: 'Polyamour', correct: false},
            { text: 'Non-binaire', correct: false},
        ]
    },
    {
        question: "Le drapeau est constiué de jaune, de blanc de violet et de noir, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Trigenre', correct: false},
            { text: 'Pangenre', correct: false},
            { text: 'Non-binaire', correct: true},
        ]
    },
    {
        question: "Le drapeau est constitué de violet de blanc de bleu et de rose, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Omnisexuel', correct: false},
            { text: 'Multisexuel', correct: true},
            { text: 'Polysexuel', correct: false},
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let time = 0;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    time = 0;
    shuffleArray(questions); // Mélanger les questions au début du quiz
    nextButton.innerHTML = 'Suivant';
    nextButton.style.display = 'none'; // Hide the button at the start
    timerElement.innerHTML = `Temps: ${time}s`;
    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerElement.innerHTML = `Temps: ${time}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        addPenaltyTime();
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    nextButton.style.display = 'block';
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.innerText = 'Suivant';
    } else {
        nextButton.innerText = `Terminé - score: ${score}/${questions.length}`;
        stopTimer();
    }
}

function addPenaltyTime() {
    time += 10;
    timerElement.innerHTML = `Temps: ${time}s`;
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        startQuiz();
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startQuiz();