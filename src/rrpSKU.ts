//Make super class?? With NULL properties.

import { DeliveredSKU } from "./deliveredSKU";
import { DutySKU } from "./dutySKU";

export class RRPSKU extends DeliveredSKU {
  RRP: number;

  constructor(deliveredSKU: DeliveredSKU, RRP: number) {
    super(deliveredSKU, deliveredSKU.Delivered_Price);
    this.RRP = RRP;
  }
}

//Brand, SKU_Name, Category, Segment, Import_Country, ABV, Size_CL, ExWorks_Price
