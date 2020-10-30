/* Focus on building endpoints, no connection to a database, just a simple array for learning and testing
Express gives our application a skeleton, a structure that allows or endpoints to be split into different
files according to what information they are accessing 

Route parameters for essencial or req values
Query String parameters for anything that is optional

Run with nodemon [filename] for instant changes to be done while running

Postman can and should be used to test all the endpoints

*/

const Joi = require('joi');  //For input validation
const express = require('express');
const { ObjectID } = require('mongodb');
const app = express(); //app.get() ; post(); put(); delete();
app.use(express.json()); //Adding middleware for JSON to be enable

//MongoDB Component
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/hypermood', (err, db) => {

    if (err) {
        console.log(`Error ${err}`);
    }
    
    const dbo = db.db("hypermood");

    //Simple Database
    const activities = [
        { id: 1, name: 'ac1'},
        { id: 2, name: 'ac2'},
        { id: 3, name: 'ac3'}
    ]

    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    //List all the activities in the collection
    app.get('/api/activities', (req, res) => {
        dbo.collection("activity").find({}).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
    
    //Fetch a specific activity
    app.get('/api/activities/:id', (req, res) => {
        console.log('ID PASSED: ', req.params.id);

        dbo.collection('activity').findOne({"_id" : new ObjectID(req.params.id)}, (err, result) => {
            if (err) throw err;

            if (result == null) {
                res.status(404).send('The activity with the given id was not found');
                return;
            }
            console.log(result);
            res.send(result);
        });
    });

    //Post one activity
    app.post('/api/activities', (req, res) => {
        //Input validation with Joi
        const schema = Joi.object({
            name: Joi.string().min(3).max(70).required(),
            description: Joi.string().min(3).max(500).optional()
        });
        const result = schema.validate(req.body);
        console.log(result);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }

        const acc = {
            name: req.body.name,
            description: req.body.description
        };

        dbo.collection('activity').insertOne(acc, (err, result) => {
            if (err) throw err;
            console.log('RES: ', result);
            console.log('ACC: ', acc);
            res.send(acc);
        });
    });
    
    // ############################################################ TODO

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

})

//Port Config
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

