const mongoose = require("mongoose");
const cors = require("cors");
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
const powerUsageRouter = require("./routes/powerUsageRoutes");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    cors({
        origin: "http://localhost:8080"
    })
);
app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/v1/weighings", weighingsRouter);
app.use("/v1/motordata", motordataRouter);
app.use("/v1/states", statesRouter);
app.use("/v1/powerUsage", powerUsageRouter);

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
    socket.on("updateWeighings", (eventData) => {
        //console.log("New Data available:", eventData);
        socket.broadcast.emit("updateWeighings", {
            material: eventData.material,
            count: eventData.count
        });
    });
    socket.on("updateStates", (eventData) => {
        //console.log("New Data available:", eventData);
        socket.broadcast.emit("updateStates", eventData.state);
    });
    socket.on("updatePowerUsage", (eventData) => {
        //console.log("New Data available:", eventData);
        socket.broadcast.emit("updatePowerUsage", eventData.powerUsage);
    });
    socket.on("updateMotordata", (eventData) => {
        console.log("New Data available:", eventData);
        socket.broadcast.emit("updateMotordata", {
            x: eventData.x,
            y: eventData.y
        });
    });
});
server.listen(port, () => {
    console.log("Server started on port", port);
});
