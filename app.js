const express = require("express");
let adminRouter = require("./routes/admin1");

const app = express();

app.use(express.json());
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("hey!");
});

app.listen(4003);
