//Make super class?? With NULL properties.

import { CleanSKU } from "./skuClass";

export class DutySKU extends CleanSKU {
  Duty: number;
  Sale_Price: number;

  constructor(
    cleanSKU: CleanSKU,

    Duty: number,
    Sale_Price: number
  ) {
    super(
      cleanSKU.Brand,
      cleanSKU.SKU_Name,
      cleanSKU.Category,
      cleanSKU.Segment,
      cleanSKU.Import_Country,
      cleanSKU.ABV,
      cleanSKU.Size_CL,
      cleanSKU.Sale_Price
    );
    this.Duty = Duty;
    this.Sale_Price = Sale_Price;
  }
}

//Brand, SKU_Name, Category, Segment, Import_Country, ABV, Size_CL, ExWorks_Price
