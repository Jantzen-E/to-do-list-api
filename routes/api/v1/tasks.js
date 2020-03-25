var express = require("express");
var router = express.Router();
const DAL = require('../../../dataAccessLayer');
/* GET home page. */
router.get("/", async function(req, res) {
  const result = await DAL.Find(null, req.app.locals.tasksCollection);
  res.send(result);
});

router.get("/:listID", async function(req, res) {
  const id = req.params.listID;
  // const task = {
  //   _id: ObjectId(id)
  // };
  const result = await DAL.Find({listID: id}, req.app.locals.tasksCollection);
  if (result) {
    res.send(result);
  } else {
    res.send("No to do items with ID: " + id + " found!");
  }
});

router.post("/", async function(req, res) {
  const task = req.body;
  if (task.listID && task.description && task.status && task.specificTask) {
    const result = await DAL.Insert(task, req.app.locals.tasksCollection);
    res.json(result);
  } else {
    res.send("failed to create a task");
  }
});

module.exports = router;
