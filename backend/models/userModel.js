const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now(), select: false },
  fullName: {
    type: String,
    lowercase: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },

  verifiedStatus: {
    type: String,
    default: "unverified",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },

  gender: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "please provdie password"],
    minlength: 6,
    select: false, // to not show up in any output
  },

  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      //this only works on CREATE N SAVE!!
      validator: function (el) {
        return el === this.password; // el is the passwordConfirm eg: abc === abc will return true
      },
      message: "passwords are not the same",
    },
  },
  passwordResetToken: String,
  emailVerificationToken: {
    type: String,
  },
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 3600000;

  return resetToken;
};
userSchema.methods.createEmailVerificationToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  let hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.emailVerificationToken = hashedResetToken;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (tokenIssueDate) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > tokenIssueDate;
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);
// mongoose.models = {};
module.exports = User;
