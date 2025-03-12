const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminUserLogin = async (req, res) => {
  var username = req.body.email;
  var pass = req.body.password;

  let checkuser = await db.userDetails.findOne({
    where: { email: username, role: "admin", isDeleted: false },
  });
  console.log("checkuser: ", checkuser);
  if (checkuser) {
    if (checkuser.isActive) {
      let loginDetail = {};
      bcrypt.compare(pass, checkuser.password, async function (err, results) {
        if (err) {
          console.log("error", err);
        }
        console.log("results: ", results);
        if (results == true) {
          const token = jwt.sign(
            {
              userId: checkuser.id,
              email: checkuser.email,
              name: checkuser.firstName + checkuser.lastName,
              role: "admin",
            },
            "secret_key"
          );

          res.json({
            status: true,
            message: "Login Successfully",
            data: {
              userDetails: checkuser,
              token: token,
            },
          });
        } else {
          res.json({
            status: false,
            message: "Password does not Match!",
          });
        }
      });
      console.log(loginDetail, "loginDetail");
    } else {
      res.json({
        status: false,
        message: "User is Not Active. Please Verify the Account!",
      });
    }
  } else {
    res.json({
      status: false,
      message: "user Does Not Exists!",
    });
  }
};

module.exports = {
  adminUserLogin,
};
