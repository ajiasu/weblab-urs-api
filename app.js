const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const morgan = require("morgan");

const ursRouter = require("./routes/ursRoutes");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/node_modules`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.get("/", function (req, res, next) {
    res.sendFile(`${__dirname}/index.html`);
});

app.use("/v1/", ursRouter);

io.on('connection', (socket) => {
    io.emit("chat message", "MACHINE TURNED ON");
    
    setInterval(function() {
        io.emit("chat message", "Coordinates are 3234234,12234234");
    }, 1000)

    setInterval(function() {
        io.emit("chat message", "Weight is 3 g");
    }, 1000)

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
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
