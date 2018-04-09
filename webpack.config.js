const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const plugins = [ 
    new HtmlWebpackPlugin({ template: 'src/index.html' })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new UglifyJSPlugin(),
        new Dotenv({
            path: './.env.prod' // load this now instead of the ones in '.env'
        })
    )
} else {
    plugins.push(
        new Dotenv()
    )
}

module.exports = {
    entry: './src/main.js',
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}  
                  }
                ]
              }
        ]
    },
    node: {
        fs: "empty"
    },
    plugins,
    devServer : {
        host: '0.0.0.0',
        port: 9900
    }
};