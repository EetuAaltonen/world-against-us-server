/**
 * Shuffles a given array randomly
 * @param {Array<any>} array
 * @return {Array<any>} Shuffled array
 */
export default function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
