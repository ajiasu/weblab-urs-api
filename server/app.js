const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const morgan = require("morgan");

const ursRouter = require("./routes/weighingsRoutes");

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.get("/", function (req, res, next) {
    res.sendFile(`${__dirname}/index.html`);
});

app.use("/v1/weighings", ursRouter);

let position = {
    x: 200,
    y: 200
};

io.on("connection", (socket) => {
    console.log("Socket Connection established");
    io.emit("position", position);
});

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB connection established.");
    });

server.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
