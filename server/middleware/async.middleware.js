const logger = require("../startup/logging");

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      logger.error(error.message, error);
      next(error);
    }
  };
};
