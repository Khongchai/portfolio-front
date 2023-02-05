export default function removeDuplicatesFromArray(array: number[]): number[] {
  const filteredArray: number[] = [];
  const hashCheck: boolean[] = [];

  for (let i = 0, length = array.length; i < length; i++) {
    const indexedItem = hashCheck[array[i]];
    if (!indexedItem) {
      hashCheck[array[i]] = true;
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
}
