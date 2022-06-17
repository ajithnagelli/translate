const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const User = require('../models/user.model');

process.SECRET_KEY = 'secret';

exports.register = function(req, res) {
    const userData = {
      username: req.body.username,
      hashedPassword: req.body.hashedPassword,
      email: req.body.email
    }
    User.findOne({
      email: req.body.email
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
            userData.hashedPassword = hash
            User.create(userData)
                .then(user => {
                    res.json({ status: "User registered successfully" });
                })
                .catch(err => {
                    var arr = Object.keys(err['errors'])
                    var errors = []
                    for (i in arr) {
                        errors.push(err['errors'][arr[i]].message);
                    }
                    res.json({ error: errors });
                });
            });
        }
        else {
            res.json({ error: 'user already exist' });
        }
    })
    .catch(err => {
        var arr = Object.keys(err['errors'])
        var errors = []
        for (i in arr) {
            errors.push(err['errors'][arr[i]].message);
        }
        res.json({ error: errors });
    });  
}

exports.login = function (req, res) {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.hashedPassword, user.hashedPassword)) {
            // Passwords match
            const payload = {
                _id: user._id,
                email: user.email,
                username: user.username
            }
            let token = jwt.sign(payload, process.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: 86400
            });
            res.send(token);
            } else {
                // Passwords don't match
                res.json({ error: 'Incorrect Password' });
            }
        } else {
            res.json({ error: 'User does not exist' });
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    });
}