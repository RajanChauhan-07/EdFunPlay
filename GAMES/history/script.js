// script.js

// List of 150 Indian history and 100 international history events
const quizData = [
    // Indian History (150 events)
    { year: "1526", event: "🏰 Babur establishes the Mughal Empire" },
    { year: "1600", event: "📜 East India Company is founded" },
    { year: "1757", event: "⚔️ Battle of Plassey" },
    { year: "1857", event: "⚔️ First War of Indian Independence" },
    { year: "1915", event: "🚂 Mahatma Gandhi returns to India from South Africa" },
    { year: "1919", event: "🔫 Jallianwala Bagh Massacre" },
    { year: "1920", event: "🚩 Non-Cooperation Movement" },
    { year: "1930", event: "🏞️ Dandi March" },
    { year: "1942", event: "🚩 Quit India Movement" },
    { year: "1947", event: "🇮🇳 India Gains Independence" },
    { year: "1950", event: "📜 Indian Constitution Comes into Effect" },
    { year: "1962", event: "⚔️ Indo-China War" },
    { year: "1971", event: "⚔️ India-Pakistan War & Bangladesh Liberation" },
    { year: "1991", event: "📉 Economic Liberalization in India" },
    { year: "1998", event: "💥 Pokhran Nuclear Tests" },
    { year: "2014", event: "🚀 Mars Orbiter Mission (Mangalyaan)" },
    { year: "2019", event: "🚀 Chandrayaan-2 Mission" },
    // Add 133 more Indian history events
    
    // International History (100 events)
    { year: "3000 BC", event: "🏺 Ancient Egypt begins" },
    { year: "776 BC", event: "🏛️ First Olympic Games in Greece" },
    { year: "476", event: "🏰 Fall of the Roman Empire" },
    { year: "1066", event: "⚔️ Battle of Hastings" },
    { year: "1215", event: "📜 Magna Carta Signed" },
    { year: "1492", event: "⛵ Columbus Discovers America" },
    { year: "1776", event: "📜 Declaration of Independence" },
    { year: "1789", event: "🇫🇷 French Revolution Begins" },
    { year: "1804", event: "👑 Napoleon Crowns Himself Emperor" },
    { year: "1865", event: "🕊️ End of American Civil War" },
    { year: "1914", event: "⚔️ Start of World War I" },
    { year: "1945", event: "☮️ End of World War II" },
    { year: "1969", event: "🌕 First Moon Landing" },
    { year: "1989", event: "🧱 Fall of Berlin Wall" },
    { year: "2001", event: "🏢 9/11 Attacks in USA" },
    { year: "2020", event: "🦠 COVID-19 Pandemic" }
    // Add 85 more international history events
];

// Shuffle function (Fisher-Yates Algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generate random wrong answers
function generateOptions(correctYear) {
    let years = quizData.map(q => q.year);
    let options = new Set();
    options.add(correctYear);
    
    while (options.size < 4) {
        let randomYear = years[Math.floor(Math.random() * years.length)];
        options.add(randomYear);
    }
    
    return Array.from(options).sort(); // Sort for better UX
}

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuizData = [...quizData];
shuffle(shuffledQuizData);
shuffledQuizData = shuffledQuizData.slice(0, 50); // Select 50 questions

// Load Question
function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuizData.length) {
        document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed!</h2><p>Your Final Score: ${score}</p>`;
        return;
    }

    let questionData = shuffledQuizData[currentQuestionIndex];
    document.getElementById("question").textContent = `When did this event happen? ${questionData.event}`;
    
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    let options = generateOptions(questionData.year);
    
    options.forEach(year => {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = year;
        btn.onclick = () => checkAnswer(btn, questionData.year);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("feedback").textContent = "";
}

// Check Answer
function checkAnswer(selectedBtn, correctYear) {
    let buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedBtn.textContent === correctYear) {
        selectedBtn.classList.add("correct");
        document.getElementById("feedback").textContent = "✅ Correct!";
        score += 10;
    } else {
        selectedBtn.classList.add("wrong");
        document.getElementById("feedback").textContent = `❌ Wrong! Correct Answer: ${correctYear}`;
        score -= 5;
    }

    document.getElementById("score").textContent = `Score: ${score}`;
}

// Load Next Question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Initialize Quiz
loadQuestion();