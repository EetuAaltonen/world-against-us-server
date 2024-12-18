import fs from "fs";
import ConsoleHandler from "../console/ConsoleHandler.js";
import LootTable from "../loot_tables/LootTable.js";

import ParseJSONStructToDatabaseLootTable from "./ParseJSONStructToDatabaseLootTable.js";

const SERVER_PROCESS_FILE_PATH = process.cwd();
const DATA_FILE_DIRECTORY_PATH = `src/data_files/loot_tables`;
const FILE_NAME_REGEXP = /(\w*)\_loot_table.json$/;
const FILE_NAME_SUFFIX = "_loot_table.json";

export default class LootTableDatabase {
  constructor() {
    this.data = {};
    this.isInitializing = true;
  }

  /**
   * Initialize loot table database
   * @return {void}
   */
  init() {
    this.data = this.readDataFile();
    this.isInitializing = false;
    ConsoleHandler.Log("Loot table database initialized");
  }

  /**
   * Read loot table data from data files and parse into a hashmap
   * @return {HashMap<LootTable>}
   */
  readDataFile() {
    let parsedData = {};
    try {
      const dataDirectoryPath = `${SERVER_PROCESS_FILE_PATH}/${DATA_FILE_DIRECTORY_PATH}/`;
      const fileNames = fs.readdirSync(dataDirectoryPath);
      fileNames.forEach((fileName) => {
        if (fileName.match(FILE_NAME_REGEXP) !== null) {
          const dataFilePath = `${dataDirectoryPath}/${fileName}`;
          if (fs.existsSync(dataFilePath)) {
            const fileData = fs.readFileSync(dataFilePath, {
              encoding: "utf8",
            });
            if (fileData !== undefined) {
              const dataJSON = JSON.parse(fileData);
              const lootTableTag = dataJSON["tag"];
              if (fileName === `${lootTableTag}${FILE_NAME_SUFFIX}`) {
                const lootTable = ParseJSONStructToDatabaseLootTable(dataJSON);
                if (lootTable !== undefined) {
                  if (lootTable.tag !== "") {
                    if (parsedData[lootTable.tag] === undefined) {
                      parsedData[lootTable.tag] = lootTable;
                    } else {
                      ConsoleHandler.Log(
                        `Duplicate loot table tag on database initialization: ${lootTable.tag}`
                      );
                    }
                  } else {
                    ConsoleHandler.Log(
                      `Failed to parse loot table: ${dataJSON}`
                    );
                  }
                } else {
                  ConsoleHandler.Log(`Failed to parse loot table: ${dataJSON}`);
                }
              } else {
                ConsoleHandler.Log(
                  `Mismatching loot table datafile name '${fileName}' with tag '${lootTableTag}'`
                );
              }
            } else {
              ConsoleHandler.Log(
                `Failed to read loot table data from file: ${fileName}`
              );
            }
          } else {
            ConsoleHandler.Log(
              `Failed to find loot table data file: ${fileName}`
            );
          }
        } else {
          ConsoleHandler.Log(`Invalid loot table datafile '${fileName}'`);
        }
      });
    } catch (error) {
      ConsoleHandler.Log(error);
    }
    return parsedData;
  }

  /**
   * Get all loot table keys in hashmap
   * @return {Array<string>}
   */
  getAllKeys() {
    return Object.keys(this.data);
  }

  /**
   * Get an loot table (reference) by a key
   * @return {LootTable}
   */
  get(key) {
    let lootTableData;
    if (!this.isInitializing) {
      let data = this.data[key];
      if (data !== undefined) {
        lootTableData = data;
      }
      return lootTableData;
    } else {
      ConsoleHandler.Log(`Loot table database is still initializing...`);
    }
  }
}
