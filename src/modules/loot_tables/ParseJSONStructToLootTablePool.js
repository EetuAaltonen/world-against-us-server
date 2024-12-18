import LootTablePool from "./LootTablePool.js";

import ParseJSONStructsToArray from "../json/ParseJSONStructsToArray.js";
import ParseJSONStructToLootTablePoolRoll from "./ParseJSONStructToLootTablePoolRoll.js";
import ParseJSONStructToLootTablePoolEntry from "./ParseJSONStructToLootTablePoolEntry.js";

/**
 * Parses given JSON struct to loot table pool,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {LootTablePool} Parsed loot table pool
 */
export default function (jsonStruct) {
  let parsedLootTablePool;
  if (jsonStruct !== undefined) {
    const parsedPoolRolls = ParseJSONStructToLootTablePoolRoll(
      jsonStruct["rolls"] ?? undefined
    );
    const poolEntryData = jsonStruct["entries"] ?? [];
    if (poolEntryData.length > 0) {
      const parsedPoolEntries = ParseJSONStructsToArray(
        poolEntryData,
        ParseJSONStructToLootTablePoolEntry
      );
      parsedLootTablePool = new LootTablePool(
        jsonStruct["roll_chance"],
        parsedPoolRolls,
        parsedPoolEntries
      );
    }
  }
  return parsedLootTablePool;
}
