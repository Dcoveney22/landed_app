//Make super class?? With NULL properties.

export class InputSKU {
  Brand: string;
  SKU_Name: string;
  Category: string;
  Segment: string;
  Import_Country: string;
  ABV: string;
  Size_CL: string;
  ExWorks_Price: string;

  constructor(
    Brand: string,
    SKU_Name: string,
    Category: string,
    Segment: string,
    Import_Country: string,
    ABV: string,
    Size_CL: string,
    ExWorks_Price: string
  ) {
    this.Brand = Brand;
    this.SKU_Name = SKU_Name;
    this.Category = Category;
    this.Segment = Segment;
    this.Import_Country = Import_Country;
    this.ABV = ABV;
    this.Size_CL = Size_CL;
    this.ExWorks_Price = ExWorks_Price;
  }
}

//Brand, SKU_Name, Category, Segment, Import_Country, ABV, Size_CL, ExWorks_Price
