import express from "express";
import { App } from "./src/main";
import dotenv from "dotenv";
import { InputSKU } from "./src/modelSKU";
import { AppErrorClass } from "./src/errorClass";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/priceCheck", async (_req, res) => {
  try {
    const priceTree = new App();
    let data = await priceTree.main();
    res.json(data);
  } catch (error) {
    res.status(500).send(new AppErrorClass(500, "Something went wrong"));
  }
});

app.post("/csvData", async (_req, res) => {
  try {
    let skuObjectArray: InputSKU[] = [];
    let fullData = await _req.body;
    let data = fullData.slice(1);
    if (data.length <= 0) {
      const err = new AppErrorClass(400, "There is no data");
      res.status(400).send(err);
    } else {
      data.forEach((item: string) => {
        const inventoryData = item.split(",");
        skuObjectArray.push(
          new InputSKU(
            inventoryData[0]!,
            inventoryData[1]!,
            inventoryData[2]!,
            inventoryData[3]!,
            inventoryData[4]!,
            inventoryData[5]!,
            inventoryData[6]!,
            inventoryData[7]!,
          ),
        );
      });
      const priceTree = new App();
      let response = await priceTree.main(skuObjectArray);
      res.json(response);
    }
  } catch (error) {
    res.status(500).send(new AppErrorClass(500, "Something went wrong"));
  }
});

// STATIC FILES //
app.use(express.static("./"));
// Fire it up //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
