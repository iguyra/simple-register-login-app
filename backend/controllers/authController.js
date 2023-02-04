const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const client_URL = require("../utils/client_URL");
const { createSendTokenn } = require("../utils/helpers");
const crypto = require("crypto");
const dev = true;

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  var expiryDate = new Date(Number(new Date()) + 315360000000);

  const cookieOptions = {
    expires: expiryDate,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  };

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    // token,
    data: {
      user,
    },
  });
};

//LOG OUT
exports.logout = catchAsync(async (req, res) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  };

  res.clearCookie("token", cookieOptions);
  res.cookie("isg", true);

  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });

  res.end();
});

//SIGN UP
exports.signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm } = req.body;

  //check if email already in the databse
  const user = await User.findOne({ email });

  if (user) {
    const message = "email already exist, try again";
    return next(new AppError(message, 400));
  }
  //check if user type credentials
  if (!fullName || !email || !password || !passwordConfirm) {
    const message = "all fields are required";
    return next(new AppError(message, 400));
  }
  //check if password and passwordConfirm is the same
  if (password !== passwordConfirm) {
    const message = "passwords do not match, please try again";
    return next(new AppError(message, 400));
  }

  const newUser = await User.create({
    email,
    fullName,
    password,
    passwordConfirm,
    passwordConfirm,
  });

  await newUser.save({ validateBeforeSave: false });

  try {
    res.status(200).json({
      success: true,
      message:
        "account created successfully, please login to your email to verify your account",
    });
  } catch (err) {
    //send error mdg to the client
    console.log(err);
    console.log(err.response);
    return next(new AppError("there was an error , try again later", 500));
  }
});

// RESTRICT ACTIONS TO BE PERFORMED BASE ON USER ROLE
exports.restricTo = (...roles) => {
  return (req, res, next) => {
    //roles ["admin", "lead-guide"]. role="user"
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to perfom this action", 401)
      );
    }

    next();
  };
};

//LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!email || !password) {
    const message = "please type credientials";
    const error = next(new AppError(message, 400));
    return next(new AppError(message, 400));
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    const message = "user does not exist, please try again";
    return next(new AppError(message, 400));
  }

  // createSendTokenn(user, 201, res, "token");
  return res.status(200).json({
    success: true,
    // token,
    user,
  });
});

//PROTECTED ROUTES
exports.protected = catchAsync(async (req, res, next) => {
  let token = req.cookies.token;

  if (req.headers.cookie && req.headers.cookie.startsWith("token")) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    return next(
      new AppError("YOU ARE NOT AUTHORIZED TO ACCESS THIS RESOURCE", 401)
    );
  }
  // VERIFY TOKEN
  const verifiedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // 3) check if user still exists
  const currentUser = await User.findById(verifiedToken.id);
  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token no longer exist", 401)
    );
  }

  //4 check if user changed password after token was issured
  if (currentUser.changedPasswordAfter(verifiedToken.iat)) {
    return next(new AppError("User changed password try again", 401));
  }

  req.user = currentUser;
  next();
});

// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 get user based on posted paswword
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  // 2 generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // sent it to users email

  const ResetUrl = `${req.protocol}://${req.get(
    "host"
  )}/account/resetPassword/${resetToken}`;

  const message = `
  <p>click <a href=${ResetUrl}> here <a/> to reset your password</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message: message,
      clientEmail: user.email,
      html: `
      <p>${message}</p>
     `,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    //send error mdg to the client
    return next(new AppError("there was an error, try again later", 500));
  }
});

// RESET PASSWORD

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1 check token to make sure it has not expire
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // 2 get user from the token
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("token is invalid or has expired", 400));

  // 3 update user password
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm)
    return next(new AppError("please match your password", 202));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  await user.save({ validateBeforeSave: true });

  createSendToken(user, 200, res);
});

//UPDATE PASSOWRD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // get user from collection
  const user = await User.findOne({ email: req.user.email }).select(
    "+password"
  );

  //check if posted password is same as current password
  const correctPassword = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("current password incorrect, try again", 404));
  }
  //check if new password and confirm password are the same
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("passwords do not match, try again", 404));
  }

  // change password and send to user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  createSendToken(user, 201, res);
});
