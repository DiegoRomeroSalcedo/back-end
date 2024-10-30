const config = require('./utils/config');
const app = require('./app'); // Aplicacion express real.
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
