const galleryService = require("../services/galleryService");

const galleryAdd = (req, res) => {
  galleryService
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
const galleryUpdate = (req, res) => {
  galleryService
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

const galleryGetAll = (req, res) => {
  galleryService
    .list(req.user, req.query.size, req.query.page)
    .then((gallery) => {
      res.status(200).send({
        status: true,
        data: gallery,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const galleryDelete = (req, res, next) => {
  const id = req.params.id;

  galleryService
    .soft_delete(id, req.user)
    .then((gallery) =>
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
  galleryAdd,
  galleryUpdate,
  galleryGetAll,
  galleryDelete,
};
