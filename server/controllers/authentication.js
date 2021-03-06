const User = require('../models/user');

exports.signup = function (req, res, next) {
    // res.send({ success: 'true' });
    const email = req.body.email;
    const password = req.body.password;

    // See if user with a given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        // If a user with email does exist, return an error 
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        //If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) { return next(err); }

            //Respond to request indicating the user was created
            res.json({ success: true });

        });
    });
}