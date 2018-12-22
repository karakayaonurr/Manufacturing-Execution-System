var routerStation = require('./stationRouter');

module.exports = function(app){
    app.use('/', routerStation);
}