/* Focus on building endpoints, no connection to a database, just a simple array for learning and testing
Express gives our application a skeleton, a structure that allows or endpoints to be split into different
files according to what information they are accessing 

Run with nodemon [filename] for instant changes to be done while running

*/

const express = require('express');

const app = express(); //app.get() ; post(); put(); delete();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/activities', (req, res) => {
    res.send('[1, 2, 3]');
});

// /api/activities/1 , 1 == id

//Route parameters for essencial or req values
//Query String parameters for anything that is optional

//Check this later
app.get('/api/post/:id', (req, res) => {
    res.send(req.param);
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

