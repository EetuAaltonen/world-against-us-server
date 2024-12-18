import GetRandomIntFromRange from "../math/GetRandomIntFromRange.js";

export default class LootTablePool {
  constructor(rollChance, rolls, entries) {
    this.rollChance = rollChance;
    this.rolls = rolls;
    this.entries = entries;
    this.probabilitySpectrum = 0;

    this.initProbabilitySpectrum();
  }

  toJSONStruct() {
    return {};
  }

  /**
   * Initializes a probability spectrum with a sum of pool entries' weights
   * @return {void}
   */
  initProbabilitySpectrum() {
    this.entries.forEach((entry) => {
      if (entry !== undefined) {
        this.probabilitySpectrum += entry.weight ?? 0;
      }
    });
  }

  /**
   * Rolls a loot pool entry from a presented loot entries
   * @return {LootTablePoolEntry} Rolled loot table entry
   */
  rollEntry() {
    let rolledEntry;
    const dropIndex = GetRandomIntFromRange(1, this.probabilitySpectrum);
    let spectrumIndex = 0;
    this.entries.forEach((entry) => {
      if (rolledEntry !== undefined) return;
      if (entry !== undefined) {
        if (
          dropIndex >= 1 + spectrumIndex &&
          dropIndex <= spectrumIndex + entry.weight
        ) {
          rolledEntry = entry;
        } else {
          spectrumIndex += entry.weight;
        }
      }
    });
    return rolledEntry;
  }
}
