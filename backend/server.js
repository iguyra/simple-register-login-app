const express = require("express");
const dotenv = require("dotenv");
const next = require("next");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const userRoute = require("./routes/userRoutes");
const errorController = require("./controllers/errorController");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DATABASE CONNECTED! ISAVE`));

nextApp
  .prepare()
  .then(() => {
    const app = express();

    // MIDDLEWARES
    app.use(express.json());
    app.use(cookieParser());

    if (process.env.NODE_ENV === "production") {
      console.log("from server prodcution");
      app.use(express.static(path.join(__dirname, ".next")));
    }

    //ROUTES
    app.use("/api/users", userRoute);

    app.use(errorController);

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`>>> SERVER STARTED ON PORT ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
