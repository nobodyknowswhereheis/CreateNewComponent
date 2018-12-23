// action generator goes here
module.exports = function generateActions(compName,default_actions){
  var actions = default_actions.map((element,index)=>{
    var name = compName.toUpperCase()+element;
     return `
     export const ${name} = '${name}';`;
  });
  var clean = actions.toString().replace(',','\n');
    const template = `
    ${clean}
    `;
    
    return template;
}