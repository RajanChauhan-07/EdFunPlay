const animals = [
    { name: 'Dog', sound: 'sounds/dog-bark.mp3', image: 'images/dog.png' },
    { name: 'Cat', sound: 'sounds/cat-meow.mp3', image: 'images/cat.png' },
    { name: 'Cow', sound: 'sounds/cow-moo.mp3', image: 'images/cow.png' },
    { name: 'Lion', sound: 'sounds/lion-roar.mp3', image: 'images/lion.png' },
    { name: 'Duck', sound: 'sounds/duck-quack.mp3', image: 'images/duck.png' },
    { name: 'Sheep', sound: 'sounds/sheep-baa.mp3', image: 'images/sheep.png' }
];

let currentAnimal = null;
let score = 0;

const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restartGame');
const playSoundButton = document.getElementById('playSound');
const nextQuestionButton = document.getElementById('nextQuestion');
const optionsDiv = document.getElementById('options');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
playSoundButton.addEventListener('click', playSound);
nextQuestionButton.addEventListener('click', setNextAnimal);

function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    playSoundButton.style.display = 'inline-block';
    nextQuestionButton.style.display = 'inline-block';
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    setNextAnimal();
}

function restartGame() {
    feedback.textContent = '';
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    setNextAnimal();
}

function playSound() {
    if (currentAnimal) {
        const audio = new Audio(currentAnimal.sound);
        audio.play();
    }
}

function setNextAnimal() {
    feedback.textContent = '';
    currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    optionsDiv.innerHTML = '';

    animals.forEach(animal => {
        const img = document.createElement('img');
        img.src = animal.image;
        img.alt = animal.name;
        img.addEventListener('click', () => checkAnswer(animal.name));
        optionsDiv.appendChild(img);
    });
}

function checkAnswer(selected) {
    if (selected === currentAnimal.name) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'green';
        score++;
    } else {
        feedback.textContent = 'Try Again! ❌';
        feedback.style.color = 'red';
    }
    scoreDisplay.textContent = 'Score: ' + score;
}
