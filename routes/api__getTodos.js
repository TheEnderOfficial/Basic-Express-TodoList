const express = require("express");
const db = require("../db")

const router = express.Router();

router.get("/", (req, res) => {
    db.getTodos().then(todos => {
        console.log(todos)
        res.json(todos);
    })
})

module.exports = router;