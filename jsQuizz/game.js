const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const imgQ = document.querySelector('#img'); 
const imgQ2 = document.querySelector('#img01');
const rightAnswer = document.querySelector('#rightAnswer');

let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
    question:
    "0",
    choice1: "0",
    choice2: "0",
    choice3: "0",
    choice4: "0",
    answer: 1,
    },
    {
        question: 'De que jogo esta imagem foi retirada?',
        imgQ: imgQ.src = 'images/imageQuestion.jpg',
        choice1: 'Point Blank',
        choice2: 'Counter Strike: Global Offensive',
        choice3: 'Crossfire',
        choice4: 'Call of Duty',
        answer: 2,
    },
    {
        question: "Qual mitologia pertence o jogo God Of War 4?",
        choice1: "Mitologia Grega",
        choice2: "Mitologia Nórdica",
        choice3: "Mitologia Romana",
        choice4: "Mitologia Egípicia",
        answer: 2,
    },
    {
        question: "Qual o jogo dessa imagem?",
        imgQ2: imgQ2.src = 'images/imageQuestion01.jpg',
        choice1: "Dota2",
        choice2: "Heartstone",
        choice3: "League of Legends",
        choice4: "Heroes of the storm",
        answer: 3,
    },
    {
        question: "A franquia Rockstar é responsável por qual jogo abaixo?",
        choice1: "Grand Theft Auto",
        choice2: "Skate 3",
        choice3: "Minecraft",
        choice4: "Fifa 21",
        answer: 1,
    },
    {
        question: "Qual jogo abaixo a desenvolvedora Naughty Dog não é responsável?",
        choice1: "The Last of Us",
        choice2: "Uncharted",
        choice3: "Red Dead Redemption",
        choice4: "Crash Bandicoot",
        answer: 3,
    },
    {
        question: "Qual dessas franquias de jogo é a mais vendida?",
        choice1: "Tetris",
        choice2: "Pokemón",
        choice3: "Call of Duty",
        choice4: "Mario",
        answer: 4,
    },
    {
        question: "Quem foi o streamer brasileiro mais assistido de 2021?",
        choice1: "Alanzoka",
        choice2: "Nobru",
        choice3: "Casemiro",
        choice4: "Gaules",
        answer: 4,
    },
    {
        question: "Qual o console mais vendido no mundo em 2021?",
        choice1: "Xbox Series X/S",
        choice2: "Playstation 5",
        choice3: "Nintendo Switch",
        choice4: "Playstation 4",
        answer: 1,
    },
    {
        question: "Qual é a franquia de jogos de futebol mais vendida?",
        choice1: "Pro Evolution Soccer",
        choice2: "Fifa",
        choice3: "Bomba Batch",
        choice4: "Ronaldinho Soccer 64",
        answer: 2,
    },
    {
        question: "O personagem Liu Kang é de qual jogo?",
        choice1: "Street Fighter",
        choice2: "Mortal Kombat",
        choice3: "Injustice",
        choice4: "Tekken",
        answer: 2,
    },

]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10


startGame = () => {
    questionCounter = 1
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }


    progressText.innerText = `Pergunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = questionCounter
    currentQuestion = questions[questionsIndex]
    question.innerText = currentQuestion.question



    if(questionsIndex === 1)
    imgQ.style.display = 'block'
    else
    imgQ.style.display = 'none'
    
    if(questionsIndex === 3)
    imgQ2.style.display = 'block'
    else
    imgQ2.style.display = 'none'


    questionCounter++

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    
    
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

    
}

choices.forEach(choice => {

    choice.addEventListener('mouseover', e => {
        let correctAudio = new Audio("sfx/hoverSound.wav");
            correctAudio.play();
    })

    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            let correctAudio = new Audio("sfx/correctAnswer.wav");
            correctAudio.play();
        }
        if(classToApply === 'incorrect'){
            let incorrectAudio = new Audio("sfx/wrongAnswer.wav");
            incorrectAudio.play();
            
        }
        
        
        

        rightAnswer.innerText = `A resposta correta é = ${currentQuestion.answer}`

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            rightAnswer.innerText = `A resposta correta é = `
            getNewQuestion()

        }, 2000)
        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()