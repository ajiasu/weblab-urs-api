const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io")(server, {
    pingTimeout: 6000,
    cors: { origin: "*" }
});
const morgan = require("morgan");

const weighingsRouter = require("./routes/weighingsRoutes");
const motordataRouter = require("./routes/motordataRoutes");
const statesRouter = require("./routes/statesRoutes");

dotenv.config({ path: "./config.env" });
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

app.use("/v1/weighings", weighingsRouter);
app.use("/v1/motordata", motordataRouter);
app.use("/v1/states", statesRouter);

let position = {
    x: 200,
    y: 200
};

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB connection established.");
    });

socketio.on("connection", (socket) => {
    // new socket connected
    console.log("New Socket connected");
    // listen for a 'message' event
    socket.on("message", (eventData) => {
        // attach the current time
        eventData.processed = Date.now();

        // send the message back to the client
        socket.emit("message", eventData);
    });

    socket.on("update", (eventData) => {
        socket.emit("weighings", getCurrentWeighings());
        socket.emit("status", getCurrentStatus());
        socket.emit("position", getCurrentPosition());
    });
});
server.listen(port, () => {
    console.log("Server started on port", port);
});
