function classComponent(params) {
  let template = `import React, {Component} from 'react';
${params.redux ? `import {connect} from 'react-redux';` : ''}
${params.importStyle}

${!params.redux ? 'export default ' : ''}class ${params.componentName} extends Component {
  render() {
    return (
      <div className=${params.className}>

      </div>
    )
  }
}
${params.redux ?
      `
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(${params.componentName});` : ''
    }
`;

  return template;
}

module.exports = classComponent;