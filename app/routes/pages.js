const express = require("express");
const sql = require("mssql");
const dbConfig = require('../config/db.config');

const router = express.Router();

router.get("/", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "homepage.html"));
  res.render("homepage", { pageTitle: "Anasayfa | ToDo List App" });
});

router.get("/todolist", async (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "todolistpage.html"));
  new sql.Request().query("SELECT * FROM Tasks", (err, result) => {
    
    if (err) {
      return res.status(404).send({ errorCode: "ERR-001", errorMessage: "Yapılacaklar Listesi Getirilemedi!" });
    }

    res.render("todolistpage", { pageTitle: "Yapılacaklar | ToDo List App", data: result.recordset });
  });
});

module.exports = router;
