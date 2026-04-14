import { Client } from "pg";
import { CleanUpData } from "./dataClean";
import { InputSKU } from "./modelSKU";
import { AppErrorClass } from "./errorClass";

import dotenv from "dotenv";

export class InventoryPackDB {
  inventoryDataArray: InputSKU[] = [];

  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  async loadInventoryDB() {
    try {
      await this.client.connect();
      await this.getInventoryDB();
      await this.client.end();
    } catch (error) {
      throw new AppErrorClass(500, "Something went wrong");
    }
  }

  async getInventoryDB() {
    try {
      const res = await this.client.query("SELECT * FROM landed_products");
      if (!res) {
        const err = new AppErrorClass(400, "There was an issue with the data");
        throw err;
      }
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
    } catch (error) {
      throw new AppErrorClass(500, "Something went wrong");
    }
  }
}
