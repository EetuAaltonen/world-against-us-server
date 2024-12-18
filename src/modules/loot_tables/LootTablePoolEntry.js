export default class LootTablePoolEntry {
  constructor(name, count, weight) {
    this.name = name;
    this.count = count;
    this.weight = weight;
  }

  toJSONStruct() {
    return {};
  }
}
