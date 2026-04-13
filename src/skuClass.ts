//Make super class?? With NULL properties.

export class CleanSKU {
  Brand: string;
  SKU_Name: string;
  Category: string;
  Segment: string;
  Import_Country: string;
  ABV: number;
  Size_CL: number;
  Sale_Price: number;

  constructor(
    Brand: string,
    SKU_Name: string,
    Category: string,
    Segment: string,
    Import_Country: string,
    ABV: number,
    Size_CL: number,
    ExWorks_Price: number
  ) {
    this.Brand = Brand;
    this.SKU_Name = SKU_Name;
    this.Category = Category;
    this.Segment = Segment;
    this.Import_Country = Import_Country;
    this.ABV = ABV;
    this.Size_CL = Size_CL;
    this.Sale_Price = ExWorks_Price;
  }
}

//Brand, SKU_Name, Category, Segment, Import_Country, ABV, Size_CL, ExWorks_Price
