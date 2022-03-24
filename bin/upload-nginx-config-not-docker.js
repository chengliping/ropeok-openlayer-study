let node_ssh = require('node-ssh');
let path = require('path');
let ssh = new node_ssh();
let config = require('../config/config');
ssh.connect({
  host: config.publishServer.host,
  username: config.publishServer.username,
  privateKey: config.publishServer.privateKey || null,
  port: config.publishServer.port || 22,
  password: config.publishServer.password || null
}).then((e)=>{
  ssh.execCommand(`cp -r nginx.conf nginx.conf${new Date().getTime()}`, { cwd:config.publishServer.serverNginxConfPath }).finally(function(result) {
    ssh.execCommand('rm -f nginx.conf', { cwd:  config.publishServer.serverNginxConfPath}).finally(function(result) {
      ssh.putFile(path.resolve(__dirname, config.publishServer.localNginxConfPath), config.publishServer.serverNginxConfPath + '/nginx.conf').then(function() {
        console.log('The File thing is done');
        ssh.execCommand('nginx -t', { cwd:  config.publishServer.serverNginxConfPath}).then(function(result) {
          if(result.stderr){
            console.error(result.stderr);
            return;
          }

          ssh.execCommand('nginx -s reload', { cwd:  config.publishServer.serverNginxConfPath}).finally(function(result) {
            process.exit();
          }).catch((e)=>{
            console.error(e);
            process.exit();
          });
        }).catch((e)=>{
          console.error('error', e);
        });

      }, function(error) {
        console.log('Something\'s wrong');
        console.log(error);
      });
    }).catch((e)=>{
      console.error(e);
    });
  }).catch((e)=>{
    console.error(e);
  });

}).catch((err)=>{
  console.error(err);
});
