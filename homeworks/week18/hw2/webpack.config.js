const path = require('path');

module.exports = {
  mode: 'development', // 預設:production模式。打包成比較看得懂的 development 模式
  entry: './src/index.js', // 入口程式的檔案路徑
  output: {
    path: path.resolve(__dirname, 'dist'), // 輸出的資料夾路徑與名稱
    filename: 'bundle.js', // 打包輸出後的檔案名稱
  },
  devServer: {
    contentBase: './dist', // dev server 輸出的資料夾路徑與名稱
  },
};
