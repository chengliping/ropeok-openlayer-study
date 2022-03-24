let exportConfig;
let commonConfig = require('./config-common.json');
let _ = require('lodash');
exportConfig = _.merge(commonConfig, {});
module.exports = exportConfig;
