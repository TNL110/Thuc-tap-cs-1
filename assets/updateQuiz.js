const quesItems = document.querySelector(".quesItems")

async function getData(){
    const path = '/assets/quiz.json'
    const request = new Request(path)
    const response = await fetch(request)
    data = await response.json()

    console.log(data)
    let num = 0

    const ques = document.querySelector(`.addQues${num}`)
    var numQues = quesItems.getAttribute('data-num-ques')
    ques.innerHTML += `
    <div class="quesItem" data-num="${num}">
        <label for="ques"><span class="numQues"></span> Ques: 
            <input type="text" name="ques" required class="ques">
        </label>
        <div class="ans">
            <div class="left-ans">
                <label for="ques">A.
                    <input type="text" name="a" required>
                </label>
                <label for="ques">B.
                    <input type="text" name="b" required>
                </label>
            </div>
            <div class="right-ans">
                <label for="ques">C.
                    <input type="text" name="c" required>
                </label>
                <label for="ques">D.
                    <input type="text" name="d" required>
                </label>
            </div>
        </div>
        <label for="rightAns" class="rightAns">Right Ans: 
            <select name="ans">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </label>
        <div class="deleteQues">Delete</div>
    </div>
    <div class="addQues${num+1}"></div>
    `
    num +=1
    setNumQues()
    ques = document.querySelector(`.addQues${num}`)
    quesItem = document.querySelectorAll(".quesItem")
    btnDelete = document.querySelectorAll(".deleteQues")
    console.log(`addQues${num}`)
    quesItems.setAttribute("data-num-ques", Number(numQues) + 1)
    setEventBtnDelete()
}

addQues.addEventListener

const setNumQues = ()=>{
    const numQues = document.querySelectorAll(".numQues")
    numQues.forEach((item,count)=>{
        item.innerText = count+1
    })
}
let num = 0
const setEventBtnDelete = ()=>{
    const btnDeletes = document.querySelectorAll(".deleteQues")
    const quesItem = document.querySelectorAll(".quesItem")
    const numQues = quesItems.getAttribute('data-num-ques')
    btnDeletes.forEach((item,count)=>{
        item.addEventListener('click',(e)=>{
            quesItem.item(count).remove()
            quesItems.setAttribute("data-num-ques", Number(numQues) - 1)
            setNumQues()
        })
    })
}

setNumQues()

addQues.addEventListener('click', (e) => {
    const ques = document.querySelector(`.addQues${num}`)
    var numQues = quesItems.getAttribute('data-num-ques')
    ques.innerHTML += `
    <div class="quesItem" data-num="${num}">
        <label for="ques"><span class="numQues"></span> Ques: 
            <input type="text" name="ques" required class="ques">
        </label>
        <div class="ans">
            <div class="left-ans">
                <label for="ques">A.
                    <input type="text" name="a" required>
                </label>
                <label for="ques">B.
                    <input type="text" name="b" required>
                </label>
            </div>
            <div class="right-ans">
                <label for="ques">C.
                    <input type="text" name="c" required>
                </label>
                <label for="ques">D.
                    <input type="text" name="d" required>
                </label>
            </div>
        </div>
        <label for="rightAns" class="rightAns">Right Ans: 
            <select name="ans">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </label>
        <div class="deleteQues">Delete</div>
    </div>
    <div class="addQues${num+1}"></div>
    `
    num +=1
    setNumQues()
    ques = document.querySelector(`.addQues${num}`)
    quesItem = document.querySelectorAll(".quesItem")
    btnDelete = document.querySelectorAll(".deleteQues")
    console.log(`addQues${num}`)
    quesItems.setAttribute("data-num-ques", Number(numQues) + 1)
    setEventBtnDelete()
})
