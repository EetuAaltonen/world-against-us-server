import Size from "./Size.js";

/**
 * Parses given JSON struct to Size object,
 * and fills missing properties with default values
 * @param {object:any} jsonStruct
 * @return {object:Size} Parsed object
 */
export default function (jsonStruct) {
  let parsedSize;
  if (jsonStruct !== undefined) {
    parsedSize = new Size(jsonStruct["w"] ?? 1, jsonStruct["h"] ?? 1);
  }
  return parsedSize;
}
