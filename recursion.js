function combine(arr1, arr2) {
  let sorted = [];
  while (arr1.length || arr2.length) {
    if (arr1[0] <= arr2[0] || arr2[0] === undefined) {
      sorted.push(arr1[0]);
      arr1.shift();
    } else {
      sorted.push(arr2[0]);
      arr2.shift();
    }
  }
  return sorted;
}

function mergeSort(arr) {
  if (arr.length === 1 || !arr.length) return arr;
  //split arr in two, retrieve them sorted, combine them.
  let arr2 = arr.splice(Math.floor(arr.length / 2));
  //retreive all lower sorted arrays.
  arr = mergeSort(arr);
  arr2 = mergeSort(arr2);
  //sort between sorted aray and return to previous call
  return combine(arr, arr2);
}

function fib(n) {
  let result = [0, 1];
  for (let i = 0; i < n - 2; i++) {
    let nextN = result[result.length - 1] + result[result.length - 2];
    result.push(nextN);
  }
  return n == 0 || !n ? [] : n === 1 ? [0] : result;
}

function fibRec(n, arr = [0, 1]) {
  let nextN = arr[arr.length - 1] + arr[arr.length - 2];
  arr.push(nextN);
  return n == 0 || !n ? [] : n === 1 ? [0] : n === 2 ? [0, 1] : arr.length === n ? arr : fibRec(n, arr);
}

console.log(fibRec(8));
console.log(mergeSort([0, 2, 3, 4, 5, 11, 67, 7, 12, 2, 13, 3, 5]));
