const courseService = require("../services/courseService");

const courseAdd = (req, res) => {
  courseService
    .register(req.body, req.file, req.user)
    .then(() =>
      res.status(200).send({
        status: 200,
        data: "You have been registered successfully!.",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err_msg: err.message,
      })
    );
};

const courseGetAll = (req, res) => {
  courseService
    .list(req.user, req.query.size, req.query.page, req.query.categoryId)
    .then((course) => {
      res.status(200).send({
        status: 200,
        data: course,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};


const courseUpdate = (req, res) => {
  const id = req.params.id;
  courseService
    .update(req.body, id, req.file, req.user)
    .then((course) => {
      res.status(200).send({
        status: 200,
        data: "Your Data has been Updated",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const courseDelete = (req, res, next) => {
  const id = req.params.id;

  courseService
    .soft_delete(id, req.user)
    .then((course) =>
      res.status(200).send({
        status: 200,
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
  courseUpdate,
  courseDelete,
};
