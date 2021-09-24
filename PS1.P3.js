const useFunOnStr = (str, func) => eval(func)(str);

const fun1 = str => str.split(/(?=c)/);

console.log(`${useFunOnStr("supercalifragilisticexpialidocious",fun1)}`);

const fun2 = str => {
    newStr = str.replace(/a/g,'A'); 
    numMod = newStr.match(/A/g).length;
    strLen = newStr.length;
    return [{
        "originalString": str,
        "modifiedString": newStr,
        "numberReplaced": numMod,
        "length": strLen
    }];
};

console.table(useFunOnStr("supercalifragilisticexpialidocious", fun2));