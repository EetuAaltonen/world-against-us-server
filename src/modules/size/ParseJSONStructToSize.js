import Size from "./Size.js";

/**
 * Parses given JSON struct to size,
 * and fills missing properties with default values
 * @param {object} jsonStruct
 * @return {Size} Parsed size
 */
export default function (jsonStruct) {
  let parsedSize;
  if (jsonStruct !== undefined) {
    parsedSize = new Size(jsonStruct["w"] ?? 1, jsonStruct["h"] ?? 1);
  }
  return parsedSize;
}
