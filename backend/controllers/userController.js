const axios = require("axios");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/email");

const catchAsync = require("../utils/catchAsync");
const { getAuthUserId } = require("../utils/helpers");

const AppError = require("../utils/appError");
const { createSendToken } = require("../utils/helpers");
const client_URL = require("../utils/client_URL");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "succss",
    users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new AppError("USER NOT FOUND", 404));
  }

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.getMe = (req, res) => {
  const user = req.user;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = undefined;

  res.json({
    user,
  });
};

exports.getFrontUser = catchAsync(async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${client_URL}/api/users/cart`, config);
    return data;
  } catch (err) {
    console.log(err);
  }
});

exports.createUser = catchAsync(async (req, res) => {
  const { email, lastname, firstname, password, passwordConfirm } = req.body;

  const user = await User.create({
    email,
    lastname,
    firstname,
    password,
    passwordConfirm,
  });

  createSendToken(user, 201, res, "token");
});

/// VERIFY USER
exports.verifyMe = catchAsync(async (req, res) => {
  const verifiedToken = await getAuthUserId(req.cookies.token);

  let user = await User.findById(verifiedToken.id);

  const data = {
    idType: req.body.idType,
    idNumber: req.body.idNumber,
  };

  user.verifiedStatus = "pending";
  user.verifyDetails.push(data);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    user,
  });
});

////////////////////////////////////////////////////////////////////////////

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    req.body,
    {
      new: true,
    }
  );

  if (!user) return next(new AppError("user does not exist", 201));

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "sucess",
    user,
  });
});

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
