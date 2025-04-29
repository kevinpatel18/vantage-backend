const brandService = require("../services/brandService");

const brandAdd = (req, res) => {
  brandService
    .register(req.body, req.file, req.user)
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
const brandUpdate = (req, res) => {
  brandService
    .update(req.body, req.params.id, req.file, req.user)
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

const brandGetAll = (req, res) => {
  brandService
    .list(req.user, req.query.size, req.query.page)
    .then((brand) => {
      res.status(200).send({
        status: true,
        data: brand,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const brandDelete = (req, res, next) => {
  const id = req.params.id;

  brandService
    .soft_delete(id, req.user)
    .then((brand) =>
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
  brandAdd,
  brandUpdate,
  brandGetAll,
  brandDelete,
};
