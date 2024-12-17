/**
 * Formats items in given array to JSON struct array
 * @param {Array<Item>} items
 * @return {Array<object>} Formatted JSON struct array
 */
export default function (items) {
  let formatItemArray = [];
  if (items !== undefined) {
    Object.keys(items).forEach((gridIndex) => {
      const item = items[gridIndex];
      const formatItem = item.toJSONStruct();
      formatItemArray.push(formatItem);
    });
  }
  return formatItemArray;
}
