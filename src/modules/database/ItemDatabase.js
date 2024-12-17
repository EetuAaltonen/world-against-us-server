import fs from "fs";

import ConsoleHandler from "../console/ConsoleHandler.js";

import Item from "../items/Item.js";
import GridIndex from "../inventory/GridIndex.js";
import Size from "../size/Size.js";

import ParseJSONStructToDatabaseItem from "./ParseJSONStructToDatabaseItem.js";

const SERVER_PROCESS_FILE_PATH = process.cwd();
const DATA_FILE_DIRECTORY_PATH = `src/data_files`;
const ITEM_DATA_FILE = `item_data.json`;

export default class ItemDatabase {
  constructor() {
    this.data = {};
    this.isInitializing = true;
  }

  /**
   * Initialize item database
   * @return {void}
   */
  init() {
    this.data = this.readItemDataFile();
    this.isInitializing = false;
    ConsoleHandler.Log("Item database initialized");
  }

  /**
   * Read item data from datafile and parse into hashmap of items
   * @return {HashMap<Item>}
   */
  readItemDataFile() {
    let parsedItemData = {};
    try {
      const itemDataFilePath = `${SERVER_PROCESS_FILE_PATH}/${DATA_FILE_DIRECTORY_PATH}/${ITEM_DATA_FILE}`;
      if (fs.existsSync(itemDataFilePath)) {
        const fileData = fs.readFileSync(itemDataFilePath, {
          encoding: "utf8",
        });
        if (fileData !== undefined) {
          let itemDataJSON = JSON.parse(fileData);
          let itemData = itemDataJSON["item_data"] ?? [];
          if (itemData.length > 0) {
            itemData.forEach((itemJSON) => {
              let item = ParseJSONStructToDatabaseItem(itemJSON);
              if (item !== undefined) {
                if (item.name !== "") {
                  if (parsedItemData[item.name] == undefined) {
                    parsedItemData[item.name] = item;
                  } else {
                    ConsoleHandler.Log(
                      `Duplicate item name on database initialization: ${item.name}`
                    );
                  }
                } else {
                  ConsoleHandler.Log(`Failed to parse item: ${itemJSON}`);
                }
              } else {
                ConsoleHandler.Log(`Failed to parse item: ${itemJSON}`);
              }
            });
          } else {
            ConsoleHandler.Log(
              `Failed to read item data from file: ${itemDataFilePath}`
            );
          }
        } else {
          ConsoleHandler.Log(
            `Failed to read item data from file: ${itemDataFilePath}`
          );
        }
      } else {
        ConsoleHandler.Log(
          `Failed to find item data file: ${itemDataFilePath}`
        );
      }
    } catch (error) {
      ConsoleHandler.Log(error);
    }
    return parsedItemData;
  }

  /**
   * Get all item keys in hashmap
   * @return {Array<string>}
   */
  getAllKeys() {
    return Object.keys(this.data);
  }

  /**
   * Get an item (clone) by a key
   * @return {Item}
   */
  get(key) {
    let itemData;
    if (!this.isInitializing) {
      let data = this.data[key];
      if (data !== undefined) {
        itemData = new Item(
          data.name,
          data.category,
          data.type,
          new Size(data.size.w, data.size.h),
          data.weight,
          data.maxStack,
          data.basePrice,
          data.quantity,
          data.metadata,
          data.isRotated,
          data.isKnown,
          new GridIndex(0, 0)
        );
      }
      return itemData;
    } else {
      ConsoleHandler.Log(`Item database is still initializing...`);
    }
  }
}
