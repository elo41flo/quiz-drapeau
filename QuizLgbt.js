
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
    "easy": [
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
            { text: 'Lesbien', correct: false},
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
    ],

    "medium": [
    {
        question: "Je suis une femme et j'aime les femme, qui suis-je ?",
        answers: [
            { text: 'Lesbienne', correct: true},
            { text: 'Gay', correct: false},
            { text: 'Pansexuel', correct: false},
        ]
    },
    {
        question: "J'aime plusieurs personne à la fois, qui suis-je ?",
        answers: [
            { text: 'Mulisexuel', correct: false},
            { text: 'Omnisexuel', correct: false},
            { text: 'Polyamoureux', correct: true},
        ]
    },
    {
        question: "Je suis de sexe femme, mais je me sent homme, je suis ?",
        answers: [
            { text: 'Non-binaire', correct: false},
            { text: 'Transgenre FTM', correct: true},
            { text: 'Transgenre MTF', correct: false},
        ]
    },
    {
        question: "Je suis un homme et j'aime une personne pour son âme, je suis ?",
        answers: [
            { text: 'Bisexuel', correct: false},
            { text: 'Pansexuel', correct: true},
            { text: 'Gay', correct: false},
        ]
    },
    {
        question: "Je ne ressent pas le besoin d'avoir un rapport sexuel, je suis ?",
        answers: [
            { text: 'Aronmantique', correct: false},
            { text: 'Asexuel', correct: true},
            { text: 'Omnisexuel', correct: false},
        ]
    },
    {
        question: "Je n'ai pas le besoin d'être amoureux, qui suis-je ?",
        answers: [
            { text: 'Asexuel', correct: false},
            { text: 'Aromantique', correct: true},
            { text: 'Omnisexuel', correct: false},
        ]
    },
    {
        question: "Je ne me considère pas comme un humains, je suis ?",
        answers: [
            { text: 'Xénogenre', correct: true},
            { text: 'Transgenre FTM', correct: false},
            { text: 'Transgenre MTF', correct: false},
        ]
    },
    {
        question: "Je suis une femme qui aime à la fois les femmes et les hommes, je suis ?",
        answers: [
            { text: 'Lesbienne', correct: false},
            { text: 'Bisexuel', correct: true},
            { text: 'Asexuel', correct: false},
        ]
    },
    {
        question: "J'ai une malformation de naissance qui fait que j'ai à la fois les attributs d'une femme et ceux d'une homme, je suis ?",
        answers: [
            { text: 'Intersexe', correct: true},
            { text: 'Omnisexuel', correct: false},
            { text: 'Transgenre', correct: false},
        ]
    },
    {
        question: "Je ne me sent ni homme, ni femme, où les deux, je suis ?",
        answers: [
            { text: 'Xénogenre', correct: false},
            { text: 'Non-binaire', correct: true},
            { text: 'Trigenre', correct: false},
        ]
    },
    ],

    "hard": [
    {
        question: "Où c'est passé la première marche des fiertés dans le monde ?",
        answers: [
            { text: 'Paris', correct: false},
            { text: 'New York', correct: true},
            { text: 'Oslo', correct: false}, 
        ]
    },
    {
        question: "En quel année était la première marche des fiertés ?",
        answers: [
            { text: '1969', correct: true},
            { text: '1957', correct: false},
            { text: '1981', correct: false},
        ]
    },
    {
        question: "En quel année était la première marche des fiertés en France ?",
        answers: [
            { text: '1986', correct: false},
            { text: '1971', correct: true},
            { text: '1991', correct: false},
        ]
    },
    {
        question: "A l'origine, sur le tout premier drapeau LGBT, combien y avait-il de couleurs ?",
        answers: [
            { text: '8', correct: true},
            { text: '9', correct: false},
            { text: '5', correct: false},
        ]
    },
    {
        question: "Qui a créer le tout premier drapeau LGBT ?",
        answers: [
            { text: 'Harvey Milk', correct: false},
            { text: 'Gilbert Baker', correct: true},
            { text: 'Kye Rowan', correct: false},
        ]
    },
    {
        question: "Quel est le premier pays à avoir dépénalisé l'homosexualité ?",
        answers: [
            { text: 'Espagne', correct: false },
            { text: 'Russie', correct: false },
            { text: 'France', correct: true },
        ]
    },
    {
        question: "En quelle année la France a-t-elle dépénalisé l'homosexualité ?",
        answers: [
            { text: '1791', correct: true },
            { text: '1982', correct: false },
            { text: '1804', correct: false },
        ]
    },
    
    {
        question: "Quelles sont les lettres restantes après LGBT+ ?",
        answers: [
            { text: 'QIAA', correct: true},
            { text: 'QOAP', correct: false},
            { text: 'IAAO', correct: false},
        ]
    },
    {
        question: "Qui a fondé le mouveent LGBT ?",
        answers: [
            { text: 'Gilbert Baker', correct: false},
            { text: 'Magnus Hirschfeld', correct: true},
            { text: 'Kye Rowan', correct: false},
        ]
    },
    {
        question: "Le mouvement homosexuel à réllement fait son apparition au cours des émeutes de Stonewall à New York, en quelles année ?",
        answers: [
            { text: '1969', correct: true},
            { text: '1972', correct: false},
            { text: '1959', correct: false},
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
