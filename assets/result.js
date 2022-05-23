async function setData() {
    const request = new Request('/assets/quiz.json')
    const response = await fetch(request)
    data = await response.json()
    ques = data.ques
    console.log(ques)

    const request1 = new Request('/assets/selectedAns.json')
    const response1 = await fetch(request1)
    selectedAns = await response1.json()

    console.log(selectedAns)

    var quesWrong = []

    const reviewQues = document.querySelector(".reviewQuestions")

    for (let i = 0; i < data.quiz[0].count_ques; i += 1) {
        if (ques[i].ques_type == 'multichoice') {
            console.log(ques[i].right_ans, selectedAns[i])
            if ((ques[i].right_ans) !== (selectedAns[i])) {
                quesWrong.push({
                    count: i + 1,
                    question: ques[i],
                    selected: selectedAns[i]
                })
            }

        } else {
            console.log(ques[i].ans_text, selectedAns[i])
            if ((ques[i].ans_text) !== (selectedAns[i])) {
                quesWrong.push({
                    count: i + 1,
                    question: ques[i],
                    selected: selectedAns[i]
                })
            }
        }
    }

    console.log(quesWrong)

    const correct = document.querySelector('.correct')
    correct.innerText = ques.length - quesWrong.length
    const incorrect = document.querySelector('.incorrect')
    incorrect.innerText = ques.length

    const progress = document.querySelector(".progress")
    progress.max = ques.length
    progress.value = ques.length - quesWrong.length
    console.log(progress.max, progress.value)

    for (let i = 0; i < quesWrong.length; i += 1) {
        if (quesWrong[i].question.ques_type == 'multichoice') {
            reviewQues.innerHTML += `
            <div class="ques">
                <h2 class="ques-text">${quesWrong[i].count}. ${quesWrong[i].question.ques_text}</h2>
                <div class="box-ans">
                    <h4 class="ans${i}A">> ${quesWrong[i].question.ansA}</h4>
                    <h4 class="ans${i}B">> ${quesWrong[i].question.ansB}</h4>
                    <h4 class="ans${i}C">> ${quesWrong[i].question.ansC}</h4>
                    <h4 class="ans${i}D">> ${quesWrong[i].question.ansD}</h4>
                </div>
            </div>
            `
            const right = document.querySelector(".ans" + i + quesWrong[i].question.right_ans)
            const select = document.querySelector(".ans" + i + quesWrong[i].selected)

            right.classList.add('right-Ans')
            select.classList.add('wrong-Ans')
        } else {
            reviewQues.innerHTML += `
            <div class="ques">
                <h2 class="ques-text">${quesWrong[i].count}.  ${quesWrong[i].question.ques_text}</h2>
                <div class="box-ans">
                    <h4 >>Right Answer: ${quesWrong[i].question.ans_text}</h4>
                    <h4 >>Your Answer: ${quesWrong[i].selected}</h4>

                </div>
            </div>
            `
        }

    }

    const quiz = document.querySelector('.info-quiz')

    quiz.innerHTML = `
        <img src="https://media.istockphoto.com/vectors/quiz-game-icon-vector-outline-illustration-vector-id1214244508" alt="">
        <div class="left-quiz">
            <h1>${data.quiz[0].quiz_name}</h1>
            <h2>ques: ${data.quiz[0].count_ques}</h2>
            <h2>by: ${data.quiz[0].user_name}</h2>
        </div>
    `

    const playAgain = document.querySelector('.playAgain')
    playAgain.href = `/quiz?quiz_id=${ques[0].quiz_id}`
}

setData()