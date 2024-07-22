const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const taskRoutes = require("../routes/tasks");

const router = express.Router();

router.get("/", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "homepage.html"));
  res.render("homepage", { pageTitle: "Anasayfa | ToDo List App" });
});

router.get("/todolist", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "todolistpage.html"));
  res.render("todolistpage", { pageTitle: "To-Do | ToDo List App", data: taskRoutes.taskData });
});

module.exports = router;
