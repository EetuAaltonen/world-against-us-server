import GetRandomIntFromRange from "../math/GetRandomIntFromRange.js";
import ShuffleArray from "../utils/ShuffleArray.js";

export default class LootTable {
  constructor(tag, pools) {
    this.tag = tag;
    this.pools = pools;
  }

  toJSONStruct() {
    return {};
  }

  /**
   * Rolls a collection of loot drops from a presented loot pools
   * @return {Array<LootTablePoolEntry>} Rolled and shuffled loot table drops
   */
  rollLoot() {
    let loot = [];
    this.pools.forEach((pool) => {
      if (GetRandomIntFromRange(1, 100) <= pool.rollChance) {
        // Pool with 0 as min and max rolls will add all the items as loot
        if (pool.rolls.minRoll === 0 && pool.rolls.maxRoll === 0) {
          loot = [...pool.entries];
        }
        // Otherwise roll random count of items between min and max
        else {
          const rollCount = GetRandomIntFromRange(pool.minRoll, pool.maxRoll);
          for (let i = 0; i < rollCount; i++) {
            loot.push(pool.rollEntry());
          }
        }
      }
    });
    return ShuffleArray(loot);
  }
}
