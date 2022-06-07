const env = process.env.NODE_ENV || 'development';
let routes = require('./config/routes')
const config = require('./config/config')[env];
const app = require('express')();
const {databaseInit} = require('./config/mongodb')

require('./config/express')(app);

app.use(routes)

databaseInit()
.then(() => {
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
})
.catch(err => console.log(`Failed to initialize database, error: ${err.message}`))

