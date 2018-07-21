const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Specify if we are in dev or prod or test
// Production on Heroku, Test in testing, development in dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path: '.env.test'});
}
else if (process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development'});
}

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
              }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
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
