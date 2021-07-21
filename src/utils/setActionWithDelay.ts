var timeoutRef: any;
export default function setActionWithDelay(
  action: () => any,
  delayInSeconds: number
) {
  window.clearTimeout(timeoutRef);
  timeoutRef = setTimeout(action, delayInSeconds * 1000);
}
