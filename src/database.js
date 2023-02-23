const mongoose = require('mongoose');

const logger = require('./utils/logger')('DB');

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1:27017/feriapp';

mongoose.set("strictQuery", false);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mongoose.connection;

connection.once('open', () => {
    logger.info('-------------------------------------');
    logger.info('Enlazado a la base de datos');
    logger.info(URI);
    logger.info('-------------------------------------');
});