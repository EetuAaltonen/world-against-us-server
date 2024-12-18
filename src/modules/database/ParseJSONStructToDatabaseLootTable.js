import LootTable from "../loot_tables/LootTable.js";

import ParseJSONStructsToArray from "../json/ParseJSONStructsToArray.js";
import ParseJSONStructToLootTablePool from "../loot_tables/ParseJSONStructToLootTablePool.js";

/**
 * Parses given JSON struct to loot table,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {LootTable} Parsed loot table
 */
export default function (jsonStruct) {
  let parsedLootTable;
  if (jsonStruct !== undefined) {
    const lootTablePoolData = jsonStruct["pools"] ?? [];
    if (lootTablePoolData.length > 0) {
      const parsedLootTablePools = ParseJSONStructsToArray(
        lootTablePoolData,
        ParseJSONStructToLootTablePool
      );

      parsedLootTable = new LootTable(
        jsonStruct["tag"] ?? "",
        parsedLootTablePools
      );
    }
  }
  return parsedLootTable;
}
