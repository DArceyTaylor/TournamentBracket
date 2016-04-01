import express = require('express');
var sendgrid = require('sendgrid')('azure_84c024842e756033521773acc6801bc1@azure.com', 'georgian2016');
var router = express.Router();

// db references
var User = require('../models/user');

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { title: 'Home' });
});

/* GET product page. */
router.get('/products', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { title: 'Products' });
});

/* GET services page. */
router.get('/services', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { title: 'Services' });
});

/* GET about page. */
router.get('/about', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { title: 'About' });
});

/* GET contact page. */
router.get('/contact', (req: express.Request, res: express.Response, next: any) => {
    req.flash('successmessage', 'Thank You. Your message has been sent.');
    req.flash('errormessage','An Error has occurred.');
    res.render('contact', { title: 'Contact', messages: null });
});

/* Email processing */
router.post('/contact', (req: express.Request, res: express.Response, next: any) => {
    sendgrid.send({
        to: 'tsiliopoulos@hotmail.com',
        from: req.body.email,
        subject: 'Contact Form Submission',
        text: "This message has been sent from the contact form at [MongoDB Demo]\r\n\r\n" +
        "Name: " + req.body.name + "\r\n\r\n" +
        "Phone: " + req.body.phone + "\r\n\r\n" +
        req.body.message,
        html: "This message has been sent from the contact form at [MongoDB Demo]<br><br>" +
        "<strong>Name:</strong> " + req.body.name + "<br><br>" +
        "<strong>Phone:</strong> " + req.body.phone + "<br><br>" +
        req.body.message
    },
        (err, json) => {
            if (err) { res.status(500).json('error'); 
            }
            res.render('contact', { 
                title: 'Contact',
                messages: req.flash('successmessage')
         });

        });
});


module.exports = router;
