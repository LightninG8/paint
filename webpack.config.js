'use strict';

const path = require("path");
const miniCss = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/scripts/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: "home",
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        }]
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
    ]
}