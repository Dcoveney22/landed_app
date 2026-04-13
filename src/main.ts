import { RRPCalculator } from "./toRRP";
import { CleanUpData } from "./dataClean";
import { DutyCalculator } from "./dutyCalculator";
import { LogisticsCostCalculator } from "./logisticsCostCalculator";
import { InventoryPackDB } from "./pullDataDB";
import { PriceCheck } from "./priceCheck";
import dotenv from "dotenv";
import { InputSKU } from "./modelSKU";
dotenv.config();

export class App {
  async main(csvData?: InputSKU[]) {
    let processingData: InputSKU[];
    if (!csvData) {
      let inventoryPackDB = new InventoryPackDB();
      await inventoryPackDB.loadInventoryDB();
      processingData = inventoryPackDB.inventoryDataArray;
    } else {
      processingData = csvData;
    }

    // data clean
    let cleanUpData = new CleanUpData();
    await cleanUpData.dataClean(processingData);
    // console.log(cleanUpData.cleanData);

    //add Duty

    let dutyCalculator = new DutyCalculator();
    await dutyCalculator.dutyCalc(cleanUpData.cleanData);

    // Logistics Costs

    let logisticsCostCalculator = new LogisticsCostCalculator();
    await logisticsCostCalculator.logisticsCalc(dutyCalculator.newInventory);

    // create RRP

    let rrpCalculator = new RRPCalculator();
    await rrpCalculator.rrpCalc(
      logisticsCostCalculator.deliveredPriceInventory,
    );
    // Print to file anything that needs reviewing

    let priceCheck = new PriceCheck();
    await priceCheck.priceCheck(rrpCalculator.rrpInventory);
    return priceCheck.priceTreeArray;
    // console.log(rrpCalculator.rrpInventory);
  }
}

// const app = new App();
// app.main();
