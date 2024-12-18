import ConsoleHandler from "../console/ConsoleHandler.js";
import ItemDatabase from "./ItemDatabase.js";
import LootTableDatabase from "./LootTableDatabase.js";

export const itemDatabase = new ItemDatabase();
export const lootTableDatabase = new LootTableDatabase();

/**
 * Initializes a collection of databases via init calls
 * @return {void}
 */
export function initDatabases() {
  ConsoleHandler.Log("Initializing databases...");
  itemDatabase.init();
  lootTableDatabase.init();
}
