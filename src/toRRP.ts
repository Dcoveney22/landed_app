import { DeliveredSKU } from "./deliveredSKU";
import { RRPSKU } from "./rrpSKU";

export class RRPCalculator {
  rrpInventory: RRPSKU[] = [];

  async rrpCalc(deliveredPrice: DeliveredSKU[]) {
    const retailMargin = 1.27;

    for (let x = 0; x < deliveredPrice.length; x++) {
      if (deliveredPrice[x] !== undefined) {
        const item = deliveredPrice[x]!;
        let rrp = 0;
        rrp = item.Delivered_Price * retailMargin;

        this.rrpInventory.push(new RRPSKU(item, rrp));
      }
      console.log(this.rrpInventory);
    }
  }
}
