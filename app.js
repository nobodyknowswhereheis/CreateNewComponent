const fs = require('fs');
const generateComponent = require('./generateComponent');
const generateActions = require('./generateActions');
const generateReducer = require('./generateReducer');
// write some files
// refer to https://ourcodeworld.com/articles/read/297/how-to-create-a-file-using-the-filesystem-fs-module-in-node-js

// call the generators and then write the files to a directory.

// print command line args
let componentName = process.argv[2];
let shouldBuildActions = process.argv[3] || false;
let shouldBuildReducers = process.argv[4] || false;

if (!componentName) {
    console.error("Error: Must specify a component name.");
    return;
}

// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

try {
    _writeToFile(generateComponent(componentName),componentName);
    _writeToFile(generateActions(componentName),`${componentName}Actions.js`);
    _writeToFile(generateReducer(componentName),`${componentName}Reducer.js`);
} catch (e) {
    console.error(e);
}

// write contents to file.
function _writeToFile(content,fileName){
    var encoding = "utf8";
    
    fs.writeFile(`${fileName}.js`, content, encoding, (err) => {
        if (err) throw err;
    
        console.log("The file was succesfully saved!");
    });
}