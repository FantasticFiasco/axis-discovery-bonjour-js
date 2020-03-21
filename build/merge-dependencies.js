const fs = require('fs');
const path = require('path');

function readPackage(directory) {
    const fileName = path.join(directory, 'package.json');
    const content = fs.readFileSync(fileName);
    return JSON.parse(content);
}

const target = readPackage('.');
const sources = [
    readPackage('vendor/bonjour'),
    readPackage('vendor/multicast-dns')
];

for (const source of sources) {
    for (const dependency in source.dependencies) {
        if (target.dependencies.hasOwnProperty(dependency)) {
            throw new Error(`Target package already has a dependency to ${dependency}, how should we mege these?`);
        }

        target.dependencies[dependency] = source.dependencies[dependency];
    }
}

fs.writeFileSync('./package.json', JSON.stringify(target, null, 2));
