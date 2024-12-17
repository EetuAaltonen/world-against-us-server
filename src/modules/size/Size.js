export default class Size {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  toJSONStruct() {
    return {
      w: this.w,
      h: this.h,
    };
  }
}
