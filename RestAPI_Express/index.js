/* Focus on building endpoints, no connection to a database, just a simple array for learning and testing
Express gives our application a skeleton, a structure that allows or endpoints to be split into different
files according to what information they are accessing 

Route parameters for essencial or req values
Query String parameters for anything that is optional

Run with nodemon [filename] for instant changes to be done while running

*/

const Joi = require('joi');  //For input validation

const express = require('express');

const app = express(); //app.get() ; post(); put(); delete();

app.use(express.json()); //Adding middleware for JSON to be enable

const activities = [
    { id: 1, name: 'ac1'},
    { id: 2, name: 'ac2'},
    { id: 3, name: 'ac3'}
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/activities', (req, res) => {
    res.send(activities);
});

app.post('/api/activities', (req, res) => {
     
    //Input validation with Joi
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Input validation without Joi 
    /* if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    } */

    const acc = {
        id: activities.length + 1,
        name: req.body.name
    };
    activities.push(acc);
    res.send(acc);
});

app.get('/api/activities/:id', (req, res) => {
    let activity = activities.find(c => c.id === parseInt(req.params.id));
    if (!activity) {
        res.status(404).send('The activity with the given id was not found');
    }
    res.send(activity);
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

