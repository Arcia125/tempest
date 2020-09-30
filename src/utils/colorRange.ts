interface ColorRangeSpec {
  min: number;
  color: string;
}

export class ColorRange {
  constructor(private specs: ColorRangeSpec[]) {
    this.specs = [...specs].sort((a, b) => (a.min > b.min ? -1 : 1));
  }

  interpolate(value: number) {
    const activeSpec = this.specs.find((spec) => value > spec.min);
    return activeSpec?.color;
  }
}
