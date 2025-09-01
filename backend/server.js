import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if you need cookies or auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// connecting  to database
connectDB();

// authentication routes 
app.use('/api/auth',UserRoutes);

// task routes
app.use('/api/tasks',TaskRoutes);

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`App started on ${port}`);
});