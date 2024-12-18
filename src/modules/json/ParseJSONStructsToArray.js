import ConsoleHandler from "../console/ConsoleHandler.js";

export default function (jsonStructArray, parseFunction) {
  let parsedObjectArray = [];
  if (jsonStructArray !== undefined) {
    if (Array.isArray(jsonStructArray)) {
      if (parseFunction !== undefined) {
        jsonStructArray.forEach((jsonStruct) => {
          const parsedData = parseFunction(jsonStruct);
          if (parsedData !== undefined) {
            parsedObjectArray.push(parsedData);
          } else {
            ConsoleHandler.Log("Unable to parse JSON struct");
            console.log(jsonStruct);
          }
        });
      }
    }
  }
  return parsedObjectArray;
}
