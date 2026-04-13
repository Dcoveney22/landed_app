import { RRPCalculator } from "./toRRP";
import { CleanUpData } from "./dataClean";
import { DutyCalculator } from "./dutyCalculator";
import { LogisticsCostCalculator } from "./logisticsCostCalculator";
import { InventoryPackDB } from "./pullDataDB";
import { PriceCheck } from "./priceCheck";
import dotenv from "dotenv";
dotenv.config();

export class App {
  async main() {
    let inventoryPackDB = new InventoryPackDB();
    await inventoryPackDB.loadInventoryDB();
    // console.log(inventoryPackDB.inventoryDataArray);

    // data clean
    let cleanUpData = new CleanUpData();
    await cleanUpData.dataClean(inventoryPackDB.inventoryDataArray);
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
