const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   GET api/auth
// @desc    If a user has token, he will be able to go through this private route
// @access  Private
router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        return res.json(user)
    } catch(error) {
        return res.status(500).json({msg: 'Server Error'})
    }
})


// @route   POST api/auth
// @desc    Authenticate user & get token = Log in
// @access  Public

router.post('/', [
    check('email').isEmail(),
    check('password').exists()
], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) {
        return res.status(400).json({msg: firstCheck.array()});
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(403).json({msg: "User doesn't exist"});
        }
        const isSamePassword = await bcrypt.compare(password, user.password);
        if(!isSamePassword) {
            return res.status(403).json({msg: 'wrong password!'});
        }
        const payload = {
            _id: user._id
        }
        const token = jwt.sign(payload, config.get('JWT'));
        
        return res.status(200).json( {msg:'User is now logged-in', token});

    } catch(err) {
        return res.status(500).json({msg: 'Server error'});
    }
})  

module.exports = router;