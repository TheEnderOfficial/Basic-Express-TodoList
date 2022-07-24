const express = require("express");
const db = require("../db")

const router = express.Router();

router.post("/", (req, res) => {
    db.removeTodo(req.body.id).then(todos => {
        console.log(todos)
        res.json(todos);
    })
})

module.exports = router;