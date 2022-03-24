let { NodeSSH } = require('node-ssh');
ssh = new NodeSSH();
let config = require('../config/config');
var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
console.log('开始登录远程服务器');
ssh.connect({
  host: config.publishServer.host,
  username: config.publishServer.username,
  privateKey: config.publishServer.privateKey || null,
  port: config.publishServer.port || 22,
  password: config.publishServer.password || null
}).then(async (e)=>{
  console.log('登录远程服务器成功');
  console.log('开始打包dist');
  // create a file to stream archive data to.
  var output = fs.createWriteStream(path.resolve(__dirname, '../dist.zip'));
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', async function() {
    console.log('打包成功:' + archive.pointer() + 'bytes');
    console.log(`开始备份:${config.publishServer.serverPath}/dist${new Date().getTime()}`);
    await ssh.execCommand(`cp -r dist dist${new Date().getTime()}`, { cwd:config.publishServer.serverPath }).then(function(result) {
      console.log(`备份成功:${config.publishServer.serverPath}/dist${new Date().getTime()}`);
    }).catch((err)=>{
      console.error(err);
    });
    console.log(`开始移除：${config.publishServer.serverPath}/dist`);
    await ssh.execCommand('rm -rf dist/*', { cwd:  config.publishServer.serverPath}).then(function(result) {
      console.log(`移除成功：${config.publishServer.serverPath}/dist`);
    }).catch((err)=>{
      console.error(err);
    });
    console.log('开始上传：' + config.publishServer.serverPath + '/dist/dist.zip');
    await ssh.putFile(path.resolve(__dirname, '../dist.zip'), config.publishServer.serverPath + '/dist/dist.zip').then(function(result) {
      console.log('上传成功：' + config.publishServer.serverPath + '/dist/dist.zip');
    }).catch((err)=>{
      console.error(err);
      process.exit();
    });
    console.log('开始解压:dist.zip');
    await ssh.execCommand('unzip dist.zip', { cwd:  config.publishServer.serverPath + '/dist'}).then(function(result) {
      console.log('解压成功:dist.zip');
      process.exit();
    }).catch((err)=>{
      console.error(err);
      process.exit();
    });
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');

  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.error(err);
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);


  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory('dist/', false);


  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be  fired right after calling this method so register to them beforehand
  archive.finalize();


}).catch((err)=>{
  console.error(err);
});
