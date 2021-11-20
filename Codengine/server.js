const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Codeengine" });
});


require("./routes/trade.routes")(app);

let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});