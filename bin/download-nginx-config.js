
let node_ssh = require('node-ssh');
let path = require('path');
let ssh = new node_ssh();
let config = require('../config/config');
var open = require('open');
ssh.connect({
  host: config.publishServer.host,
  username: config.publishServer.username,
  privateKey: config.publishServer.privateKey || null,
  port: config.publishServer.port || 22,
  password: config.publishServer.password || null
}).then((e)=>{
// Local, Remote
  let localPath = path.resolve(__dirname, config.publishServer.localNginxConfPath + '/nginx.conf');
  ssh.getFile(localPath, config.publishServer.serverNginxConfPath + '/nginx.conf').then(function(Contents) {
    console.log('The File\'s contents were successfully downloaded:' + localPath);
    open(localPath);
    process.exit();
  }, function(error) {
    console.log('Something\'s wrong');
    console.log(error);
    process.exit();
  });
}).catch((err)=>{
  console.error(err);
});
