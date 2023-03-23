let numbersArr = []
let randomNumber = 0

//*GERA O ARRAY DE NÚMEROS QUE DEVE SER DESCOBERTO PELO JOGADOR
const generateNumbersArr = () => {
    for (let i = 0; i < 10; i++) {
        randomNumber = Math.random().toFixed(1) * 10

        if (randomNumber == 10) {
            randomNumber = 9
        }
        numbersArr = [...numbersArr, randomNumber]
    }
    console.log(numbersArr)
}

generateNumbersArr()

//*DEFINIÇÃO DAS VARIÁVEIS
const $attempts = document.querySelector('.attempts')
const $inputs = document.querySelectorAll('.input')
const $formInput = document.querySelector('.formInput')
const $sendBtn = document.querySelector('.send-btn')
const $endGameContainer = document.querySelector('.end-game-container')
const $endGameMessage = document.querySelector('.end-game-container p')
const $tryAgainBtn = document.querySelector('.try-again-btn')
const $latestAttemptsContainer = document.querySelector('.latest-attempts-container')
const $correctAnswer = document.querySelector('.correct-answer')
let answersArr = []
let attempt = 5
let points = 0
let allRight = false

$attempts.innerHTML = attempt

//*9 - REINICIAR O JOGO
$tryAgainBtn.addEventListener('click', () => {
    window.location.reload()
})

//*8 - MOSTRA NA TELA A RESPOSTA CORRETA
const showCorrectAnswer = () => {
    
    numbersArr.forEach(number => {
        let span = document.createElement('span')
        span.innerHTML = number
        $correctAnswer.appendChild(span)
    })
    $correctAnswer.classList.remove('is-hidden')
}

//* 7 - ESCOLHE E MOSTRA AS MENSAGENS DO FIM DE JOGO  
const setEndGameMessages = () => {
    if (points == 0) {
        $endGameMessage.innerText = `Sério? ${points} pontos? Vamos lá, você pode fazer melhor que isso.`
    } else if (points > 0 && points < 6) {
        $endGameMessage.innerText = `Só ${points} ponto(s)? ainda tá bem ruinzinho. Dá pra melhorar.`
    } else if (points > 5 && points < 10) {
        $endGameMessage.innerText = `${points} pontos. Mais um pouco de treino e você vai ficar bom igual a mim.`
    } else if (points == 10) {
        $endGameMessage.innerText = `Caramba, ${points} pontos. Pode ir lá no banheiro se limpar, seu cagão.`
    }
    $endGameContainer.classList.toggle('is-hidden')

    showCorrectAnswer()
}

//*6 - CHECA QUANTOS NÚMEROS O JOGADOR ACERTOU MOSTRA A TELA FINAL
const finishGame = () => {
    attempt = attempt - 1
    $attempts.innerHTML = attempt

    //*TROCA OS BOTÕES DE AÇÃO
    $tryAgainBtn.classList.toggle('is-hidden')
    $sendBtn.classList.toggle('is-hidden')

    //*DESABILITA OS INPUTS E FAZ A CONTAGEM DOS PONTOS
    $inputs.forEach(input => {
        if (!input.value == '') {
            points = points + 1
        }
        input.setAttribute('disabled', 'disabled')
    })

    setEndGameMessages()
}

//*5 - CHECA QUANTAS TENTATIVAS O JOGADOR AINDA TEM
const checkAttempt = () => {

    //*FAZ UM CONTROLE DE PONTOS PARA SABER SE O JOGADOR ACERTOU TODOS OS NÚMEROS
    let i = 0
    $inputs.forEach(input => {
        if (input.value != '') {
            i = i + 1
        }
    })
    if (i == 10) {
        allRight = true
    }

    //*CHECA QUANTAS TENTATIVAS O JOGADOR AINDA TEM E DECIDE SE FINALIZA OU NÃO O JOGO 
    if (attempt == 1 || allRight == true) {
        finishGame()
    } else {
        attempt = attempt - 1
        $attempts.innerHTML = attempt
    }
}

//*4 - COMPARA AS RESPOSTAS COM O ARRAY DE NÚMEROS GERADOS
const checkAnswers = () => {
    for (let i = 0; i < numbersArr.length; i++) {

        if (numbersArr[i] == answersArr[i]) {
            $inputs[i].classList.add('is-correct')
            $inputs[i].setAttribute('disabled', 'disabled')
        } else {
            $inputs[i].value = ''
        }
    }
}

//*3 - MOSTRA NA TELA AS ÚLTIMAS TENTATIVAS
const showLatestAttempts = () => {
    let div = document.createElement('div')
    $latestAttemptsContainer.appendChild(div)
    $inputs.forEach(input => {
        let span = document.createElement('span')
        span.innerHTML = input.value
        div.appendChild(span)
    })

    checkAnswers()
}

//*2 - PEGA OS NÚMEROS DOS INPUTS E SALVA NO ARRAY
const getAnswers = () => {
    answersArr = []
    $inputs.forEach(input => {
        answersArr = [...answersArr, input.value]
    })
    console.log(answersArr)

    showLatestAttempts()
}

//*1 - FUNÇÃO CHAMADA QUANDO A RESPOSTA É ENVIADA
$formInput.addEventListener('submit', (e) => {
    e.preventDefault()

    $sendBtn.setAttribute('disabled', 'disabled')
    $sendBtn.classList.add('disabled')

    getAnswers()
    checkAttempt()

    $sendBtn.removeAttribute('disabled', 'disabled')
    $sendBtn.classList.remove('disabled')
})
