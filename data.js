const mysql = require('mysql2')
const fs = require('fs')
const multer = require('multer');
const express = require('express')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs'
})

const writeJson = (path, results) => {

    results = JSON.stringify(results)
    fs.writeFile(__dirname + '/assets/' + path, results, 'utf-8', (error) => {
        if (error) throw error;
    });
}

connection.connect(function (error) {
    if (error) throw error
    else console.log("connected to the database successfully!")
})


exports.writeJson = (path, results) => {
    results = JSON.stringify(results)
    fs.writeFile(__dirname + '/assets/' + path, results, 'utf-8', (error) => {
        if (error) throw error;
    });
}


exports.getSubject = () => {
    connection.query("select * from subjects limit 5", function (error, results, fields) {
        if (error) throw error
        writeJson('subject.json', results)
    })
}

exports.getQuizs = () => {
    connection.query(`SELECT q.quiz_id, q.subject_id, q.author_id, q.quiz_name, q.quiz_description, q.count_ques, u.user_name
                    FROM nodejs.quiz q, nodejs.loginuser u
                    where (q.author_id = u.user_id);`, function (error, results, fields) {
        if (error) throw error
        writeJson('quizs.json', results)
        
    })

}

exports.getQuizByUserId = (id) => {
    connection.query(`SELECT q.quiz_id, q.subject_id, q.author_id, q.quiz_name, q.quiz_description, q.count_ques, u.user_name
                    FROM nodejs.quiz q, nodejs.loginuser u
                    where (q.author_id = u.user_id) and (u.user_id = ?);`, [id], function (error, results, fields) {
        if (error) throw error
        writeJson('quizs.json', results)
        connection.query("select * from testdone t where t.user_id = ?",[id], (error1,results1,fields1)=>{
            writeJson('testDone.json', results1)
        })
    })

}

exports.setSelectedAns = (ans) => {
    writeJson('selectedAns.json', ans)
}

exports.getQuiz = (id) => {
    // let json = {}
    connection.query(`SELECT q.quiz_id, q.subject_id, q.author_id, q.quiz_name, q.quiz_description, q.count_ques, u.user_name
                    FROM nodejs.quiz q, nodejs.loginuser u
                    where (q.author_id = u.user_id) and (q.quiz_id = ?);`, [id], function (error, results, fields) {
        if (error) throw error
        // json.quiz_info = results
        console.log(results)
        connection.query(`select q.ques_type, q.ques_id, q.num_ques, m.ques_text, m.ques_file, 
                        m.right_ans, m.ansA, m.ansA_file, m.ansB, m.ansB_file, m.ansC, m.ansC_file, m.ansD, m.ansD_file
                        from ques q, multichoice m 
                        where (q.ques_id = m.ques_id) and (q.quiz_id = ?)`, [id], function (error1, results1, fields1) {
            if (error1) throw error1
            console.log(results1)
            connection.query(`select q.ques_type, q.ques_id, q.num_ques, m.ques_text, m.ques_file, m.ans_text
                                from ques q, fillblank m 
                                where (q.ques_id = m.ques_id) and quiz_id = ?`, [id], (error2, results2, fields2) => {
                console.log(results2)
                const json = {
                    quiz: results,
                    ques: [...results1, ...results2]
                }
                writeJson('quiz.json', json)
            })
        })
    })
}