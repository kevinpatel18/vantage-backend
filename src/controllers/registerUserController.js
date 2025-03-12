const registerUserService = require("../services/registerUserService");

const registerUserAdd = (req, res) => {
  registerUserService
    .register(req.body, req.user)
    .then(() =>
      res.status(200).send({
        status: true,
        data: "You have been registered successfully!.",
      })
    )
    .catch((err) =>
      res.status(400).send({
        status: false,
        message: err.message,
      })
    );
};

const registerUserGetAll = (req, res) => {
  registerUserService
    .list(req.user, req.query.size, req.query.page)
    .then((registerUser) => {
      res.status(200).send({
        status: true,
        data: registerUser,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const registerUserDelete = (req, res, next) => {
  const id = req.params.id;

  registerUserService
    .soft_delete(id, req.user)
    .then((registerUser) =>
      res.status(200).send({
        status: true,
        data: " Data has been deleted ! ",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err: err.message,
      })
    );
};

module.exports = {
  registerUserAdd,
  registerUserGetAll,
  registerUserDelete,
};
