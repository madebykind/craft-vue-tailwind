const util = require("util");

const toConstantName = (str) =>
  str.replace(/[A-Z]([A-Z]*)/g, ($1) =>
    `_${$1.toLowerCase()}`.replace(/([A-Z])/g, ($1) =>
      `_${$1.toLowerCase()}`)).toUpperCase();


function toDotEnvString (environmentVariables) {
  let dotEnvDocument = "";

  Object.keys(environmentVariables).forEach(envVar => {
    dotEnvDocument += util.format("%s=%s\r\n", toConstantName(envVar), environmentVariables[envVar])
  });

  return dotEnvDocument;
}

module.exports = toDotEnvString;
