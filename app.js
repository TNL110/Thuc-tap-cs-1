const mysql = require('mysql2')
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded();
const multer = require('multer')
const fs = require('fs')

const data = require('./data')

const app = express();

const oneDay = 1000 * 60 * 60 * 24

var session

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    },
    resave: false
}))

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//serving public file
app.use(express.static(__dirname));
app.use(cookieParser());

app.use("/assets", express.static("assets"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs'
})

// connect to the database
connection.connect(function (error) {
    if (error) throw error
    else console.log("connected to the database successfully!")
})

app.post("/", encoder, function (req, res) {
    var action = req.body.action
    var username = req.body.username
    var password = req.body.password
    console.log(username, password)
    if (action === 'login') {
        connection.query("select * from loginuser where user_name = ? and user_passwork = ?", [username, password], function (error, results, fields) {
            if (results.length > 0) {
                var idUser = 0
                session = req.session
                session.userid = results[0].user_id
                session.userName = username
                console.log(req.session)
                res.redirect("/home")
            } else {

                res.redirect("/?mess=fail")
            }
            res.end();
        })
    } else {
        var email = req.body.email
        connection.query("insert into loginuser(email,user_name,user_pass) value(? ,? ,?)", [email, username, password], function (error, results, fields) {
            session = req.session
            session.userid = results[0].user_id
            session.userName = username
            console.log(req.session)
            res.redirect("/home")
        })
    }
})

// error
// console.log(imgQuiz)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //files khi upload xong s??? n???m trong th?? m???c "uploads" n??y - c??c b???n c?? th??? t??? ?????nh ngh??a th?? m???c n??y
        cb(null, '/assets/file/img')
    },
    filename: function (req, file, cb) {
        // t???o t??n file = th???i gian hi???n t???i n???i v???i s??? ng???u nhi??n => t??n file ch???c ch???n kh??ng b??? tr??ng
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
        quizFileName = filename + '-' + file.originalname
        // console.log(quizFileName)
        cb(null, quizFileName)
    }
})
//Kh???i t???o middleware v???i c???u h??nh tr??n, l??u tr??n local c???a server khi d??ng multer
const upload = multer({
    storage: storage
}).single('quizFile')



app.post('/ques', (req, res) => {
    var quizName = req.body.quizTitle
    var subject = req.body.subject
    var imgQuiz = req.file
    var ques = req.body.ques
    var a = req.body.a
    var b = req.body.b
    var c = req.body.c
    var d = req.body.d
    var rightAns = req.body.ans
    var idSubject = 0
    var typeQues = req.body.typeQues
    var ansText = req.body.ansText
    var countQues = req.body.countQues
    console.log(ansText)

    connection.query("select * from subjects where subject_name=?", [subject], (error, results, fields) => {
        // N???u m??n h???c ???? t???n t???i
        if (results.length > 0) {
            idSubject = results[0].subject_id
            // length = rightAns.length+ansText.length
            var idQuiz = 0
            // l??u b??i quiz v??o database
            connection.query("insert into quiz (subject_id,author_id,quiz_name,count_ques) values (?,?,?,?)",
                [idSubject, session.userid, quizName, countQues], (error, results0, fields0) => {
                    if (error) throw error
                    connection.query("select * from quiz where quiz_name=?", [quizName], (error, results1, fields1) => {
                        if (results1.length > 0) idQuiz = results1[0].quiz_id
                        //  s??? c??u h???i d???ng multichoice
                        let countMul = 0
                        if (rightAns) countMul = rightAns.length
                        // s??? c??u h???i d???nh fillblank
                        let countFill = countQues - countMul
                        // l??u c??u h???i v??o database
                        for (let i = 0; i < countQues; i += 1) {
                            if (countMul == 1 && (typeQues == 'mul' || typeQues[i] == 'mul')) {
                                connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'multichoice'])
                                connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                    if (error) throw error
                                    connection.query("insert into multichoice (ques_id,ques_text,ansA,ansB,ansC,ansD,right_ans) values (?,?,?,?,?,?,?)",
                                        [results2[0].ques_id, ques[i], a[i], b[i], c[i], d[i], rightAns[i]], (error, results2, fields2) => {
                                            if (error) throw error
                                            console.log("complete insert ques mull")
                                        })
                                })
                                // countMul -= 1
                            } else if (countFill == 1 && (typeQues == 'fill' || typeQues[i] == 'fill')) {
                                connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'fill'])
                                connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                    if (error) throw error
                                    connection.query("insert into fillblank (ques_id,ques_text,ans_text) values (?,?,?)",
                                        [results2[0].ques_id, ques[i], ansText[i]], (error, results2, fields2) => {
                                            if (error) throw error
                                            console.log("complete insert ques fill")
                                        })
                                })
                            } else if (typeQues[i] == 'mul') {
                                connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'multichoice'])
                                connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                    if (error) throw error

                                    connection.query("insert into multichoice (ques_id,ques_text,ansA,ansB,ansC,ansD,right_ans) values (?,?,?,?,?,?,?)",
                                        [results2[0].ques_id, ques[i], a[i], b[i], c[i], d[i], rightAns[i]], (error, results2, fields2) => {
                                            if (error) throw error
                                            console.log("complete insert ques muls")

                                        })
                                })
                            } else {
                                connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'fill'])
                                connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                    if (error) throw error

                                    connection.query("insert into fillblank (ques_id,ques_text,ans_text) values (?,?,?)",
                                        [results2[0].ques_id, ques[i], ansText[i]], (error, results2, fields2) => {
                                            if (error) throw error
                                            console.log("complete insert ques fills")

                                        })
                                })

                            }
                        }
                    })
                })
        } else {
            // N???u m??n h???c ch??a t???n t???i
            connection.query("insert into subjects (subject_name) values (?)", [subject], (error, results, fields) => {
                if (error) throw error
                console.log("complete insert subject")
            })
            connection.query("select * from subjects where subject_name=?", [subject], (error, results, fields) => {
                console.log(results[0])
                idSubject = results[0].subject_id
                console.log(idSubject, session.userid, quizName, countQues)
                var idQuiz = 0
                connection.query("insert into quiz (subject_id,author_id,quiz_name,count_ques) values (?,?,?,?)",
                    [idSubject, session.userid, quizName, countQues], (error, results0, fields0) => {
                        if (error) throw error
                        console.log("complete insert quiz")
                        connection.query("select * from quiz where quiz_name=?", [quizName], (error, results1, fields1) => {
                            if (results1.length > 0) idQuiz = results1[0].quiz_id
                            let countMul = 0
                            if (rightAns) countMul = rightAns.length
                            let countFill = countQues - countMul
                            console.log(countMul, countFill)
                            for (let i = 0; i < countQues; i += 1) {
                                if (countMul == 1 && (typeQues == 'mul' || typeQues[i] == 'mul')) {
                                    connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'multichoice'])
                                    connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                        if (error) throw error
                                        connection.query("insert into multichoice (ques_id,ques_text,ansA,ansB,ansC,ansD,right_ans) values (?,?,?,?,?,?,?)",
                                            [results2[0].ques_id, ques[i], a[i], b[i], c[i], d[i], rightAns[i]], (error, results2, fields2) => {
                                                if (error) throw error
                                                console.log("complete insert ques mull")
                                            })
                                    })
                                } else if (countFill == 1 && (typeQues == 'fill' || typeQues[i] == 'fill')) {
                                    connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'fill'])
                                    connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                        if (error) throw error
                                        connection.query("insert into fillblank (ques_id,ques_text,ans_text) values (?,?,?)",
                                            [results2[0].ques_id, ques[i], ansText[i]], (error, results2, fields2) => {
                                                if (error) throw error
                                                console.log("complete insert ques fill")
                                            })
                                    })
                                } else if (typeQues[i] == 'mul') {
                                    connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'multichoice'])
                                    connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                        if (error) throw error
                                        connection.query("insert into multichoice (ques_id,ques_text,ansA,ansB,ansC,ansD,right_ans) values (?,?,?,?,?,?,?)",
                                            [results2[0].ques_id, ques[i], a[i], b[i], c[i], d[i], rightAns[i]], (error, results2, fields2) => {
                                                if (error) throw error
                                                console.log("complete insert ques muls")

                                            })
                                    })
                                } else {
                                    connection.query("insert into ques (quiz_id, ques_type) values (?,?); ", [idQuiz, 'fill'])
                                    connection.query("select * from ques where quiz_id = ? order by ques_id desc;", [idQuiz], (error, results2, fields2) => {
                                        if (error) throw error

                                        connection.query("insert into fillblank (ques_id,ques_text,ans_text) values (?,?,?)",
                                            [results2[0].ques_id, ques[i], ansText[i]], (error, results2, fields2) => {
                                                if (error) throw error
                                                console.log("complete insert ques fills")

                                            })
                                    })
                                }
                            }
                        })
                    })
            })
        }
        res.redirect("/profile")
    })

})

app.post('/quiz/result', (req, res) => {
    var ans = req.body.ans
    var quizId = req.body.quizId
    var data1
    var selectedAns
    // l???y th??ng tin b??i quiz l??u v??o data1
    fs.readFile('./assets/quiz.json', 'utf8', function (err, result) {
        if (err) throw err;
        data1 = JSON.parse(result);
        console.log(data1)
        ques = data1.ques
        // l???y th??ng tin ????p ??n ng?????i d??ng 
        selectedAns = ans
        // l??u danh s??ch c??u h???i l??m sai
        var quesWrong = []
        // ki???m tra k???t qu??? b??i l??m
        for (let i = 0; i < data1.quiz[0].count_ques; i += 1) {
            // n???u c??u h???i d???ng multichoice
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
                // n???u c??u h???i d???ng fillblank
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
        // t??nh s??? c??u ????ng
        const countRightAns = data1.quiz[0].count_ques - quesWrong.length
        // l??u k???t qu??? v??o database
        connection.query("insert into testdone (user_id, quiz_id, count_rightAns) values (?,?,?)", [session.userid, quizId, countRightAns])
        // chuy???n v??? trang hi???n th??? k???t qu???
        res.redirect("/quiz/result")
    });
})

const getIdSubject = (subject) => {
    let idSubject = 0

    console.log(obj)
    console.log(idSubject)
    return idSubject
}


app.post('/home/query', (req, res) => {
    const search = req.body.search
    var sqlSearch = '% ' + search + ' %'
    console.log(search)

    connection.query(`select * from quiz where quiz_name like ?`, [sqlSearch], (err, results, fields) => {
        if (err) throw err
        console.log(results)
        const json = {
            textSearch: search,
            quizs: results
        }
        data.writeJson('quizs.json', json)
    })
    res.redirect("/home/query")
})

app.get('/quiz/result', (req, res) => {
    res.sendFile(__dirname + "/result.html")
})

app.get('/home/query', (req, res) => {
    res.sendFile(__dirname + "/home.html")
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

app.get("/home", function (req, res) {
    data.getQuizs()
    data.getSubject()
    connection.query("select * from testdone t where t.user_id = ?", [session.userid], (error1, results1, fields1) => {
        data.writeJson('testDone.json', results1)
    })
    res.sendFile(__dirname + "/home.html")
})

app.get("/createQuiz", function (req, res) {
    res.sendFile(__dirname + "/createQuiz.html")
})

app.get("/", function (req, res) {
    data.getSubject()
    data.getQuizs()
    session = req.session;
    if (session.userid) {
        res.sendFile(__dirname + '/home.html')
    } else
        res.sendFile(__dirname + '/login&register.html')
})

app.get("/profile", function (req, res) {
    // data.getSubject()
    data.getQuizByUserId(session.userid)
    res.sendFile(__dirname + "/profileUser.html")
})

app.get("/quiz", (req, res) => {
    var quizID = req.query.quiz_id
    data.getQuiz(quizID)
    res.sendFile(__dirname + '/quiz.html')
})

// set app port
app.listen(4500);