//Section 6 -- Event Module

const EventEmitter = require('events');

/*

//Section 5 -- File Module

const fs = require('fs')

var fsObj = fs.readdirSync('./'); //files of the folder
var fsObjass = fs.readdir('./', function(err, files) {
    if (err) {
        console.log('Error', err);
    }
    else {
        console.log('Result', files);
    }
})

console.log(`Total read dir ${fsObj}`)
//Section 4 -- OS Module

const os = require('os');

var ostotal = os.totalmem();
var osFree = os.freemem();

console.log('total mem ' + ostotal);
console.log(`total free: ${osFree}`);


//Section 3 -- Path Module

const path = require('path');

var pathObj = path.parse(__filename);

console.log(pathObj);

//Section 2 -- Testing modules
const logger = require('./logger');

//outputs teste
logger.log('teste');

console.log(logger);

//Section1 -- Testing arrow functions
function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Dias');

sayHello = (name) => {
    console.log('Hello ' + name)
}

sayHello('João')

//global == window in browser although they are not added directly
//works with modules, every file is a module and needs to be exported to be referenced/used just like in react

*/