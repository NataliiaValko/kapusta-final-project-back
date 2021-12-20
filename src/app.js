const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require("../swagger.json");
// const swaggerDoc = require("./swagger/routes/users/index");

const { userRouter, transactionRouter } = require("./routes");
const { uploadMiddleware } = require("./middlewares");
const developerRouter = require("./routes/developers.routes");
const googleAuthRouter = require("./routes/googleAuth.routes");

const app = express();
const passport = require("passport");
const session = require("express-session");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup({
    ...swaggerConfig,
    // ...swaggerDoc,
  })
);

// let whitelist = ['http://localhost:4200','http://localhost:80'];
//         let corsOptions = {
//             origin: (origin:any, callback:any)=>{
//                 if (whitelist.indexOf(origin) !== -1) {
//                     callback(null, true)
//                 } else {
//                     callback(new Error('Not allowed by CORS'))
//                 }
//             },credentials: true
//         }

app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger(formatsLogger));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users/avatar", uploadMiddleware.single("avatar"));
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/developers", developerRouter);
app.use("/api/auth/google", googleAuthRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status: code = 500, message = "Internal server error" } = err;
  res.status(code).json({ message, status: "error", code });
});

module.exports = { app };
