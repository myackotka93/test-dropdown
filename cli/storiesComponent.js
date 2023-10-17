function storiesComponent(params) {
  let template = `import ${params.componentName} from "@/${params.path.join('/')}/${params.componentName}";

export default {
  title: "${params.path.join('/')}",
  component: ${params.componentName},

  argTypes: {},
};

const Template = (args) => <div className="wrapper">
  <${params.componentName} {...args} />
</div>


export const Default = Template.bind({})

Default.args = {
};`;

  return template;
}

module.exports = storiesComponent;