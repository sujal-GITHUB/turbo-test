import express from "express";
import { client } from "@repo/db/client";
const app = express();
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await client.user.create({
      data: {
        username,
        password,
      },
    });

    res.json({
      message: "User created successfully",
      id: user.id,
    });
  } catch (err) {
    console.error(err); // log for debugging
    res.status(500).json({
      error: "Something went wrong while creating the user",
    });
  }
});


app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
