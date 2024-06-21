const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/web");
}

main().then((res) => {
  console.log(`Connected`);
});

// for course
const courseSchema = new Schema({
  title: String,
  Price: Number,
  description: String,
  Duration: Number,
  imageLink: String,
});

// for admin
const adminSchema = new Schema({
  username: String,
  password: String,
});

// for user
const userSchema = new Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Course,
  Admin,
  User,
};
