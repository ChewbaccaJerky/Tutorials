
const fs = require('fs');

fs.readFile('./animal.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }
    
    const char = process.argv[2];
    if(!char) {
        throw 'Missing arguments!';
    }
    else if(char.length !== 1) {
        throw 'only accepts char';
    }

    const animals = data.split('\n');
    const result = animals.filter(animal => char === animal.charAt(0).toLowerCase());
    console.log(result);
});

