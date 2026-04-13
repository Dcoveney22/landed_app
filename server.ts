import express from "express";
import { App } from "./src/main";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.post("/priceCheck", async (_req, res) => {
  const priceTree = new App();
  let data = await priceTree.main();

  res.json(data);
});

// STATIC FILES //
app.use(express.static("./"));
// Fire it up //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
