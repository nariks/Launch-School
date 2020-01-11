let str = "The Flintstones rock!";
for (let i = 0; i < 10; i += 1) {
  console.log(str.padStart(str.length + i, ' '));
}


