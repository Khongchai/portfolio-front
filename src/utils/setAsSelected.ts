export function setAsSelected(selectionName: string) {
  const selectedClass = "filter-selected";
  const prevSelected = document.getElementsByClassName(selectedClass);
  const selectedElems = document.getElementsByClassName(
    selectionName + "tiny-img"
  );
  const selectedLength = selectedElems.length;
  const prevLength = prevSelected.length;

  for (let i = 0; i < prevLength; i++) {
    prevSelected[0].classList.remove(selectedClass);
  }
  for (let i = 0; i < selectedLength; i++) {
    if (selectedElems[i]) {
      selectedElems[i].classList.add(selectedClass);
    }
  }
}
