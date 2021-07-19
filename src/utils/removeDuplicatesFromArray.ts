export default function removeDuplicatesFromArray<T>(array: T[]): T[] {
  let arrayFiltered: T[] = [];
  const arrayLength = array.length;
  for (let i = 0; i < arrayLength; i++) {
    if (!arrayFiltered.includes(array[i])) {
      arrayFiltered.push(array[i]);
    }
  }
  return arrayFiltered;
}
