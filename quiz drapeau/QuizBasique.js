const questions = [
    {
        question: "Le drapeau est constitué de blanc, de bleu et de rouge, les couleurs sont à l'horizontale",
        answers: [
            { text: 'Russie', correct: true },
            { text: 'Portugal', correct: false },
            { text: 'Japon', correct: false },
        ]
    },
    {
        question: "Le drapeau est constitué de bleu, de jaune et de rouge, les couleurs sont à la verticale.",
        answers: [
            { text: 'Allemagne', correct: false },
            { text: 'Bulgarie', correct: false},
            { text: 'Roumanie', correct: true},
        ]
    },
    {
        question: "Le drapeau est constitué de blanc et il contient un rond rouge.",
        answers: [
            { text: 'Vietnam', correct: false},
            { text: 'Inde', correct: false},
            { text: 'Japon', correct: true},
        ]
    },
    {
        question: "Le drapeau contient une croix jaune, deux triangles verts et deux triangles noirs.",
        answers: [
            { text: 'Jamaïque', correct: true},
            { text: 'Cuba', correct: false },
            { text: 'Suède', correct: false},
        ]
    },
    {
        question: "Le drapeau contient du bleu et du jaune, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Belgique', correct: false},
            { text: 'Pologne', correct: false},
            { text: 'Ukraine', correct: true},
        ]
    },
    {
        question: "Le drapeau contient du rouge et il a une étoile jaune au centre.",
        answers: [
            { text: 'Vietnam', correct: true},
            { text: 'Iran', correct: false},
            { text: 'Chine', correct: false},
        ]
    },
    {
        question: "Le drapeau contient du vert, du blanc et de l'orange, les couleurs sont à la verticale.",
        answers: [
            { text: 'Hongrie', correct: false},
            { text: 'Irlande', correct: true},
            { text: 'Inde', correct: false},
        ]
    },
    {
        question: "Le drapeau contient du rouge et du blanc, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Indonésie', correct: true},
            { text: 'Monténégro', correct: false},
            { text: 'Slovaquie', correct: false},
        ]
    },
    {
        question: "Le drapeau contient du noir, du jaune et du rouge, les couleurs sont à la verticale.",
        answers: [
            { text: 'Monaco', correct: false},
            { text: 'Nigeria', correct: false},
            { text: 'Belgique', correct: true},
        ]
    },
    {
        question: "Le drapeau contient du bleu clair, du noir et du blanc, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Suède', correct: false},
            { text: 'Estonie', correct: true},
            { text: 'Luxembourg', correct: false},
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