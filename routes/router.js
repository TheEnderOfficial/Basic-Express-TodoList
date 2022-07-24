const express = require("express");

const router = express.Router();

router.use("/api/getTodos", require("./api__getTodos"));
router.use("/api/createTodo", require("./api__addTodo"));
router.use("/api/changeTodo", require("./api__changeTodo"));
router.use("/api/removeTodo", require("./api__removeTodo"));
router.use("/", require("./index"));

module.exports = router;