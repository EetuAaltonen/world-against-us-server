import GridIndex from "./GridIndex.js";

export default function (jsonStruct) {
  let parsedGridIndex = new GridIndex(0, 0);
  if (jsonStruct !== undefined) {
    parsedGridIndex.col = jsonStruct["col"] ?? 0;
    parsedGridIndex.row = jsonStruct["row"] ?? 0;
  }
  return parsedGridIndex;
}
