const addQuesMul = document.querySelector(".btnAddMul")
const addQuesFill = document.querySelector(".btnAddFill")
const quesItems = document.querySelector(".quesItems")
const countQues = document.querySelector(".countQues")
// addQues.addEventListener

// const setNumQues = ()=>{
//     const numQues = document.querySelectorAll(".numQues")
//     numQues.forEach((item,count)=>{
//         item.innerText = (count+1)+ '. '
//     })
// }

const quizFile = document.querySelector('.imgQuiz')
const inputQuizFile = document.querySelector('#quiz-inputFile')

inputQuizFile.addEventListener('change', (e)=>{
    const {files} = e.target
    console.log("files", files)
    quizFile.innerHTML = `<p>${files[0].name}</p>`
})

let num = 0
const setEventBtnDelete = ()=>{
    console.log("123456789")
    const btnDeletes = document.querySelectorAll(".deleteQues")
    const quesItem = document.querySelectorAll(".quesItem")
    const numQues = quesItems.getAttribute('data-num-ques')
    btnDeletes.forEach((item,count)=>{
        item.addEventListener('click',(e)=>{
            console.log(count)
            quesItem.item(count).remove()
            quesItems.setAttribute("data-num-ques", Number(numQues) - 1)
            countQues.value = Number(countQues.value)-1
            // setNumQues()
        })
    })
}

// setNumQues()
setEventBtnDelete()

addQuesMul.addEventListener('click', (e) => {
    let ques = document.querySelector(`.addQues${num}`)
    var numQues = quesItems.getAttribute('data-num-ques')
    num = numQues-1
    console.log(num,numQues)
    countQues.value = Number(countQues.value)+1
    ques.innerHTML += `
    <div class="quesItem" data-num="${num}">
        <input type="hidden" name="typeQues" value="mul">
        <input type="hidden" name="ansText">
        <div class="form-ques-text">
            <div class="form-inputFile">
                    <input type="file" id="ques-inputFile" name="ques-file" accept="image">
                    <label for="ques-inputFile" class="ques-inputFile">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                <input type="file" id="ques-inputFile" name="ques-file" accept="audio">
                <label for="ques-inputFile" class="ques-inputFile">
                    <ion-icon name="mic-outline"></ion-icon>
                </label>
                <input type="file" id="ques-inputFile" name="ques-file" accept="video">
                <label for="ques-inputFile" class="ques-inputFile">
                    <ion-icon name="videocam-outline"></ion-icon>
                </label>
            </div>
            <input type="text" name="ques" required class="ques-text">
        </div>
        <div class="ans-box">
            <div class="ans">
                <div class="form-ans">
                    <input type="file" id="ans-inputFile" name="ansA-file" accept="image">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="ans-inputFile" name="ansA-file" accept="audio">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="mic-outline"></ion-icon>
                    </label>
                
                </div>
                <input type="text" name="a" required class="ans-text">
            </div>
            <div class="ans">
                <div class="form-ans">
                    <input type="file" id="ans-inputFile" name="ansB-file" accept="image">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="ans-inputFile" name="ansB-file" accept="audio">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="mic-outline"></ion-icon>
                    </label>
                    
                </div>
                <input type="text" name="b" required class="ans-text">
            </div>
            <div class="ans">
                <div class="form-ans">
                    <input type="file" id="ans-inputFile" name="ansC-file" accept="image">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="ans-inputFile" name="ansC-file" accept="audio">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="mic-outline"></ion-icon>
                    </label>
                    
                </div>
                <input type="text" name="c" required class="ans-text">
            </div>
            <div class="ans">
                <div class="form-ans">
                    <input type="file" id="ans-inputFile" name="ansD-file" accept="image">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="ans-inputFile" name="ansD-file" accept="audio">
                    <label for="ans-inputFile" class="ans-inputFile">
                        <ion-icon name="mic-outline"></ion-icon>
                    </label>
                    
                </div>
                <input type="text" name="d" required class="ans-text">
            </div>
        </div>
        <div class="footer-ans">
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
    </div>
    <div class="addQues${num+1}"></div>
    `
    console.log(num)
    ques = document.querySelector(`.addQues${num}`)
    num +=1
    // setNumQues()
    console.log(`addQues${num}`)
    quesItems.setAttribute("data-num-ques", Number(numQues) + 1)
    setEventBtnDelete()
})

addQuesFill.addEventListener('click', (e)=>{
    let ques = document.querySelector(`.addQues${num}`)
    var numQues = quesItems.getAttribute('data-num-ques')
    num = numQues-1
    console.log(num,numQues)
    countQues.value = Number(countQues.value)+1
    ques.innerHTML += `
    <div class="quesItem" data-num="${num}">
        <input type="hidden" name="typeQues" value="fill">
        <input type="hidden" name="a">
        <input type="hidden" name="b">
        <input type="hidden" name="c">
        <input type="hidden" name="d">
        <input type="hidden" name="rightAns">
        <div class="form-ques-text">
            <div class="form-inputFile">
                <input type="file" id="ques-inputFile" name="ques-file" accept="image">
                <label for="ques-inputFile" class="ques-inputFile">
                    <ion-icon name="image-outline"></ion-icon>
                </label>
                <input type="file" id="ques-inputFile" name="ques-file" accept="audio">
                <label for="ques-inputFile" class="ques-inputFile">
                    <ion-icon name="mic-outline"></ion-icon>
                </label>
                <input type="file" id="ques-inputFile" name="ques-file" accept="video">
                <label for="ques-inputFile" class="ques-inputFile">
                    <ion-icon name="videocam-outline"></ion-icon>
                </label>
            </div>
            <input type="text" name="ques" required class="ques-text">
        </div>
        <div class="ans-box">
            <input type="text" name="ansText" class="ans-input-fill" id="" placeholder="Right Ans ....">
        </div>
        <div class="footer-ans fill">
            <div class="deleteQues">Delete</div>
        </div>
    </div>
    <div class="addQues${num+1}"></div>
    `
    console.log(num)
    ques = document.querySelector(`.addQues${num}`)
    num +=1
    // setNumQues()
    console.log(`addQues${num}`)
    quesItems.setAttribute("data-num-ques", Number(numQues) + 1)
    setEventBtnDelete()
})






