import { InputSKU } from "./modelSKU";
import { CleanSKU } from "./skuClass";
import { SKUduty } from "./skuClassDuty";

export class CleanUpData {
  cleanData: CleanSKU[] = [];

  async dataClean(dataDB: InputSKU[]) {
    for (let x = 0; x < dataDB.length; x++) {
      const priceNumber = Number(dataDB[x]!.ExWorks_Price.slice(1));

      const abvNumber = Number(dataDB[x]!.ABV.replace("%", ""));

      const sizeNumber = Number(dataDB[x]!.Size_CL.replace("cl", "")) / 100;

      this.cleanData.push(
        new CleanSKU(
          dataDB[x]!.Brand,
          dataDB[x]!.SKU_Name,
          dataDB[x]!.Category,
          dataDB[x]!.Segment,
          dataDB[x]!.Import_Country,
          abvNumber,
          sizeNumber,
          priceNumber,
        ),
      );
      // console.log(this.cleanData);
    }
  }
}

// const app = new CleanUpData();
// app.dataClean();
