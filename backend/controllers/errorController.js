const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}.please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  // console.log("from senderrordev server side", err.message);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = () =>
  new AppError("Invalid toekn please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("your token has expired! please login again", 401);

const sendErrorProd = (err, res) => {
  // operational, trsuted error: send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) log error
    // console.error('ERROR', err);

    // 2) send generic message
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "something wentss wrong";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err }; //copy of the err
    if (error.kind === "ObjectId") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === "Validation failed")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};

// FOR PRODCUTION
// module.exports = (error, req, res, next) => {
//   let response;
//   if (process.env.NODE_ENV !== "production") {
//     response = { message: error.message, error };
//   } else {
//     console.log("from error handler: FOR PRODUCTION", error.statusCode, error);
//     response = { message: error.message, statusCode: statusCode };
//   }
//   res.status(500).json(response);
// };
