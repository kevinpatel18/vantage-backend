const eventService = require("../services/eventService");

const eventAdd = (req, res) => {
  eventService
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
const eventUpdate = (req, res) => {
  eventService
    .update(req.body, req.params.id, req.user)
    .then(() =>
      res.status(200).send({
        status: true,
        data: "You have been Updated successfully!.",
      })
    )
    .catch((err) =>
      res.status(400).send({
        status: false,
        message: err.message,
      })
    );
};

const eventGetAll = (req, res) => {
  eventService
    .list(req.user, req.query.size, req.query.page)
    .then((event) => {
      res.status(200).send({
        status: true,
        data: event,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const eventDelete = (req, res, next) => {
  const id = req.params.id;

  eventService
    .soft_delete(id, req.user)
    .then((event) =>
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
  eventAdd,
  eventUpdate,
  eventGetAll,
  eventDelete,
};
