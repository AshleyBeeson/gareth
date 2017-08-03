module.exports = {

    entry:{
		index: './src/index.js',
		BugListItemTest: './spec/BugListItemTest.jsx',
		BugListTest: './spec/BugListTest.jsx'
	},
    output: {
        path: __dirname,
        filename: "./public/js/[name].bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    devServer: {
        inline: true,
        port: 7070
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                } 
            },
            { 
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    },
	 resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },
  
	 node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
