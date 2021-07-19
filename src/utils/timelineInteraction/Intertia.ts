/**
 * Representing time, we have a function that logs new cursor position every x seconds
 * The "instantaneous" rate of change will be the difference from new and old position
 */
export class Inertia {
  cur: number;
  prev: number;
  delta: number | undefined = undefined;

  constructor() {
    this.cur = 0;
    this.prev = this.cur;
  }

  setdydx(currentPos: number) {
    //will have to be called every x seconds
    this.prev = this.cur;
    this.cur = currentPos;
  }

  getDifference() {
    this.delta = this.cur - this.prev;
    return this.delta;
  }

  handleDeltaUndefined() {
    if (this.delta == null) {
      throw "Rate of change 'delta' not set";
    }
  }
}

/**
 * Manages inertial throttling
 */
export class InertiaThrottle {
  init: number;
  constructor(initial: number) {
    this.init = initial;
  }
}
