module.exports = {
    devtool: 'inline-source-map',
    entry: "./app/app.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/js/"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}