const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let time = 0;
let timer;
let currentDifficulty = 'easy';
let selectedQuestions = [];

const questions = {
    easy: [
    {
        question: "Le drapeau est constitué d'un fond blanc avec un disque rouge au centre.",
        answers: [
            { text: 'Japon', correct: true },
            { text: 'Vietnam', correct: false },
            { text: 'Tunisie', correct: false },
        ]
    },
    {
        question: "Le drapeau est consitué d'une bande rouge, une bande rouge et d'une bande rouge à la verticale avec au ventre une feuille d'érable rouge.",
        answers: [
            { text: 'Allemagne', correct: false },
            { text: 'Hollande', correct: false},
            { text: 'Canada', correct: true},
        ]
    },
    {
        question: "Le drapeau est constitué d'un fond rouge avec une étoile jaune en haut à gauche.",
        answers: [
            { text: 'Australie', correct: false},
            { text: 'Mexique', correct: false},
            { text: 'Chine', correct: true},
        ]
    },
    {
        question: "Le drapeau est consitué d'une croix jeune au centre, de 2 triangles verts et 2 triangles noir.",
        answers: [
            { text: 'Jamaique', correct: true},
            { text: 'Cuba', correct: false },
            { text: 'Belgique', correct: false},
        ]
    },
    {
        question: "Le drapeau est constitué de noir, de jaune et de rouge, les couleurs sont à la verticale.",
        answers: [
            { text: 'Allemagne', correct: false},
            { text: 'Bolivie', correct: false},
            { text: 'Belgique', correct: true},
        ]
    },
    {
        question: "Le drapeau est constiué de rouge, de jeune et de vert, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Bolivie', correct: true},
            { text: 'Estonie', correct: false},
            { text: 'Bénin', correct: false},
        ]
    },
    {
        question: "Le drapeau est constitué de vert, de blanc et de orange, les couleurs sont à la verticale.",
        answers: [
            { text: 'Inde', correct: false},
            { text: 'Irlande', correct: true},
            { text: 'Italie', correct: false},
        ]
    },
    {
        question: "Le drapeau est consitué de rouge et de blanc, les couleurs sont à l'horizontale.",
        answers: [
            { text: 'Indonésie', correct: true},
            { text: 'Iran', correct: false},
            { text: 'Laos', correct: false},
        ]
    },
    {
        question: "Le drapeau est constiué de rouge, de blanc et de vert.",
        answers: [
            { text: 'Colombie', correct: false},
            { text: 'Bulgarie', correct: false},
            { text: 'Hongrie', correct: true},
        ]
    },
    {
        question: "Le drapeau est constitué de rouge avec une croix blanche au centre.",
        answers: [
            { text: 'France', correct: false},
            { text: 'Suisse', correct: true},
            { text: 'Vietnam', correct: false},
        ]
    },
],

    medium: [
    {
        question: "Quel est la capitale de l'Espagne ?",
        answers: [
            { text: 'Madrid', correct: true},
            { text: 'Lisbonne', correct: false},
            { text: 'Berlin', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de la Suisse ?",
        answers: [
            { text: 'Bordeaux', correct: false},
            { text: 'Genève', correct: false},
            { text: 'Berne', correct: true},
        ]
    },
    {
        question: "Quel est la capitale de l'Angleterre?",
        answers: [
            { text: 'Liverpool', correct: false},
            { text: 'Londres', correct: true},
            { text: 'Manchester', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de l'Allemagne?",
        answers: [
            { text: 'Francfort', correct: false},
            { text: 'Berlin', correct: true},
            { text: 'Hambourg', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de l'Autriche ?",
        answers: [
            { text: 'Graz', correct: false},
            { text: 'Vienne', correct: true},
            { text: 'Linz', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de la Croatie ?",
        answers: [
            { text: 'Pozega', correct: false},
            { text: 'Zagreb', correct: true},
            { text: 'Vukovar', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de l'Australie ?",
        answers: [
            { text: 'Canberra', correct: true},
            { text: 'Melbourne', correct: false},
            { text: 'Mackay', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de l'Inde ?",
        answers: [
            { text: 'Cochin', correct: false},
            { text: 'New Delhi', correct: true},
            { text: 'Halda', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de la Pologne ?",
        answers: [
            { text: 'Varsovie', correct: true},
            { text: 'Wroclaw', correct: false},
            { text: 'Cracovie', correct: false},
        ]
    },
    {
        question: "Quel est la capitale de la Turquie ?",
        answers: [
            { text: 'Istanbul', correct: false},
            { text: 'Ankara', correct: true},
            { text: 'Bolu', correct: false},
        ]
    },
    ],

    hard: [
    {
        question: "Que ce passe t'il en France le premier mai ?",
        answers: [
            { text: 'Victoire de 1945', correct: false},
            { text: 'Fête du travail', correct: true},
            { text: 'Ascension', correct: false}, 
        ]
    },
    {
        question: "Quel roi de France a instauré l'édit de Nantes en 1598, mettant fin aux guerres de religion entre catholiques et protestants ?",
        answers: [
            { text: 'Henri IV', correct: true},
            { text: 'Louis XVI', correct: false},
            { text: 'Charles IX', correct: false},
        ]
    },
    {
        question: "Quel est le fleuve le plus logn de France ?",
        answers: [
            { text: 'La Seine', correct: false},
            { text: 'La Loire', correct: true},
            { text: 'Le Rhône', correct: false},
        ]
    },
    {
        question: "Quelle est la plus grande région française en termes de superficie ?",
        answers: [
            { text: 'La Nouvelle-Aquitaine', correct: true},
            { text: 'Centre-Val-De-Loire', correct: false},
            { text: 'Bretagne', correct: false},
        ]
    },
    {
        question: "Quel scientifique française est connu pour ses travaux sur la radioactivité a été la première femme à recevoir un prix Nobel ?",
        answers: [
            { text: 'Rosalyn Yalow', correct: false},
            { text: 'Marie Curie', correct: true},
            { text: 'Linda Brown Buck', correct: false},
        ]
    },
    {
        question: "Quel président français a amorcé la décolonisation de l'Algérie en 1962 ?",
        answers: [
            { text: 'Geoges Pompidou', correct: false},
            { text: 'François Mitterand', correct: false},
            { text: 'Charles de Gaulle', correct: true},
        ]
    },
    {
        question: "Quelle île française de l'océan Indien est célèbre pour son volcan actif, le Piton de la Fournaise ?",
        answers: [
            { text: 'La Réunion', correct: true},
            { text: 'La Guyane', correct: false},
            { text: 'La Martinique', correct: false},
        ]
    },
    {
        question: "Quel président français a instauré l'abolition de la peine de mort en 1981 ?",
        answers: [
            { text: 'François Mitterand', correct: true},
            { text: 'Charles de Gaulle', correct: false},
            { text: 'Georges Pompidou', correct: false},
        ]
    },
    {
        question: "Quelle femme est devenue la première ministre française en 1991 ?",
        answers: [
            { text: 'Elisabeth Borne', correct: false},
            { text: 'Edith Cresson', correct: true},
            { text: 'Martine Aubry', correct: false},
        ]
    },
    {
        question: "Qui est appelé le Roi Soleil ?",
        answers: [
            { text: 'Louis XIV', correct: true},
            { text: 'Henri IV', correct: false},
            { text: 'Charles IX', correct: false},
        ]
    },
    ],
};

function startQuiz() {
    console.log("Le script est chargé !");
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    score = 0;
    time = 0;
    nextButton.style.display = 'none';
    timerElement.innerHTML = `Temps: ${time}s`;

    // Sélectionner les questions pour la difficulté actuelle
    selectedQuestions = [...questions[currentDifficulty]];
    
    // Mélanger les questions
    selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random());

    // Démarrer le chronomètre
    startTimer();

    // Afficher la première question
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
    resetState();  // Réinitialiser l'état avant de montrer une nouvelle question
    const currentQuestion = selectedQuestions[currentQuestionIndex];
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
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        nextButton.innerText = 'Suivant';
    } else {
        nextButton.innerText = `Terminé - score: ${score}/${selectedQuestions.length}`;
        stopTimer();
        showNextLevelButton();
    }
}

function submitAnswer() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        // Code pour terminer le quiz ou afficher les résultats
        nextButton.innerText = `Terminé - score: ${score}/${selectedQuestions.length}`;
        stopTimer();
        showNextLevelButton();
    }
}


function addPenaltyTime() {
    time += 10;
    timerElement.innerHTML = `Temps: ${time}s`;
}

function showNextLevelButton() {
    const nextLevelButton = document.getElementById('next-level-btn');
    if ((currentDifficulty === 'easy' && questions['medium']) || 
        (currentDifficulty === 'medium' && questions['hard'])) {
        nextLevelButton.style.display = 'inline';
    }
}

function nextLevel() {
    if (currentDifficulty === 'easy') {
        currentDifficulty = 'medium';
    } else if (currentDifficulty === 'medium') {
        currentDifficulty = 'hard';
    }

    startQuiz(); // Recommencer le quiz avec le nouveau niveau
}

// Démarrer le quiz initialement
startQuiz();
