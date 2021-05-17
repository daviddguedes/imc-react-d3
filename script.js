const fs = require('fs');

let data = [];

for (let x = 30; x < 131; x++) {
    for (let y = 140; y < 211; y++) {
        const val = y / 100;
        const imc = x / (val * val);
        data.push({
            group: x,
            variable: y,
            value: imc.toFixed(2)
        });
    }
}

fs.writeFile('./data1.json', JSON.stringify(data), (a, b) => {});
