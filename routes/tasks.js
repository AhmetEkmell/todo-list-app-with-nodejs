const express = require("express");
const sql = require("mssql");

const router = express.Router();

const taskData = [];

router.get("/getAll", (req, res) => {
  new sql.Request().query("SELECT * FROM Tasks", (err, result) => {
    if (err) {
      return res.status(404).send({ errorCode: "ERR-001", errorMessage: "Taskler Getirilemedi!" });
    }

    res.send(result.recordset);
  });
});

router.post("/postOne", (req, res) => {
  const title = req.body?.title;
  const description = req.body?.description;

  if (!title) {
    return res.status(400).send({ errorMessage: "Başlık zorunlu alan!" });
  }

  const createdDate = new Date();
  const isCompleted = false;
  const taskId = taskData.length + 1;

  console.log("Task Data: ", taskData);
  taskData.push({ taskId, title, description, createdDate, isCompleted });

  res.redirect("/");
});

router.put("/putOne/:taskId", (req, res) => {});

router.delete("/deleteOne/:taskId", (req, res) => {});

exports.router = router;
exports.taskData = taskData;
