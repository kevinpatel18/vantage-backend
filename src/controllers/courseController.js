const courseService = require("../services/courseService");

const courseAdd = (req, res) => {
  courseService
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

const courseGetAll = (req, res) => {
  courseService
    .list(req.user, req.query.size, req.query.page)
    .then((course) => {
      res.status(200).send({
        status: true,
        data: course,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};
const courseGetById = (req, res) => {
  courseService
    .listbyid(req.user, req.params.id)
    .then((course) => {
      res.status(200).send({
        status: true,
        data: course,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const courseUpdate = (req, res) => {
  const id = req.params.id;
  courseService
    .update(req.body, id, req.file, req.user)
    .then((course) => {
      res.status(200).send({
        status: true,
        data: "Your Data has been Updated",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};
const courseAdminGetAll = (req, res) => {
  courseService
    .adminList(req.user, req.query.size, req.query.page)
    .then((course) => {
      res.status(200).send({
        status: true,
        data: course,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};
const courseDuplicate = (req, res) => {
  const id = req.params.id;
  courseService
    .duplicate(id, req.user)
    .then((course) => {
      res.status(200).send({
        status: true,
        data: "Your Data has been Updated",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const courseDelete = (req, res, next) => {
  const id = req.params.id;

  courseService
    .soft_delete(id, req.user)
    .then((course) =>
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
  courseAdd,
  courseGetAll,
  courseGetById,
  courseUpdate,
  courseDelete,
  courseAdminGetAll,
  courseDuplicate,
};
