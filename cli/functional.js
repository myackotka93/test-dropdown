function functionalComponent(params) {
  let template = `import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
${params.importStyle}

function ${params.componentName}() {
  return (
    <div className=${params.className}>

    </div>
  )
}

${params.componentName}.propType = {
}

export default React.memo(${params.componentName});
`;

  return template;

}

module.exports = functionalComponent;