require("express-async-errors");

const migrationsRun = require("./database/sqlite/")
const AppError = require("./utils/AppError")
const uploadConfig = require("./config/upload")


const express = require("express");

const routes = require("./routes");

migrationsRun()

const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

app.use((error, req, res, next)=> {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Estou na porta ${PORT}`));  