import express from "express";
import cors from "cors";
import { connectToDB } from "./database/db.js";
import { createUser } from "./routes/controllers/postJobs.js";

import postRoutes from "./routes/routerRoutes.js";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/users", createUser);
app.use("/", postRoutes);

const establishConnection = async () => {
  try {
    await connectToDB({ dbName: "gamingLounge" });
    startListening();
  } catch (error) {
    console.log(error);
  }
};
establishConnection();

function startListening() {
  return app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}
