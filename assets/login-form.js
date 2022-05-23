const btnLogin = document.querySelector(".login-btn")
const btnRegister = document.querySelector(".register-btn")
const btnRelogin = document.querySelector(".relogin")
const register = document.querySelector(".register")
const login = document.querySelector(".login")

btnLogin.addEventListener('click', (e)=>{
    // console.log("123456")
    // register.classList.add("hidden")
    // login.classList.remove("hidden")
    loginFun()
})

btnRelogin.addEventListener('click', (e)=>{
    loginFun()
})

const loginFun = ()=>{
    console.log("123456")
    register.classList.add("hidden")
    login.classList.remove("hidden")
}

btnRegister.addEventListener('click', (e)=>{
    console.log("123")
    login.classList.add("hidden")
    register.classList.remove("hidden")
})