// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { fullName, email, password, passwordConfirm, registeredUsers } =
    req.body;

  // let registeredUsers = [
  //   {
  //     email: "jon@gmail.com",
  //     fname: "waso",
  //     password: "xxxx",
  //   },
  // ];

  //check if email already in the databse
  const user = registeredUsers.find((user) => user.email === email);

  if (user) {
    const message = "email already exist, try again";
    return returnError(res, message, 401);
  }
  //check if user type credentials
  if (!fullName || !email || !password || !passwordConfirm) {
    const message = "all fields are required";
    return returnError(res, message, 401);
  }
  //check if password and passwordConfirm is the same
  if (password !== passwordConfirm) {
    const message = "passwords do not match, please try again";
    return returnError(res, message, 401);
  }

  const newUser = new userObj({
    email,
    fullName,
    password,
    passwordConfirm,
    passwordConfirm,
  });

  registeredUsers.push(newUser);

  try {
    res.status(200).json({
      success: true,
      registeredUsers,
      message: "account created successfully, redirecting you to login page",
    });
  } catch (err) {
    //send error mdg to the client
    console.log(err);
    console.log(err.response);
    return next(new AppError("there was an error , try again later", 500));
  }
};

function userObj(userObj) {
  this.email = userObj.email;
  this.fullName = userObj.fullName;
  this.password = userObj.password;
  this.passwordConfirm = userObj.passwordConfirm;
  this.passwordConfirm = userObj.passwordConfirm;
}

const returnError = (res, msg, errorCode) => {
  return res.status(errorCode).json({
    success: false,
    msg,
  });
};
