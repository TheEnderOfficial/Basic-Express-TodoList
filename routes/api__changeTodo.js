const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body)
    let data = req.body.data;
    let id = req.body.id;

    db.getTodo(id).then(todo => {
        let todo_name = data.todo_name || todo.todo_name;
        let completed = data.completed || todo.completed;
        db.updateTodo(id, todo_name, completed).then(r => res.json(r));

    });

})

module.exports = router;