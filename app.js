const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sql = require("mssql");

const rootDir = require("./util/path");
const taskRoutes = require("./routes/tasks");
const pageRoutes = require("./routes/pages");

const PORT = 8083;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const dbConfig = {
  user: "sa",
  password: "1234",
  server: "DESKTOP-9M5DJQ9",
  database: "ToDoListDB",
  options: {
    encrypt: false,
  },
};

sql
  .connect(dbConfig)
  .then(() => {
    console.log("Veri Tabanı Bağlantısı Başarılı!");
  })
  .catch((err) => {
    console.log("Veri Tabanı Bağlantı Hatası: ", err);
  });

app.use("/tasks", taskRoutes.router);
app.use("/", pageRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Sayfa Bulunamadı!" });
});

app.listen(PORT, () => {
  console.log(`API Çalışıyor.. => http://localhost:${PORT}`);
});
