function getRandomItemFromArray(arr) {
  const radomIndex = Math.floor(Math.random() * arr.length);
  return arr[radomIndex];
}

console.log(getRandomItemFromArray(1,2,3,4,5,6,7,8,9));
