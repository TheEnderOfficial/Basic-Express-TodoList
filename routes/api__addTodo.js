const express = require("express");
const db = require("../db")

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body)
    db.createTodo(req.body.todoName, false).then(r => res.json(r))
})

module.exports = router;