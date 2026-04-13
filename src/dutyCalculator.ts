import { CleanSKU } from "./skuClass";

import { DutySKU } from "./dutySKU";

export class DutyCalculator {
  newInventory: DutySKU[] = [];

  //Upgrade with new constructors - push to new Array

  async dutyCalc(cleanData: CleanSKU[]) {
    // console.log(cleanData);

    // console.log(cleanData);
    for (let x = 0; x < cleanData.length; x++) {
      let duty = 0;
      let salePrice = 0;
      const abvSize = cleanData[x]!.ABV * cleanData[x]!.Size_CL;

      if (cleanData[x]!.ABV <= 22) {
        duty = (29.54 / 100) * abvSize;
        salePrice = cleanData[x]!.Sale_Price + duty;
      } else {
        duty = (32.79 / 100) * abvSize;
        salePrice = cleanData[x]!.Sale_Price + duty;
      } // console.log(cleanData);

      this.newInventory.push(new DutySKU(cleanData[x]!, duty, salePrice));
    }
    console.log(this.newInventory.length);
  }
}

// const app = new DutyCalculator();
// app.dutyCalc();
