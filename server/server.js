const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./utils/swagger-output.json");
const mongoose = require("mongoose");
const elementRoutes = require("./routes/ElementRoutes");
const authRoutes = require("./routes/AuthRoutes");
const requestdemoRoutes = require("./routes/RequestDemoRoutes");
const studentRoutes = require("./routes/StudentRoutes");
const teacherRoutes = require("./routes/TeacherRoutes");
const helpcenterroutes = require("./routes/HelpCenterRoutes");
const classRoutes = require("./routes/ClassRoutes")
const subjectRoutes = require("./routes/SubjectRoutes");
const sectionRoutes = require("./routes/SectionRoute")
const userRoutes = require("./routes/UserRoutes")
const AuthGuard = require("./middleware/AuthGuard");
const RoleGuard = require("./middleware/RoleGuard");
const { ping } = require("./controllers/AuthController");
const utilsRoute = require("./routes/UtilsRoutes")

const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/ping",AuthGuard, ping)
app.use("/api", utilsRoute)
app.use("/permission", elementRoutes);
app.use("/auth", authRoutes);
app.use("/helpcenter", helpcenterroutes);
app.use("/requestdemo", requestdemoRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/class", classRoutes);
app.use("/subject", subjectRoutes);
app.use("/section", sectionRoutes)
app.use("/user", userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
