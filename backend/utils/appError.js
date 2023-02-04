class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  //   static badRequest(msg) {
  //     return new AppError(400, msg);
  //   }

  //   static internal(msg) {
  //     return new AppError(500, msg);
  //   }
}

module.exports = AppError;
