const https = require('https');
const app = require('./backend/app');
const fs = require('fs');
const port = 3000;
app.set('port',port);
const options = {
  key: fs.readFileSync('./src/assets/server-config/key.pem'),
  cert: fs.readFileSync('./src/assets/server-config/server.crt')
};
https.createServer(options, app).listen(port);
