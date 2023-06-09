const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    // mode:"production",//区分环境
    entry:{
        index:"./lib/index.tsx"
    },
    resolve:{
        extensions:[".ts", ".tsx",".js",".jsx"]
    },
    output:{
        path:path.resolve(__dirname,"dist/lib"),
        libraryTarget:"Yang",
        libraryTarget:"umd",
    },
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                loader:"awesome-typescript-loader"
            },
            {
                test:/\.svg$/,
                loader:"svg-sprite-loader"
            },
            {
                test:/\.scss/,
                use:["style-loader","css-loader","sass-loader"],
            },
            {
                test:/\.(png|jpg|jpeg|git)$/,
                use:[
                    "file-loader"
                ]
            }
        ]
    },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template: "index.html"
    //     })
    // ],
    // externals: {
    //     react: {
    //         commonjs: 'react',
    //         commonjs2: 'react',
    //         amd: 'react',
    //         root: 'React',
    //     },
    //     'react-dom': {
    //         commonjs: 'react-dom',
    //         commonjs2: 'react-dom',
    //         amd: 'react-dom',
    //         root: 'ReactDOM',
    //     },
    // }
}