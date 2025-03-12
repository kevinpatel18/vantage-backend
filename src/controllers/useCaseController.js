const useCaseService = require("../services/useCaseService");

const useCaseAdd = (req, res) => {
  useCaseService
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

const useCaseGetAll = (req, res) => {
  useCaseService
    .list(req.user, req.query.size, req.query.page)
    .then((useCase) => {
      res.status(200).send({
        status: true,
        data: useCase,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

const useCaseDelete = (req, res, next) => {
  const id = req.params.id;

  useCaseService
    .soft_delete(id, req.user)
    .then((useCase) =>
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
  useCaseAdd,
  useCaseGetAll,
  useCaseDelete,
};
