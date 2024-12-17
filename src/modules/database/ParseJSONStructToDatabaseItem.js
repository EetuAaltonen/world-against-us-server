import Item from "../items/Item.js";

import ParseJSONStructToSize from "../size/ParseJSONStructToSize.js";
import ParseJSONStructToItemMetadata from "../items/metadata/ParseJSONStructToItemMetadata.js";

/**
 * Parses given JSON struct to item,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {Item} Parsed item
 */
export default function (jsonStruct) {
  let parsedItem;
  if (jsonStruct !== undefined) {
    const parsedSize = ParseJSONStructToSize(jsonStruct["size"]);
    const parsedCategory = jsonStruct["category"] ?? undefined;
    const parsedType = jsonStruct["type"] ?? undefined;
    const parsedMetadata = ParseJSONStructToItemMetadata(
      jsonStruct["metadata"] ?? undefined,
      parsedCategory,
      parsedType
    );
    parsedItem = new Item(
      jsonStruct["name"] ?? "",
      parsedCategory,
      parsedType,
      parsedSize,
      jsonStruct["weight"] ?? 0,
      jsonStruct["max_stack"] ?? 1,
      jsonStruct["base_price"] ?? 0,
      1, // Default quantity
      parsedMetadata,
      false, // Default rotation
      true, // Default is known
      undefined
    );
  }
  return parsedItem;
}
