import handleEdgeOffset from "./handleEdgeOffset";
import { Inertia } from "./Intertia";

let dragSwitch = false;
let block: HTMLElement | null;
let initialX = 0;
let currTranslateXVal = 0;
let newTranslateXVal = 0;
let intervalFunction: any;
let animationFrame: any;
let firstResult = 0;
const inertia = new Inertia();

export default function manageBlockMove(blockId: string, operation: string) {
  block = document.getElementById(blockId);

  if (operation === "monitor") {
    block?.addEventListener("mousedown", down);
    block?.addEventListener("mouseup", up);
    block?.addEventListener("touchstart", down);
    block?.addEventListener("touchend", up);
  } else {
    //remove eventlisteners
    block?.removeEventListener("mousedown", down);
    block?.removeEventListener("mouseup", up);
    block?.removeEventListener("mousemove", drag);

    block?.removeEventListener("touchstart", down);
    block?.removeEventListener("touchend", up);
    block?.removeEventListener("touchmove", drag);
  }
}

function down(e: MouseEvent | TouchEvent) {
  checkCurrentTranslateX();
  firstResult = 0;
  dragSwitch = true;
  if (e.type === "mousedown") {
    initialX = (e as MouseEvent).clientX;
    block?.addEventListener("mousemove", drag);
  } else {
    initialX = (e as TouchEvent).touches[0].clientX;
    block?.addEventListener("touchmove", drag);
  }
  if (block) {
    block.style.transition = "";
  }
  //set once immediately
  inertia.setdydx(currTranslateXVal);

  intervalFunction = setInterval(() => {
    inertia.setdydx(newTranslateXVal);
  }, 200);

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
}

function drag(e: MouseEvent | TouchEvent) {
  e.preventDefault();
  if (dragSwitch) {
    const currentClientX = getCurrentXFromMouseOrTouch(e as any);
    newTranslateXVal = currentClientX - initialX + currTranslateXVal;
    moveBlock(newTranslateXVal);
  }
}

function up(e: MouseEvent | TouchEvent) {
  if (e.type === "mouseup") {
    block?.removeEventListener("mousemove", drag);
  } else {
    block?.removeEventListener("touchmove", drag);
  }

  const currentClientX = getCurrentXFromMouseOrTouch(
    e as any,
    newTranslateXVal
  );
  //User has not dragged,
  const hasDragged = currentClientX === initialX ? false : true;

  inertia.setdydx(newTranslateXVal);
  currTranslateXVal = newTranslateXVal;
  dragSwitch = false;

  clearInterval(intervalFunction);
  //set once immediately after release
  if (block) {
    const offsetValue: number | undefined = handleEdgeOffset(undefined, true);
    if (!offsetValue) {
      slowDownUntil0(hasDragged);
    }
  }
}

function checkCurrentTranslateX() {
  if (block) {
    currTranslateXVal = new WebKitCSSMatrix(
      window.getComputedStyle(block).transform
    ).m41;
  }
}

function moveBlock(xOffset: number, triggerDebug?: boolean) {
  if (triggerDebug) {
    console.log(xOffset);
  }
  xOffset = handleEdgeOffset(xOffset) as number;

  if (block) {
    block.style.transform = `translateX(${xOffset}px)`;
  }
}

//turn this into a class later TODO
var initialBeforeThrottle: number | undefined = undefined;
var timeStart: number = Date.now();

//If exceed this val, stop animation.
var stopAnimationAfterThisPercentage: number | undefined = undefined;

/**
 * Formula = initialVelocity/decelerationFactor(time)^2 + 1
 * https://www.desmos.com/calculator/s6lzhsggwq
 */
function slowDownUntil0(hasDragged: boolean) {
  if (!hasDragged) return;
  if (initialBeforeThrottle !== inertia.getDifference()) {
    initialBeforeThrottle = inertia.getDifference();
    timeStart = Date.now();
  }

  const initialVelocity = initialBeforeThrottle;
  const decay = 0.03;
  const timeDifference = Date.now() - timeStart;

  //prettier-ignore
  const result = initialVelocity * Math.cos(Math.atan(timeDifference * decay));

  // TODO change <<result>> to the difference
  // if (!stopAnimationAfterThisPercentage) {
  //   stopAnimationAfterThisPercentage = 0.1;
  // } else {
  //   const throttledValueInPercentage = Math.abs(initialVelocity / result);
  //   if (throttledValueInPercentage < stopAnimationAfterThisPercentage) {
  //     return;
  //   }
  // }

  const resultRounded = Math.round(result * 10) / 10;
  firstResult = firstResult ? firstResult : resultRounded;

  const deceleratedTranslate = newTranslateXVal - resultRounded + firstResult;
  moveBlock(deceleratedTranslate, undefined);

  animationFrame = requestAnimationFrame(() => slowDownUntil0(hasDragged));
}

function getCurrentXFromMouseOrTouch(
  e: MouseEvent & TouchEvent,
  currentVal?: number
): number {
  if (e.type === "touchend") {
    if (!currentVal) {
      throw "Include currentVal for touchend event";
    }
    return currentVal as number;
  }
  const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
  return clientX;
}
