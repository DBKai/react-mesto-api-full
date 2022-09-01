require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { indexRouters } = require('./src/routes');
const { errorsHandler } = require('./src/middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const corsOptionsDelegate = require('./src/middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOptionsDelegate));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(indexRouters);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
