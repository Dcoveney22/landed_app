import { Client } from "pg";
import { CleanUpData } from "./dataClean";
import { InputSKU } from "./modelSKU";

import dotenv from "dotenv";

export class InventoryPackDB {
  inventoryDataArray: InputSKU[] = [];

  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  // client = new Client({
  //   host: "127.0.0.1",
  //   port: 5432,
  //   database: "pricetreedb",
  //   user: "postgres",
  //   password: "p@ssword1",
  // });

  async loadInventoryDB() {
    await this.client.connect();
    await this.getInventoryDB();
    await this.client.end();
  }

  async getInventoryDB() {
    const res = await this.client.query("SELECT * FROM landed_products");
    res.rows.forEach((inventoryData) => {
      this.inventoryDataArray.push(
        new InputSKU(
          inventoryData.brand,
          inventoryData.sku_name,
          inventoryData.category,
          inventoryData.segment,
          inventoryData.import_country,
          inventoryData.abv,
          inventoryData.size_cl,
          inventoryData.exworks_price,
        ),
      );
    });
  }
}
