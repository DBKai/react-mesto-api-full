require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { indexRouters } = require('./src/routes');
const { errorsHandler } = require('./src/middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const corsOptionsDelegate = require('./src/middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOptionsDelegate));
app.use(helmet());
app.disable('x-powered-by');
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
