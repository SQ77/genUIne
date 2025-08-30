import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

app.get("/api/chat", (req, res) => {
    console.log("Received:", req.body); 
    res.json({ reply: "Hello, I am genUIne" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
