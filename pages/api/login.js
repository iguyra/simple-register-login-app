// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  //   res.status(200).json({ name: "John Doe" });

  //   let registeredUsers = [
  //     {
  //       email: "jon@gmail.com",
  //       fname: "waso",
  //       password: "xxxx",
  //     },
  //   ];

  const { email, password, registeredUsers } = req.body;
  const user = registeredUsers.find(
    (user) => user.email === email && password === user.password
  );

  console.log(req.body, "BODY");

  console.log(user, "USER");

  if (!email || !password) {
    const message = "please type credientials";
    return returnError(res, message, 401);
  }

  if (!user || !user.password === password) {
    const message = "user does not exist, please try again";
    return returnError(res, message, 401);
  }

  // createSendTokenn(user, 201, res, "token");
  return res.status(200).json({
    success: true,
    // token,
    user,
  });
};

const returnError = (res, msg, errorCode) => {
  return res.status(errorCode).json({
    success: false,
    msg,
  });
};
