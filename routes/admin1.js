const express = require("express");
const { Admin, User, Course } = require("../DB/index1");
var jwt = require("jsonwebtoken");
let { JWT_token } = require("../secrat_key/token");
const adminMiddlewares = require("../MidleWares/admin");
const router = express.Router();

router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  let admin1 = new Admin({
    username: username,
    password: password,
  });
  let ans1 = await admin1.save();
  console.log(ans1);
  res.json({
    message: "admin create successfully",
  });
});

router.post("/signin", async (req, res) => {
  let { username, password } = req.body;
  let findAdmin = await Admin.findOne({ username }, { password });
  console.log(findAdmin);
  if (findAdmin) {
    let token = jwt.sign({ username }, JWT_token);
    res.json({
      token: token,
    });
  } else {
    res.status(400).json({
      message: "admin not find",
    });
  }
});

router.post("/course", adminMiddlewares, async (req, res) => {
  let { title, Price, description, Duration, imageLink } = req.body;
  let addCourse = await Course.create({
    title,
    Price,
    description,
    Duration,
    imageLink,
  });
  res.json({
    message: "Course added succesfully",
    courseId: addCourse._id,
  });
});

module.exports = router;
