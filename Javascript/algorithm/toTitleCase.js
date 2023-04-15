function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
console.log(toTitleCase('nGuyen vAn HoAng')); // Nguyen Van Hoang
