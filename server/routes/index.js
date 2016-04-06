"use strict";
var express = require('express');
var sendgrid = require('sendgrid')('azure_84c024842e756033521773acc6801bc1@azure.com', 'georgian2016');
var router = express.Router();
// db references
var User = require('../models/user');
/* Get Landing Page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home' });
});
/* Get Login Page. */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});
/* Get Register. */
router.get('/register', function (req, res, next) {
    res.render('login', { title: 'Register' });
});
/* Get About Page. */
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'About' });
});
/* Get Bracket Page. */
router.get('/bracket', function (req, res, next) {
    res.render('bracket', { title: 'Bracket' });
});
/* Get Support Page. */
router.get('/support', function (req, res, next) {
    req.flash('successmessage', 'Thank You. Your message has been sent.');
    req.flash('errormessage', 'An Error has occurred.');
    res.render('contact', { title: 'Support', messages: null });
});
/* Email Processing */
router.post('/contact', function (req, res, next) {
    sendgrid.send({
        to: 'patr9240@gmail.com',
        from: req.body.email,
        subject: 'Contact Form Submission',
        text: "This is a NorthStar Tournaments Message.\r\n\r\n" +
            "Name: " + req.body.name + "\r\n\r\n" +
            "Phone: " + req.body.phone + "\r\n\r\n" +
            req.body.message,
        html: "This is a NorthStar Tournaments Message.<br><br>" +
            "<strong>Name:</strong> " + req.body.name + "<br><br>" +
            "<strong>Phone:</strong> " + req.body.phone + "<br><br>" +
            req.body.message
    }, function (err, json) {
        if (err) {
            res.status(500).json('error');
        }
        res.render('contact', {
            title: 'Contact',
            messages: req.flash('successmessage')
        });
    });
});
module.exports = router;

//# sourceMappingURL=index.js.map
