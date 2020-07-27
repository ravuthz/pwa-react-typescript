const {
    override,
    disableChunk,
    addLessLoader,
} = require("customize-cra");

const lessLoaderConfig = {
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: {
        "@primary-color": "#b33939"
    },
};


module.exports = override(
    addLessLoader(lessLoaderConfig),
    disableChunk(),
);