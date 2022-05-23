const user = document.querySelector(".user")
const box = document.querySelector(".box-user")

user.addEventListener('click', (e)=>{
    box.classList.toggle('hide')
})