import { CleanSKU } from "./skuClass";
import { DeliveredSKU } from "./deliveredSKU";
import { DutySKU } from "./dutySKU";

//Array of string including countries

export class LogisticsCostCalculator {
  deliveredPriceInventory: DeliveredSKU[] = [];

  async logisticsCalc(exWorks_Duty: DutySKU[]) {
    const goodsIn = 0.16;
    const warehouseRent = 0.36;
    const deliveryCost = 0.85;
    const euShipping = 1.0;
    const internationalShipping = 3.0;
    const bbbCosts = goodsIn + warehouseRent + deliveryCost;
    const europeArray = [
      "France",
      "England",
      "Holland",
      "Spain",
      "Italy",
      "Scotland",
      "Ireland",
      "Germany",
    ];
    for (let x = 0; x < exWorks_Duty.length; x++) {
      let deliv_Price = 0;
      if (europeArray.includes(exWorks_Duty[x]!.Import_Country)) {
        deliv_Price = exWorks_Duty[x]!.Sale_Price + euShipping + bbbCosts;
      } else {
        // everything else is international
        deliv_Price =
          exWorks_Duty[x]!.Sale_Price + internationalShipping + bbbCosts;
      }

      this.deliveredPriceInventory.push(
        new DeliveredSKU(exWorks_Duty[x]!, deliv_Price),
      );
    }
    // console.log(this.deliveredPriceInventory);
  }
}
