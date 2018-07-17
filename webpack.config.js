const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProduction = (env === 'production');

    return {
        entry: './src/app.js',
        output: {
            // Absolute path to current folder + whatever
            path: path.join(__dirname, './public/', 'dist'),
            filename: 'bundle.js' 
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css",
              })
        ],
        module: {
            rules: [{
                // Run bable
                // Loader: transforms a file before webpack uses it
                // Test: the files to transform (regex)
                // Exclude: don't modify these files
                // Babel-loader uses the .babelrc configuration file to take arguments
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                // Use scss (and css) and put it into the dom
                // Order matters for the 'use' array
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        mode: 'development',
        
        /**
         * Prod: Takes a while to build and re-build, but only take up space if we open dev tools
         * Dev: faster and cheaper
         */
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, './public/'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
};
