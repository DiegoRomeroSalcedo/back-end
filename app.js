const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info(`Connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connnected to mongoDB');
})
.catch(error => {
    logger.error(`error connecting to mongoDB ${error.message}`);
});

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;