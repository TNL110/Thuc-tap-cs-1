const mysql = require('mysql2')
const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json())

app.get("/")


app.listen(3000)