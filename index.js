const env = process.env.NODE_ENV || 'development';
let routes = require('./config/routes')
const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);

app.use(routes)


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));