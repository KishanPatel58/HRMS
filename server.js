require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");
const User = require("./models/User");


const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(session({
    secret: "hrms_secret",
    resave: false,
    saveUninitialized: false
}));

app.use("/", require("./routes/authRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/leave", require("./routes/leaveRoutes"));

app.post("/user/login", (req, res) => {
    console.log(req.body.userlogin)
    console.log(req.body.passwordlogin)
});


app.get("/employee/register", (req, res) => {
    res.render("auth/register")
})
app.post("/employee/auth/register", async (req, res) => {

    try {
        const employee = new Employee({
            name: req.body.userregister,          // mapping
            department: req.body.department,
            designation: req.body.designation,
            phone: req.body.mobilenumber,
            email: req.body.email,
            address: req.body.address
        });
        await employee.save();
        const user = new User({
            name: req.body.userregister,          // mapping
            department: req.body.department,
            designation: req.body.designation,
            phone: req.body.mobilenumber,
            email: req.body.email,
            address: req.body.address
        });
        await user.save();
    } catch (err) {
        console.log(err);
    }
})
app.get("/admin/dashboard", (req, res) => {
    res.render("dashboard/admin")
})
app.get("/dashboard/employee", (req, res) => {
    res.render("dashboard/employee")
})

app.listen(process.env.PORT || 5000, () => console.log(`Server is Running at PORT : ${process.env.PORT}`));