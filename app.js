const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.config', 'utf-8'))// write some files

const generateComponent = require(config.componentTemplate);
const generateActions = require(config.actionTemplate);
const generateReducer = require(config.reducerTemplate);
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

try {
    try{
        process.chdir(`${config.componentRoot}/${componentName}`);
    }catch(e){
        console.warn("Component directory not found in "+config.componentRoot+" creating new directory...");
        fs.mkdirSync(`${config.componentRoot}/${componentName}`)
        process.chdir(`${config.componentRoot}/${componentName}`);
    }
    console.log("Writing files from templates...");
    _writeToFile(generateComponent(componentName),componentName);
    if(shouldBuildActions)
        _writeToFile(generateActions(componentName),`${componentName}Actions`);
    if(shouldBuildReducers)
        _writeToFile(generateReducer(componentName),`${componentName}Reducer`);
} catch (e) {
    console.error(e);
}

// write contents to file.
function _writeToFile(content,fileName){
    var encoding = "utf8";
    
    fs.writeFile(`${fileName}.js`, content, encoding, (err) => {
        if (err) throw err;
    
        console.log("The file "+fileName+" was succesfully saved!");
    });
}