export default class Item {
  constructor(
    name,
    category,
    type,
    size,
    weight,
    maxStack,
    basePrice,
    quantity,
    metadata,
    isRotated,
    isKnown,
    gridIndex
  ) {
    this.name = name;
    this.category = category;
    this.type = type;
    this.size = size;
    this.weight = weight;
    this.maxStack = maxStack;
    this.basePrice = basePrice;
    this.quantity = quantity ?? 1;
    this.metadata = metadata ?? undefined;
    this.isRotated = isRotated ?? false;
    this.isKnown = isKnown ?? true;
    this.gridIndex = gridIndex;
  }

  toJSONStruct() {
    const formatGridIndex = this.gridIndex.toJSONStruct(this.gridIndex);
    return {
      name: this.name,
      quantity: this.quantity,
      metadata: this.metadata,
      is_rotated: this.isRotated,
      is_known: this.isKnown,
      grid_index: formatGridIndex,
    };
  }

  /**
   * TODO
   */
  rotate() {
    // TODO: Implement rotate function
    throw "Not implemented error";
  }

  /**
   * TODO
   */
  compare() {
    // TODO: Implement compare function
    throw "Not implemented error";
  }

  /**
   * TODO
   */
  stack() {
    // TODO: Implement stack function
    throw "Not implemented error";
  }
}
