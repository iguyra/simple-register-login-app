const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./catchAsync");

exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createSendTokenn = (user, statusCode, res, authName) => {
  jwtSecret = (authName) => {
    let secret;

    if (authName === "token") {
      secret = process.env.JWT_SECRET;
    } else if (authName === "anonymous") {
      secret = process.env.JWT_SECRET_ANON;
    }
    return secret;
  };

  const signToken = (id) => {
    return jwt.sign({ id: id }, jwtSecret(authName), {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  const token = signToken(user._id);
  var expiryDate = new Date(Number(new Date()) + 315360000000);

  const cookieOptions = {
    expires: expiryDate,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    domain: process.env.NODE_ENV === "production" ? "xxxxx.com" : "127.0.0.1",
  };

  res.cookie(authName, token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    // token,
    data: {
      user,
    },
  });
};

exports.getAuthUserId = async (token) => {
  // VERIFY TOKEN
  const verifiedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  return verifiedToken;
};
