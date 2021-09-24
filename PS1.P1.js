const alphaRev = word => word.split('').sort().reverse().join('');


console.log(`Testing P1... ${alphaRev("exioi")}`);
console.log(`Testing P1... ${alphaRev("supercalifragilisticexpialidocious")}`);
