// vue.config.js
const entryConfig = require('./config/entry-config');
const config = require('./config/config');
const path = require('path');
const buildPath = path.resolve(__dirname, './dist');
module.exports = {
  publicPath: '',
  pages: {
    index: {
      // page 的入口
      entry: entryConfig,
      chunks: 'all'
    }
  },
  chainWebpack (webpackConfig) {
    webpackConfig.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .tap(()=>{
        return {
          inline: true,
          fallback: false,
          name: '[name]:[hash:8].js'
        };
      })
      .end();
    webpackConfig.optimization.splitChunks({
      chunks: 'all',
      name: true,
      cacheGroups: {
        'vue-chunk': {
          name: 'vue-chunk',
          test(module, chunks) {
            return !!(module.resource && module.resource.indexOf('node_modules\\vue') !== -1);
          },
          priority: 1,
          enforce:true
        },
        lodash: {
          name: 'lodash',
          test:/lodash/,
          priority: 1,
          enforce:true
        },
        element: {
          name: 'element-ui',
          test: /element-ui/,
          priority: 1,
          enforce:true
        },
        moment: {
          name: 'moment',
          test: /moment/,
          priority: 1,
          enforce:true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          reuseExistingChunk: true,
          enforce:true
        }
      }
    });
    if(config.dropConsole){
      webpackConfig.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        return args;
      });
    }
  },
  outputDir: buildPath,
  devServer: {
    proxy: {
      '/local-api': {
        target: 'http://localhost:' + config.api_local_port,
        changeOrigin: true
      }
    }
  }
};
