const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sql = require("mssql");

const dbConfig = require("./app/config/db.config");
const taskRoutes = require("./app/routes/tasks");
const pageRoutes = require("./app/routes/pages");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sql
  .connect(dbConfig.sql)
  .then(() => {
    console.log("Veri Tabanı Bağlantısı Başarılı!");
  })
  .catch((err) => {
    console.log("Veri Tabanı Bağlantı Hatası: ", err);
  });

app.use("/tasks", taskRoutes.router);
app.use("/", pageRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Sayfa Bulunamadı!" });
});

app.listen(dbConfig.port, () => {
  console.log(`API Çalışıyor.. => http://${dbConfig.host}:${dbConfig.port}`);
});
