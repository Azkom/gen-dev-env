const path = require ('path');
module.exports = {
    entry: './app/assets/scripts/App.js',
    output:{
        filename: 'Bundle.js',
        path: path.resolve(__dirname, 'app/temp/scripts')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}