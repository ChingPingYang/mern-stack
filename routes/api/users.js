const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Register user & give a token
// @access  Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Has to be email').isEmail(),
    check('password', 'Has to be 6 characters').isLength({min: 6})
], async (req, res) => {
    const firstValidation = validationResult(req);
    if(!firstValidation.isEmpty()) {
        return res.status(400).json({errors: firstValidation.array()});
    }
    
    const {name, email , password} = req.body;
    
    try{
        const existed = await User.findOne({email});
        if(existed) {
            return res.status(400).json({errors: [{msg: 'Email is used'}]});
        }

        const gravatarUrl = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gravatar: gravatarUrl
        });
        await newUser.save();

        const payload = {_id:newUser._id};
        const token = jwt.sign(payload, config.get('JWT'));
        return res.status(200).json({token: token});

    } catch(err) {
        if(err) throw err;
        return res.status(500)
    }

})


module.exports = router;