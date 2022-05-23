const body = document.querySelector(".body")

async function setData() {
    const path = '/assets/quiz.json'
    const request = new Request(path)
    const response = await fetch(request)
    data = await response.json()

    // console.log(data)
    const quiz = document.querySelector('.info-quiz')

    body.innerHTML += `
    <div class="start item" data-check="true">
        <input type="hidden" name="quizId" value="${data.quiz[0].quiz_id}">
        <h1>${data.quiz[0].quiz_name}</h1>
        <h2>by: ${data.quiz[0].user_name}</h2>
    </div>
    `
    const ques = data.ques
    const length = data.quiz[0].count_ques
    for (let i = 0; i < length; i++) {
        console.log(ques[i])
        if (ques[i].ques_type == 'multichoice') {
            body.innerHTML += `
            <div class="boxQues item" data-check="true">
                <div class="ques">
                    <p>${ques[i].ques_text}</p>
                </div>
                <div class="boxAns">
                    <p class="ans ansA" data-ques="${i}" data-ans="A">A. ${ques[i].ansA}</p>
                    <p class="ans ansB" data-ques="${i}" data-ans="B">B. ${ques[i].ansB}</p>
                    <p class="ans ansC" data-ques="${i}" data-ans="C">C. ${ques[i].ansC}</p>
                    <p class="ans ansD" data-ques="${i}" data-ans="D">D. ${ques[i].ansD}</p>
                </div>
                <input type="hidden" name="ans" value="noAns" class="yourAns">
            </div>
            `
        } else {
            body.innerHTML += `
            <div class="boxQues item" data-check="true">
                <div class="ques">
                    <p>${ques[i].ques_text}</p>
                </div>
                <div class="boxAns-text">
                    <input type="text" name="ans" class="yourAns">
                    <div class="fill-ques" data-ques="${i}">Next question</div>
                </div>
            </div>
            `
        }
    }
    const boxQues = document.querySelectorAll('.boxQues')
    for (let i = 1; i < length; i++) {
        boxQues.item(i).dataset.check = "false"
    }

    const count = document.querySelector('.count')
    const items = document.querySelectorAll(".item")
    const btnNext = document.querySelector('.btnNext')
    const btnBack = document.querySelector('.btnBack')
    const ans = document.querySelectorAll('.ans')
    const cover = document.querySelector('.cover')
    const submit = document.querySelector('.submit')
    const yourAns = document.querySelectorAll('.yourAns')
    const btnFill = document.querySelectorAll('.fill-ques')

    const progress = document.querySelector(".progress")
    // console.log(progress.value)
    var i = items.length
    var check = true

    count.innerHTML = `0/${length}`

    const startTime = (check) => {
        var s = progress.value
        console.log(s)
        const timeout = setTimeout(() => {
            progress.value = s - 1
            s -= 1
            if (check) {
                startTime(check);
            }
        }, 1000);
        timeout
        if (s == "0") {
            clearTimeout(timeout)
        }
    }

    // startTime()
    items.forEach((e) => {
        e.style.zIndex = i
        i -= 1
    })

    ans.forEach((e, index) => {
        e.addEventListener('click', (e1) => {
            cover.classList.remove('hidden')
            var q = Number(e.dataset.ques)
            yourAns.item(q).value = e.dataset.ans
            e.classList.add('selectedAns')
            for (var j = 0; j < ans.length; j += 1) {
                if (Number(ans.item(j).dataset.ques) === q && j != index) {
                    ans.item(j).classList.add('otherAns')
                }
            }
            body.dataset.pointer = q + 1
            items.item(q + 2).dataset.check = "true"
            // check = false
            setTimeout(() => {
                btnNext.click()
            }, 3000)

        })
    })

    btnFill.forEach((e,index)=>{
        e.addEventListener('click', (e1) => {
            cover.classList.remove('hidden')
            var q = Number(e.dataset.ques)
            body.dataset.pointer = q + 1
            items.item(q + 2).dataset.check = "true"
            // check = false
            btnNext.click()
        })
    })

    btnNext.addEventListener('click', (e) => {
        cover.classList.add('hidden')
        var t = Number(body.dataset.pointer)
        if (t + 1 > length) {
            submit.click()
        }
        if (items.item(t + 1).dataset.check === "true") {

            items.item(t).classList.add('hidden')
            body.dataset.pointer = t + 1
            count.innerText = `${t+1}/${length}`
            // if(t==0){
            //     startTime(check)
            // }

        }
    })

    btnBack.addEventListener('click', (e) => {
        var t = Number(body.dataset.pointer)
        console.log(t)
        if (t - 1 >= 0) {
            items.item(t - 1).classList.remove('hidden')
            body.dataset.pointer = t - 1
            count.innerText = `${t-1}/${length}`
            cover.classList.remove('hidden')
        }
    })
}

setData()