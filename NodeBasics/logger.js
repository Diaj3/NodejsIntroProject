//Example of another module
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{

    log(message) {
        
        //send an http request
        console.log(message);

        //Making a noise (signaling) -- event raised
        this.emit('messageLogged', {id: 1, url: 'urlExample'});
    }
    
}
module.exports = Logger;