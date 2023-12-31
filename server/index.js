const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute= require("./routes/messageRoute.js");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));


app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database Connected Successfully")
}).catch((err)=>{
    console.log(err.message);
});
const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
}
)
