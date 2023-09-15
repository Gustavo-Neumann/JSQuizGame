const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const qtdError = document.querySelector('#qtdError')

finalScore.innerText = `Pontuação = ${mostRecentScore}`

qtdError.innerText = `Erros = ${10 - mostRecentScore}`
