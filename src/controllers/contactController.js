const contactService = require("../services/contactService");

const contactAdd = (req, res) => {
  contactService
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

const contactGetAll = (req, res) => {
  contactService
    .list(req.user, req.query.size, req.query.page)
    .then((contact) => {
      res.status(200).send({
        status: true,
        data: contact,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const contactDelete = (req, res, next) => {
  const id = req.params.id;

  contactService
    .soft_delete(id, req.user)
    .then((contact) =>
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
const contactUpdateComment = (req, res, next) => {
  const id = req.params.id;

  contactService
    .updateComment(id, req.body, req.user)
    .then((contact) =>
      res.status(200).send({
        status: true,
        data: " Data has been Updated ! ",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err: err.message,
      })
    );
};

module.exports = {
  contactAdd,
  contactGetAll,
  contactDelete,
  contactUpdateComment,
};
