export default (moduleQueue, availableModules, debug) => {
  return Object.keys(moduleQueue).reduce((acc, key) => {
    if (typeof availableModules[key] === "function") {
      acc[key] = availableModules[key](moduleQueue[key], moduleQueue);
    } else if (debug) {
      console.warn(`No module found for '${key}'`);
    }
    return acc;
  }, {});
};
