const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please enter the credentials" });
  }
  let checkUsername = await Admin.findOne({ username });
  if (checkUsername) {
    res.status(400).json({ message: "Username exists" });
  }
  await Admin.create({
    username,
    password,
  });
  res.status(201).json({ message: "Admin Successfully created!" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  if (
    [title, description, price, imageLink].some((field) => field?.trim() === "")
  ) {
    res.status(400).json({ message: "Please enter all the fields" });
  }

  let course = await Course.create({
    title,
    description,
    price,
    imageLink,
  });

  res.status(201).json({
    message: "Course Created Successfully!",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  let courses = await Course.find({});

  if (!courses) {
    res.status(400).json({ message: "No courses are found!!" });
  }
  res.status(200).json({ message: "fetched successfully", courses });
});

module.exports = router;
