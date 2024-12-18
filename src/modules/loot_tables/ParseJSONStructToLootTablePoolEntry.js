import { itemDatabase } from "../database/DatabaseHandler.js";

import ConsoleHandler from "../console/ConsoleHandler.js";
import LootTablePoolEntry from "./LootTablePoolEntry.js";

/**
 * Parses given JSON struct to loot table pool entry,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {LootTablePoolEntry} Parsed loot table pool entry
 */
export default function (jsonStruct) {
  let parsedLootTablePoolEntry;
  if (jsonStruct !== undefined) {
    const parsedItemName = jsonStruct["name"] ?? "";
    if (itemDatabase.get(parsedItemName) !== undefined) {
      parsedLootTablePoolEntry = new LootTablePoolEntry(
        parsedItemName,
        jsonStruct["count"] ?? 0,
        jsonStruct["weight"] ?? 0
      );
    } else {
      ConsoleHandler.Log(`Unknown item '${parsedItemName}' in a loot table`);
    }
  }
  return parsedLootTablePoolEntry;
}
