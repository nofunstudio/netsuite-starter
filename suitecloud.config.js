// Tests disabled for now - uncomment to enable test validation before deploy
// const SuiteCloudJestUnitTestRunner = require("@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner");

module.exports = {
    defaultProjectFolder: "source",
    // Uncomment to run tests before deployment
    // commands: {
    //     "project:deploy": {
    //         beforeExecuting: async args => {
    //             await SuiteCloudJestUnitTestRunner.run({
    //                 // Jest configuration options.
    //             });
    //             return args;
    //         },
    //     },
    // },
};

