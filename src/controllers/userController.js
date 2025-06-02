const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminUserLogin = async (req, res) => {
  var username = req.body.email;
  var pass = req.body.password;
  console.log("username: ", username);
  console.log(
    "pass: ",
    await db.userDetails.findOne({
      where: { role: "admin", isDeleted: false },
    })
  );
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

const getAdminDetails = async (req, res) => {
  const list = await db.userDetails.findOne({
    where: {
      role: "admin",
      isDeleted: false,
    },
  });
  if (list) {
    return res.json({
      status: true,
      data: list,
    });
  } else {
    return res.json({
      status: false,
      message: "user Does Not Exists!",
    });
  }
};
const updateAdminProfile = async (req, res) => {
  const checkUser = await db.userDetails.findOne({
    where: {
      email: req.body.email,
      isDeleted: false,
    },
  });
  if (checkUser) {
    const newData = {
      firstName: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      aboutUs: req.body.aboutUs,
      winningAward: req.body.winningAward,
      completedProject: req.body.completedProject,
      clientReview: req.body.clientReview,
      teamMember: req.body.teamMember,
      facebookLink: req.body.facebookLink,
      twitterLink: req.body.twitterLink,
      linkedinLink: req.body.linkedinLink,
      instagramLink: req.body.instagramLink,
    };

    await db.userDetails.update(newData, {
      where: { id: req.params.id },
    });

    return res.json({
      status: true,
      data: "Record Updated Succesfully!",
    });
  } else {
    return res.json({
      status: false,
      message: "user Does Not Exists!",
    });
  }
};

module.exports = {
  adminUserLogin,
  getAdminDetails,
  updateAdminProfile,
};
