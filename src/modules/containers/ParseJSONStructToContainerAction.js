import ContainerInventoryActionInfo from "./ContainerInventoryActionInfo.js";
import ParseJSONStructToGridIndex from "../inventory/ParseJSONStructToGridIndex.js";
import ParseJSONStructToItem from "../items/ParseJSONStructToItem.js";

export default function (jsonStruct) {
  let parsedActionInfo;
  if (jsonStruct !== undefined) {
    const parsedSourceGridIndex = ParseJSONStructToGridIndex(
      jsonStruct["source_grid_index"] ?? undefined
    );
    const parsedTargetGridIndex = ParseJSONStructToGridIndex(
      jsonStruct["target_grid_index"] ?? undefined
    );
    const parsedItem = ParseJSONStructToItem(jsonStruct["item"] ?? undefined);

    parsedActionInfo = new ContainerInventoryActionInfo(
      jsonStruct["container_id"] ?? undefined,
      parsedSourceGridIndex,
      parsedTargetGridIndex,
      jsonStruct["is_rotated"] ?? false,
      jsonStruct["is_known"] ?? false,
      parsedItem
    );
  }
  return parsedActionInfo;
}
