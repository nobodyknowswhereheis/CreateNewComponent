// generate reducer file here.
module.exports = function generateReducer(compName){
    const template = `
    import React, {PropTypes} from 'react';
    
    export class ${compName} extends React.Component {
      render() {
        return (
          <div>
            
          </div>
        )
      }
    }
    `;
    
    return template;
}