import LootTablePoolRoll from "./LootTablePoolRoll.js";

/**
 * Parses given JSON struct to loot table pool roll,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {LootTablePoolRoll} Parsed loot table pool roll
 */
export default function (jsonStruct) {
  let parsedLootTablePoolRoll;
  if (jsonStruct !== undefined) {
    parsedLootTablePoolRoll = new LootTablePoolRoll(
      jsonStruct["min_roll"] ?? 0,
      jsonStruct["max_roll"] ?? 0
    );
  }
  return parsedLootTablePoolRoll;
}
