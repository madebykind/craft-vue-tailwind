
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = {
  prompt: (props) => {
    const { inquirer } = props;

    const questions = [
      {
        type: 'list',
        name: 'type',
        message: "Select a component type",
        choices: ['Atom', 'Molecule', 'Tool', 'Util', 'Form'],
        filter: (val) =>`${val.toLowerCase()}`,
        default: () => 'Atom',
      },{
        type: 'input',
        name: 'slug',
        message: "Enter a component slug (used for file / directory naming)",
        validate: (val) => (val !== '') ? true : 'slug is required',
      },{
        type: 'confirm',
        name: 'hasModifiers',
        message: 'Does this component have modifiers?',
        default: false,
      },
    ];

    return inquirer.prompt(questions);
  },
};
