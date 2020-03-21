const fs = require('fs');
const path = require('path');

function readPackage(directory) {
    const fileName = path.join(directory, 'package.json');
    const content = fs.readFileSync(fileName);
    return JSON.parse(content);
}

function sort(dependencies) {
    const result = {};

    Object.keys(dependencies).sort().forEach(key => {
        result[key] = dependencies[key];
      });

    return result;
}

const thisPackage = readPackage('.');
const bonjour = readPackage('vendor/bonjour');
const multicastDns = readPackage('vendor/multicast-dns');

const dependencies = sort({
    ...thisPackage.dependencies,
    ...bonjour.dependencies,
    ...multicastDns.dependencies
});

thisPackage.dependencies = dependencies;

fs.writeFileSync('./package.json', JSON.stringify(thisPackage, null, 2));

// for (const source of sources) {
//     for (const dependency in source.dependencies) {
//         if (target.dependencies.hasOwnProperty(dependency)) {
//             throw new Error(`Target package already has a dependency to ${dependency}, how should we mege these?`);
//         }

//         target.dependencies[dependency] = source.dependencies[dependency];
//     }
// }


