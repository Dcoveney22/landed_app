//Make super class?? With NULL properties.

import { DutySKU } from "./dutySKU";

export class DeliveredSKU extends DutySKU {
  Delivered_Price: number;

  constructor(dutySKU: DutySKU, Delivered_Price: number) {
    super(dutySKU, dutySKU.Duty, dutySKU.Sale_Price);
    this.Delivered_Price = Delivered_Price;
  }
}

//Brand, SKU_Name, Category, Segment, Import_Country, ABV, Size_CL, ExWorks_Price
