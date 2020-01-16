//Given a string, write a function palindromeSubstrings which returns all the
//substrings from a given string which are palindromes. Consider palindromes are
//case sensitive.

function isPalindrome(str) {
  strReverse = str.split('').reverse().join('');
  return (str === strReverse);
}

function subStrings(str) {
  let starptr, endptr;
  let substr = [];

  for (startPtr = 0; startPtr < str.length; startPtr += 1) {
    for (endPtr = startPtr + 2; endPtr <= str.length; endPtr += 1) {
      substr.push(str.slice(startPtr, endPtr));
    }
  }
  return substr;
}

function palindromeSubstrings(str) {
  let result = [];
  let subStringsArr = subStrings(str);
  subStringsArr.forEach(substring => {
    if (isPalindrome(substring)) {
      result.push(substring);
    }
  });

  return result;
}

console.log(palindromeSubstrings("I love pop"));
console.log(palindromeSubstrings("I love Mom and pop"));
console.log(palindromeSubstrings(""));
console.log(palindromeSubstrings("illibillilpop"));
console.log(palindromeSubstrings("abcddcbA"));
