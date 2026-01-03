require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");

const Employee = require("./models/Employee");
const User = require("./models/User");
const Payroll = require("./models/Payroll");

const app = express();
connectDB();

// ------------------ MIDDLEWARE ------------------
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "hrms_secret",
    resave: false,
    saveUninitialized: false
  })
);

// ------------------ ROUTES ------------------
app.use("/", require("./routes/authRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/leave", require("./routes/leaveRoutes"));

// ------------------ LOGIN (TEMP) ------------------
app.post("/user/login", (req, res) => {
  console.log(req.body.userlogin);
  console.log(req.body.passwordlogin);
  res.redirect("/dashboard/employee");
});

// ------------------ REGISTER EMPLOYEE (ADMIN) ------------------
app.get("/employee/register", (req, res) => {
  res.render("auth/register");
});

app.post("/employee/auth/register", async (req, res) => {
  try {
    // 1️⃣ Create Employee
    const employee = new Employee({
      name: req.body.userregister,
      department: req.body.department,
      designation: req.body.designation,
      phone: req.body.mobilenumber,
      email: req.body.email,
      address: req.body.address
    });

    await employee.save();

    // 2️⃣ Create User (LOGIN ACCOUNT)
    const user = new User({
      email: req.body.email,
      password: req.body.passwordregister, // hash later
      role: "employee",
      employeeRef: employee._id
    });

    await user.save();

    // 3️⃣ Redirect to Admin Dashboard
    res.redirect("/dashboard/admin");

  } catch (err) {
    console.log(err);
    res.send("Error registering employee");
  }
});

// ------------------ DASHBOARDS ------------------
app.get("/dashboard/admin", async (req, res) => {
  const employees = await Employee.find();
  res.render("dashboard/admin", { employees });
});

app.get("/dashboard/employee", (req, res) => {
  res.render("dashboard/employee");
});

// ------------------ PAYROLL ------------------
app.get("/employee/payroll", async (req, res) => {
  try {
    // fetch all payroll records
    const payroll = await Payroll.find()
      .populate("employeeId", "name"); // optional but recommended

    res.render("payroll/view", { payroll });
  } catch (err) {
    console.log(err);
    res.send("Error fetching payroll data");
  }
});


// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is Running at PORT : ${PORT}`)
);
app.get("/user/login",(req,res)=>{
    
})