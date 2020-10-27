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

//Simple Database
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

app.get('/api/activities/:id', (req, res) => {
    let activity = activities.find(c => c.id === parseInt(req.params.id));
    if (!activity) {
        return res.status(404).send('The activity with the given id was not found');
    }
    res.send(activity);
});

app.post('/api/activities', (req, res) => {
     
    //Input validation with Joi
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    console.log(result);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const acc = {
        id: activities.length + 1,
        name: req.body.name
    };
    activities.push(acc);
    res.send(acc);
});

app.put('/api/activities/:id', (req, res) => {
    //Look up the activity, if not existing, return 404
    //if invalid -> return 400
    
    const activity = activities.find(c => c.id === parseInt(req.params.id));
    if (!activity) {
        return res.status(404).send('The activity with the given id was not found');
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    //If error -> return error
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    activity.name = req.body.name;

    res.send(activity);
});

app.delete('/api/activities/:id', (req, res) => {

    const activity = activities.find(c => c.id === parseInt(req.params.id));
    if (!activity) {
        return res.status(404).send('The activity with the given id was not found');
    }

    const index = activities.indexOf(activity);
    activities.splice(index, 1);

    res.send(activity);
})

//Port Config
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

