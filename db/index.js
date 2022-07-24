const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db = null;

let dbInitChecker = function (fn) {
    return function () {
        if (db != null) {
            try {
                return fn.apply(this, arguments);
            } catch (ex) {
                ErrorHandler.Exception(ex);
            }
        }
        else {
            throw new Error("DB not initialized");
        }
    };
};

let deserializeTodo = (todo) => {
    if (!todo) {
        return null;
    }
    return { id: todo.id, todo_name: todo.title, completed: todo.completed === 1 }
}

module.exports.initDb = () => {
    open({
        filename: __dirname + "/todoapp.db",
        driver: sqlite3.Database
    }).then(db_ => {
        db = db_;

        (async () => {
            await db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)");
        })().then(
            () => console.log("DB initialized"),
        )
    })
}

module.exports.getTodos = dbInitChecker(async () => {
    return (await db.all("SELECT * FROM todos")).map(deserializeTodo)
})

module.exports.getTodo = dbInitChecker(async (id) => {
    let r = await db.get("SELECT * FROM todos WHERE id = ?", id);
    console.log(r)

    return !r ? null : deserializeTodo(r);
})

module.exports.updateTodo = dbInitChecker(async (id, title, completed) => {
    return await db.run("UPDATE todos SET title = ?, completed = ? WHERE id = ?", title, completed, id);
})

module.exports.createTodo = dbInitChecker(async (title, completed) => {
    let insert = await db.run("INSERT INTO todos (title, completed) VALUES (?, ?)", title, completed);

    return insert;
})

module.exports.removeTodo = dbInitChecker(async (id) => {
    return await db.run("DELETE FROM todos WHERE id = ?", id);
})