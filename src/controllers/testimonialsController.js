const testimonialsService = require("../services/testimonialsService");

const testimonialsAdd = (req, res) => {
  testimonialsService
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
const testimonialsUpdate = (req, res) => {
  testimonialsService
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

const testimonialsGetAll = (req, res) => {
  testimonialsService
    .list(req.user, req.query.size, req.query.page)
    .then((testimonials) => {
      res.status(200).send({
        status: true,
        data: testimonials,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const testimonialsDelete = (req, res, next) => {
  const id = req.params.id;

  testimonialsService
    .soft_delete(id, req.user)
    .then((testimonials) =>
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
  testimonialsAdd,
  testimonialsUpdate,
  testimonialsGetAll,
  testimonialsDelete,
};
