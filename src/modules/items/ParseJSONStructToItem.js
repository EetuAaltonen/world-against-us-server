import { itemDatabase } from "../database/DatabaseHandler.js";

import ParseJSONStructToItemMetadata from "../items/metadata/ParseJSONStructToItemMetadata.js";
import ParseJSONStructToGridIndex from "../inventory/ParseJSONStructToGridIndex.js";

/**
 * Parses given JSON struct to item,
 * and fills missing properties using default values from item database
 * @param {object} jsonStruct
 * @return {Item} Parsed item
 */
export default function (jsonStruct) {
  let parsedItem;
  if (jsonStruct !== undefined) {
    if (jsonStruct["name"] !== "") {
      const itemData = itemDatabase.get(jsonStruct["name"]);
      if (itemData !== undefined) {
        const parsedMetadata = ParseJSONStructToItemMetadata(
          jsonStruct["metadata"] ?? undefined,
          itemData.category,
          itemData.type
        );
        const parsedGridIndex = ParseJSONStructToGridIndex(
          jsonStruct["grid_index"] ?? undefined
        );

        itemData.quantity = jsonStruct["quantity"] ?? 1;
        itemData.metadata = parsedMetadata;
        itemData.isRotated = jsonStruct["is_rotated"] ?? false;
        itemData.isKnown = jsonStruct["is_known"] ?? true;
        itemData.gridIndex = parsedGridIndex;

        parsedItem = itemData;
      }
    }
  }
  return parsedItem;
}
