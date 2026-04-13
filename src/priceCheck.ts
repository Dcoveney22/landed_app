import { DeliveredSKU } from "./deliveredSKU";
import { RRPSKU } from "./rrpSKU";
import { writeFileSync } from "fs";

export class PriceCheck {
  priceTreeArray: string[] = [];
  async priceCheck(finalPriceList: RRPSKU[]) {
    for (let x = 0; x < finalPriceList.length; x++) {
      const category = finalPriceList[x]!.Category;
      const rrp = finalPriceList[x]!.RRP;
      const brand = finalPriceList[x]!.Brand;
      const sku = finalPriceList[x]!.SKU_Name;

      if (category === "Gin" && rrp > 39) {
        // writeFileSync(
        //   "data/finalList.txt",
        //   `${brand}, ${sku} needs to have its price reviewed (Gin RRP: £${rrp.toFixed(2)})\n`,
        //   { flag: "a+" },
        // );
        this.priceTreeArray.push(
          `${brand}, ${sku} needs to have its price reviewed (Gin RRP: £${rrp.toFixed(2)})`,
        );
      }

      if (category === "Liqueur" && rrp > 30) {
        // writeFileSync(
        //   "data/finalList.txt",
        //   `${brand}, ${sku} needs to have its price reviewed (Liqueur RRP: £${rrp.toFixed(2)})\n`,
        //   { flag: "a+" },
        // );
        this.priceTreeArray.push(
          `${brand}, ${sku} needs to have its price reviewed (Liqueur RRP: £${rrp.toFixed(2)})`,
        );
      }

      if (category === "Whisky" && rrp > 50) {
        // writeFileSync(
        //   "data/finalList.txt",
        //   `${brand}, ${sku} needs to have its price reviewed (Whisky RRP: £${rrp.toFixed(2)})\n`,
        //   { flag: "a+" },
        // );
        this.priceTreeArray.push(
          `${brand}, ${sku} needs to have its price reviewed (Whisky RRP: £${rrp.toFixed(2)})`,
        );
      }
    }
  }
}
