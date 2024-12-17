import ConsoleHandler from "../../console/ConsoleHandler.js";

// TODO: Implement this function
/**
 * TODO
 * @param {object} jsonStruct
 * @return {Metadata} Parsed metadata
 */
export default function (jsonStruct, itemCategory, itemType) {
  let parsedItemMetadata;
  try {
    if (jsonStruct !== undefined) {
      if (itemCategory !== undefined) {
        switch (itemCategory) {
          case "Weapon":
            {
            }
            break;
          case "Magazine":
            {
            }
            break;
          case "Fuel Ammo":
            {
            }
            break;
          case "Bullet":
            {
            }
            break;
          case "Medicine":
            {
            }
            break;
          case "Fuel":
            {
            }
            break;
          case "Consumable":
            {
            }
            break;
          case "Backpack":
            {
            }
            break;
          case "Consumable":
            {
            }
            break;
          case "Consumable":
            {
            }
            break;
          default:
            {
              parsedItemMetadata = jsonStruct;
            }

            if (parsedItemMetadata == undefined) {
              ConsoleHandler.Log(
                `Item metadata parse error: ${itemCategory} | ${itemType}`
              );
              console.log(jsonStruct);
              throw jsonStruct;
            }
        }
      }
    }
  } catch (error) {
    ConsoleHandler.Log(error);
  }
  return parsedItemMetadata;
}
