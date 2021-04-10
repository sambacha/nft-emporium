
module.exports = {
  options: {
    // this global doNotFollow option makes sure that dependency-cruiser
    // doesn't crawl any further when it encounters something with node_modules
    // in the name. The encountered module will be in the dependency-tree however
    doNotFollow: "node_modules",
    reporterOptions: {
      dot: {
        filters: {
          // makes sure only things in the src tree end up in the dot
          // report, and not things in node_modules, test or bin
          includeOnly: {
            path: "^src",
          },
        },
      },
    },
  },
};
