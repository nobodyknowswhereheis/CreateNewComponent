// action generator goes here
module.exports = function generateActions(compName){
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