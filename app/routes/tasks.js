const express = require("express");
const sql = require("mssql");

const router = express.Router();

router.post("/postOne", async (req, res) => {
  const TITLE = req.body?.title;
  const DESCRIPTION = req.body?.description;

  if (!TITLE || !DESCRIPTION) {
    return res
      .status(400)
      .send({ message: "Başlık ve açıklama alanları zorunlu alan!" });
  }

  const CREATED_DATE = new Date();
  const STATUS = false;

  try {
    await new sql.Request()
      .input("TITLE", TITLE)
      .input("DESCRIPTION", DESCRIPTION)
      .input("CREATED_DATE", CREATED_DATE)
      .input("STATUS", STATUS)
      .query(
        "INSERT INTO Tasks (TITLE, DESCRIPTION, CREATED_DATE, STATUS) VALUES (@TITLE, @DESCRIPTION, @CREATED_DATE, @STATUS)"
      );

    res.redirect("/todolist");
  } catch (error) {
    res.status(500).send({ message: "Veri tabanı hatası meydana geldi!" });
  }
});

router.put("/putOne/:taskId", async (req, res) => {
  const taskId = req.params.taskId || null;

  const { ID, TITLE, DESCRIPTION } = req.body;

  if (!taskId || !TITLE || !DESCRIPTION) {
    return res
      .status(400)
      .send({ message: "Task ID, title veya description değeri hatalı!" });
  }

  try {
    await new sql.Request()
      .input("id", ID)
      .input("title", TITLE)
      .input("description", DESCRIPTION)
      .query(
        "UPDATE Tasks SET TITLE = @title, DESCRIPTION = @description WHERE ID = @id"
      );

    res.status(200).send({ message: "İşlem Başarılı! " });
  } catch (error) {
    res.status(500).send({ message: "Veri tabanı hatası meydana geldi!" });
  }
});

router.delete("/deleteOne/:taskId", async (req, res) => {
  const taskId = req.params?.taskId || null;

  if (!taskId) {
    return res.status(400).send({ message: "Geçersiz Task ID!" });
  }

  try {
    await new sql.Request()
      .input("taskId", taskId)
      .query("DELETE FROM Tasks WHERE ID = @taskId");

    res.status(200).send({ message: "İşlem Başarılı! " });
  } catch (error) {
    res.status(500).send({ message: "Veri tabanı hatası meydana geldi!" });
  }
});

exports.router = router;
