const util = require("util"); // eslint-disable-line import/no-extraneous-dependencies

const toConstantName = (str) =>
  str.replace(/[A-Z]([A-Z]*)/g, ($1) =>
    `_${$1.toLowerCase()}`.replace(/([A-Z])/g, ($match) =>
      `_${$match.toLowerCase()}`)).toUpperCase();


const conditionallyWrapQuotes = (str) =>
  /\s+/.test(str) ? `"${str}"` : str;

const toDotEnvString = (environmentVariables) => {
  let dotEnvDocument = "";

  Object.keys(environmentVariables).forEach(envVar => {
    dotEnvDocument += util.format("%s=%s\r\n", toConstantName(envVar), conditionallyWrapQuotes(environmentVariables[envVar]))
  });

  return dotEnvDocument;
}

module.exports = toDotEnvString;
