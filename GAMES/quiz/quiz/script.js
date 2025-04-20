// gk_quiz.js (Folder: quiz)

document.addEventListener("DOMContentLoaded", setupGame);

// Full list of 100 General Knowledge (GK) questions
const gkQuestions = [
    { question: "Who wrote the national anthem of India?", answer: "Rabindranath Tagore", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subhash Chandra Bose"] },
    { question: "What is the capital of Japan?", answer: "Tokyo", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"] },
    { question: "Which planet is known as the Red Planet?", answer: "Mars", options: ["Earth", "Venus", "Jupiter", "Mars"] },
    { question: "Who discovered gravity?", answer: "Isaac Newton", options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"] },
    { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean", options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"] },
    // Add 95 more GK questions here
];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestionIndex = 0;
let score = 0;
let difficulty = "Easy";
let shuffledQuestions = [];

function startQuiz(selectedDifficulty) {
    difficulty = selectedDifficulty;
    shuffledQuestions = [...gkQuestions];
    shuffle(shuffledQuestions);
    shuffledQuestions = shuffledQuestions.slice(0, 25); // Select 25 questions per session
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById("question-container").style.display = "block";
    document.getElementById("difficulty-selection").style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed!</h2><p>Your Final Score: ${score}</p>`;
        return;
    }

    let questionData = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionData.options.forEach(option => {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, questionData.answer);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("feedback").textContent = "";
}

function checkAnswer(selectedBtn, correctAnswer) {
    let buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedBtn.textContent === correctAnswer) {
        selectedBtn.classList.add("correct");
        document.getElementById("feedback").textContent = "✅ Correct!";
        score += 10;
    } else {
        selectedBtn.classList.add("wrong");
        document.getElementById("feedback").textContent = `❌ Wrong! Correct Answer: ${correctAnswer}`;
        score -= 5;
    }

    document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed!</h2><p>Your Final Score: ${score}</p>`;
    }
}

function setupGame() {
    document.getElementById("quiz-container").innerHTML = `
        <h1>General Knowledge Quiz</h1>
        <div id="difficulty-selection">
            <h2>Select Difficulty</h2>
            <button onclick="startQuiz('Easy')">Easy</button>
            <button onclick="startQuiz('Medium')">Medium</button>
            <button onclick="startQuiz('Hard')">Hard</button>
        </div>
        <div id="question-container" style="display: none;">
            <h3 id="question"></h3>
            <div id="options"></div>
            <p id="feedback"></p>
            <button onclick="nextQuestion()">Next</button>
        </div>
        <p id="score">Score: 0</p>
    `;
}
