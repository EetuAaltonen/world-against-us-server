import ConsoleHandler from "../console/ConsoleHandler.js";
import ItemDatabase from "./ItemDatabase.js";

export const itemDatabase = new ItemDatabase();

/**
 * Initializes a collection of databases via init calls
 * @return {void}
 */
export function initDatabases() {
  ConsoleHandler.Log("Initializing databases...");
  itemDatabase.init();
}
