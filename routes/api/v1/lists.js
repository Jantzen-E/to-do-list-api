var express = require("express");
var router = express.Router();
const DAL = require('../../../dataAccessLayer');

/* GET home page. */
router.get("/", async function(req, res) {
  const result = await DAL.Find(null, req.app.locals.listsCollection);
  res.send(result);
});

router.get("/api/lists/:id", async function(req, res) {
    const id = req.params.id;
    const list = {
      _id: ObjectId(id)
    };
    const result = await DAL.Find(null, req.app.locals.listsCollection);
    if (result) {
      res.send(result);
    } else {
      res.send("No to do items with ID: " + id + " found!");
    }
  });
  
  router.post("/", async function(req, res) {
    const list = req.body;
    console.log(req.body)
    if (list.name && list.description && list.due) {
      const result = await DAL.Insert(list, req.app.locals.listsCollection);
      res.send(result);
    } else {
      res.send("failed to create a list");
    }
  });
  
  module.exports = router;