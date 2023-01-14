export default function setFocusOnChange(
  elemId: string,
  elemIndicatorId: string
) {
  //remove previously seledcted element(s)
  const prevSelected = document.getElementsByClassName("is-selected-proj");
  const length = prevSelected.length;
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      /*
          After removing an element from a class, the second element gets pushed to the first position "0" 
        */
      prevSelected[0].classList.remove("is-selected-proj");
    }
  }
  const elemToBeHighlighted = document.getElementById(elemId);
  const elemIndicator = document.getElementById(elemIndicatorId);
  if (elemToBeHighlighted && elemIndicator) {
    elemToBeHighlighted.classList.add("is-selected-proj");
    elemIndicator.classList.add("is-selected-proj");
  }
}
