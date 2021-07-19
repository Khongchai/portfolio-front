import { ThreejsPrototype } from "./ThreejsPrototype";

export class ThreejsGeometries extends ThreejsPrototype {
  constructor(canvas: HTMLCanvasElement, newContainer: HTMLElement) {
    super(canvas, newContainer);
  }

  extraEventListenersBeforeAnimLoop() {
    if (this.windowEventListenerFunctions[0]) {
      window.addEventListener("scroll", this.windowEventListenerFunctions[0]);
    }
  }
}
