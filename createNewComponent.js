// ***************** createNewComponent.js *******************
// Create all of the files needed for a new react/redux component
// and place them in a new directory.
//
// Author: Jesse Adams
// Date: 12/21/2018

// refer to this link: https://medium.com/@arnaudrinquin/build-modular-application-with-npm-local-modules-dfc5ff047bcc

const fs = require('fs');
const defaultConfig = JSON.parse(fs.readFileSync('./node_modules/.config', 'utf-8'))
const userConfig = JSON.parse(fs.readFileSync('.componentConfig', 'utf-8'))
const config = {
    ...defaultConfig,
    ...userConfig
}
const generateComponent = require(config.componentTemplate);
const generateActions = require(config.actionTemplate);
const generateReducer = require(config.reducerTemplate);

// get command line args
let componentName = process.argv[2];
let shouldBuildActions = process.argv[3] || false;
let shouldBuildReducers = process.argv[4] || false;

if (!componentName) {
    console.error("Error: Must specify a component name.");
    return;
}

// create the new directory if needed and write files
try {
    try{
        // assume directory already exists
        process.chdir(`${config.componentRoot}/${componentName}`);
    }catch(e){
        // oops.. guess it doesn't
        console.warn("Component directory not found in "+config.componentRoot+" creating new directory...");
        fs.mkdirSync(`${config.componentRoot}/${componentName}`)
        process.chdir(`${config.componentRoot}/${componentName}`);
    }
    // now that we have a directory and are in it, let's write the files
    console.log("Writing files from templates...");
    _writeToFile(generateComponent(componentName),componentName);
    if(shouldBuildActions)
        _writeToFile(generateActions(componentName,config.default_actions),`${componentName}Actions`);
    if(shouldBuildReducers)
        _writeToFile(generateReducer(componentName,config.default_actions),`${componentName}Reducer`);
} catch (e) {
    // how did I get here?
    console.error("It looks like there was an error writing to the specified file or directory.");
    console.error("Double check that the directory specified in componentRoot exists and is writable.");
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