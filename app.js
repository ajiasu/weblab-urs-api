const express = require("express");
const morgan = require("morgan");

const ursRouter = require("./routes/ursRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
app.use("/v1/", ursRouter);

module.exports = app;
