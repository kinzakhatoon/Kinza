// length
let name = 'my name is kinza.';
let length = name.length;
console.log(length);

// slice
let text = 'hassan abdal';
let sliced = text.slice(0, 5);
console.log(sliced);

// substring
let text1 = 'hassan abdal';
let substring = text1.substring(0, 5);
console.log(substring); 

// substr
let text2 = 'hassan abdal';
let substr = text2.substr(7, 5);
console.log(substr); 

// replace
let text3 = 'welcome kinza';
let replaced = text3.replace('kinza', 'mahnoor');
console.log(replaced); 

// replaceAll
let text4 = 'welcome, kinza! welcome, mahnoor!';
let replacedAll = text4.replaceAll('welcome', 'Hi');
console.log(replacedAll); 

// toUpperCase
// toLowerCase
let example5 = 'Hassan Abdal';
let upper = example5.toUpperCase();
let lower = example5.toLowerCase();
console.log(upper); 
console.log(lower); 

// concat
let str1 = 'hassan abdal';
let str2 = 'attock';
const concatenate = str1.concat(', ', str2);
console.log(concatenate); 

// trim
let text6 = 'hassan abdal, attock';
let trimmed = text6.trim();
console.log(trimmed); 

// trimStart
// trimEnd
let text7 = '   hassan abdal   ';
let startTrimmed = text7.trimStart();
let endTrimmed = text7.trimEnd();
console.log(startTrimmed); 
console.log(endTrimmed);

// padStart
// padEnd
let text8 = '4';
let padStart = text7.padStart(5, '0');
let padEnd = text8.padEnd(5, '0');
console.log(padStart); 
console.log(padEnd);

// charAt
let text9 = 'kinza';
let char = text9.charAt(4);
console.log(char); 

// charCodeAt
let text10 = 'kinza';
let charCode = text10.charCodeAt(4);
console.log(charCode); 

// split
let text11 = 'mahnoor,kinza,ramza';
let mytext = text11.split(',');
console.log(mytext); 
