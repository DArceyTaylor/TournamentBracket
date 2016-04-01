import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');
import userModel = require('../models/user');

import User = userModel.User;


// GET - show main users page - list all the users
router.get('/', (req: express.Request, res: express.Response, next: any) => {
   
    // use the Users model to query the Users collection
    User.find((error, users) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('users/index', {
                title: 'Users',
                users: users
            });
        }
    });
});

// GET add page - show the blank form
router.get('/add', function(req: express.Request, res: express.Response, next: any) {
    res.render('users/add', {
        title: 'Add a New User'
    });
});

// POST add page - save the new user
router.post('/add', function(req: express.Request, res: express.Response, next: any) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    }, function(error, User) {
        // did we get back an error or valid Users object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    })
});

// GET edit page - show the current user in the form
router.get('/:id', (req: express.Request, res: express.Response, next: any) => {

    var id = req.params.id;

    User.findById(id, (error, User) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('users/edit', {
                title: 'User Details',
                user: User
            });
        }
    });
});

// POST edit page - update the selected user
router.post('/:id', (req: express.Request, res: express.Response, next: any) => {

    // grab the id from the url parameter
    var id = req.params.id;

    // create and populate a user object
    var user = new User({
        _id: id,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    // run the update using mongoose and our model
    User.update({ _id: id }, user, (error) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});

// GET delete user
router.get('/delete/:id', (req: express.Request, res: express.Response, next: any) => {

    // get the id from the url
    var id = req.params.id;

    // use the model and delete this record
    User.remove({ _id: id }, (error) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});


// make this public
module.exports = router;