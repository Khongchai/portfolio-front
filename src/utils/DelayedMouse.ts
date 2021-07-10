export class DelayedMouse {
  protected mouse: {
    prev: { x: number; y: number };
    difference: { x: number; y: number };
  };
  constructor() {
    this.mouse = {
      prev: { x: 0, y: 0 },
      difference: { x: 0, y: 0 },
    };
  }

  getDelayedMouse(currentMouse: { x: number; y: number }) {
    const speedDif = 0.03;
    const pointerDelay = () => {
      this.mouse.difference.x = (currentMouse.x - this.mouse.prev.x) * speedDif;
      this.mouse.difference.y = (currentMouse.y - this.mouse.prev.y) * speedDif;
      this.mouse.prev.x += this.mouse.difference.x;
      this.mouse.prev.y += this.mouse.difference.y;
      return { x: this.mouse.prev.x, y: this.mouse.prev.y };
    };
    pointerDelay();
  }
}
