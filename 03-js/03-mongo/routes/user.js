const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please enter the credentials" });
  }
  let checkUsername = await User.findOne({ username });
  if (checkUsername) {
    res.status(400).json({ message: "Username exists" });
  }
  await User.create({
    username,
    password,
  });
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    let courses = await Course.find({});

  if (!courses) {
    res.status(400).json({ message: "No courses are found!!" });
  }
  res.status(200).json({ message: "fetched successfully", courses });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router