//Return a new munsterDescriptioning that swaps the case of all munsterDescriptionings.

let munsterDescription = "The Munsters are creepy and spooky.";
let caseSwap = '';

for (let i = 0; i < munsterDescription.length; i += 1) {
  caseSwap += munsterDescription[i] === munsterDescription[i].toLowerCase() 
              ? munsterDescription[i].toUpperCase() 
              : munsterDescription[i].toLowerCase();
}

console.log(caseSwap);
