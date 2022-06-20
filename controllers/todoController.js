const { TodoModel } = require('../db/sequelize');
const fs = require('fs');
/*B-addConstants*/

/*Code injected by: Images-alterAddConstants*/
const { IMAGE_FOLDER_PATH } = require('../constants');
/*Code injected by: Images-alterAddConstants*/


exports.list = async function (req, res) {
  const todos = await TodoModel.findAll();
  res.send({ "list": todos });
}

exports.pendingTask = async function (req, res) {
  const pendingList = await TodoModel.findAll({ where: { 'state': 'OPEN' } });
  res.send({ "list": pendingList });
}

exports.closedTask = async function (req, res) {
  const closedList = await TodoModel.findAll({ where: { 'state': 'CLOSE' } });
  res.send({ "list": closedList });
}

/*B-addMethods*/

/*Code injected by: OrderByTitle-alterToDoController*/
exports.listOrderedPending = async function (req, res) {
      const todos = await TodoModel.findAll({
        where: { 'state': 'OPEN' }, order: [['message', req.params.direction]]
      });
      res.send({ "list": todos });
    }

    exports.listOrderedClosed = async function (req, res) {
      const todos = await TodoModel.findAll({
        where: { 'state': 'CLOSE' }, order: [['message', req.params.direction]]
      });
      res.send({ "list": todos });
    }
/*Code injected by: OrderByTitle-alterToDoController*/


exports.add = async (req, res) => {
  let imageName = '';
  /*B-addMethodInstructions*/

/*Code injected by: Images-alterAddMethodInstructions*/
if (req.files && req.files.file && req.files.file.name) {
        imageName = `${Date.now()}_${req.files.file.name}`;
        const newpath = `${IMAGE_FOLDER_PATH}/${imageName}`;
        fs.writeFileSync(newpath, req.files.file.data);
      }
/*Code injected by: Images-alterAddMethodInstructions*/

  await TodoModel.create({
    message: req.body.task,
    state: "OPEN",
    image: imageName,
  });
  return res.send({ "res": "valid" });

};

exports.delete = async (req, res) => {
  const id = req.params.id;
  /*B-addDeleteMethodInstructions*/

/*Code injected by: Images-alterControllerImage*/
await TodoModel.findAll({ where: { 'id': id } }).then(data => {
      if (data[0].dataValues.image && data[0].dataValues.image != '') {
        const newpath = `${IMAGE_FOLDER_PATH}/${data[0].dataValues.image}`;
        try {
          fs.unlinkSync(newpath);
        } catch (err) {
          console.error(err);
        }
      }
    });
/*Code injected by: Images-alterControllerImage*/

  await TodoModel.destroy({ where: { id: id } });
  res.send({});
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const state = req.params.state;
  const updatedTodo = {
    state
  };

  await TodoModel.update(updatedTodo, { where: { id: id } });
  res.send({});
};
