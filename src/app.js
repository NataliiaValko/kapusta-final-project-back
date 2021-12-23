const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');

const { userRouter, transactionRouter } = require('./routes');
const { uploadMiddleware } = require('./middlewares');
const developerRouter = require('./routes/developers.routes');
const googleAuthRouter = require('./routes/googleAuth.routes');
const { corsOptions } = require('./config');
const swaggerConfig = require('../swagger.json');
// const swaggerDoc = require("./swagger/routes/users/index");

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup({
    ...swaggerConfig,
    // ...swaggerDoc,
  })
);

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users/avatar', uploadMiddleware.single('avatar'));
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/developers', developerRouter);
app.use('/api/auth/google', googleAuthRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, next) => {
  const { status: code = 500, message = 'Internal server error' } = err;
  res.status(code).json({ message, status: 'error', code });
});

module.exports = { app };
