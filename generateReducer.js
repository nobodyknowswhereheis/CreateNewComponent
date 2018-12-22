// generate reducer file here.
module.exports = function generateReducer(compName, default_actions) {
    var imports = default_actions.map((element, index) => {
        var name = compName.toUpperCase() + element;
        return `${name}, `;
    });
    var actions = default_actions.map((element, index) => {
        var name = compName.toUpperCase() + element;
        return `
       case ${name}:
            return {
            ...state
            };
        `
    });
    const template = `
    import {${imports}} from './${compName}Actions';

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