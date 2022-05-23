
const quizItems = document.querySelector(".quizItems")

async function setData() {
    const path = '/assets/quizs.json'
    const request = new Request(path)
    const response = await fetch(request)
    data = await response.json()

    const path1 = '/assets/testDone.json'
    const request1 = new Request(path1)
    const response1 = await fetch(request1)
    testdone = await response1.json()

    let text = ``
    for (let i = 0; i < data.length; i++) {
        arr = testdone.find((e)=>e.quiz_id == data[i].quiz_id)
        let done = ""
        if(arr){
            console.log(arr)
            done = `<h4>Completed</h4>
                <h4>Scores:${arr.count_rightAns}/${data[i].count_ques}</h4>`
        }
        console.log(done)
        quizItems.innerHTML += `
        <div class="quizItem">
            <div class="left-quiz">
                <h3>${data[i].quiz_name}</h3>
                <h4>ques: ${data[i].count_ques}</h4>
                <h4>${done}</h4>
            </div>
            <img src="https://media.istockphoto.com/vectors/quiz-game-icon-vector-outline-illustration-vector-id1214244508"
                alt="">
            <div class="form-quiz hidden">
                <div class="info-quiz">
                    <div class="info-quiz-footer">
                        <div class="info-quiz-footer-top">
                            <h3>${data[i].quiz_name}</h3>
                            <h4>ques: ${data[i].count_ques}</h4>
                        </div>
                        <a href="/quiz?quiz_id=${data[i].quiz_id}">Start quiz</a>
                    </div>
                </div>
            </div>
        </div>`
    }

    const quizItem = document.querySelectorAll(".quizItem")
    const formQuiz = document.querySelectorAll(".form-quiz")

    console.log(quizItem.length)

    quizItem.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            console.log(index)
            formQuiz.item(index).classList.toggle("hidden")
        })
    })

    // subjectItems.innerHTML = text
}

setData()


