function removeSameNumber(arr) {
  return [... new Set(arr)];
}

console.log(removeSameNumber([1,2,3,3,4,4,5,6,7,8,8,9]));
