const {host, port} = require("./config")
const express = require("express")
const router = require("./routes/router");
const db = require("./db");
const expressNunjucks = require('express-nunjucks');

const app = express();

app.use(express.json());
app.use(router);

db.initDb();

app.set('views', __dirname + '/views');
 
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

app.listen(port, host, () => console.log("TODO List server is running"))