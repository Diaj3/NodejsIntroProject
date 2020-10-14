
//Section 4 -- OS Module

const os = requite('os');

var osObj = '';

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

