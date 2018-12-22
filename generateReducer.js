// generate reducer file here.
module.exports = function generateReducer(compName,default_actions){
    var actions = default_actions.map((element,index)=>{
      var name = compName.toUpperCase()+element;
       return `case ${name}:
        return {
          ...state
        };`
    });
    const template = `
    export function ${compName}Reducer(state, action) {

      switch (action.type) {
          ${actions}
          default:
              return state;
      }
  
  }
    `;
    
    return template;
}