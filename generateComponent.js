// code goes here
module.exports = function generateComponent(compName) {
  const template = `
    iimport React, { Component } from 'react';
    import propTypes from "prop-types";
    
    export class ${compName} extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
            
          </div>
        )
      }
    }
    SimpleList.propTypes = {
      
  }
    `;

  return template;
}