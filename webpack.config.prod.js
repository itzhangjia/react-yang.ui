const base=require("./webpack.config")
const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports=Object.assign({},base,{
    mode:"development",//区分环境
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    }
})