const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult} = require('express-validator');
const axios = require('axios');
const config = require('config');


// @route   POST api/profile
// @desc    Create a profile
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status is required!').not().isEmpty(),
    check('skills', 'Skills are required!').not().isEmpty()
]], async( req, res) => {
    const validated = validationResult(req);
    if(!validated.isEmpty()) return res.status(400).json({errors: validated.array()});
    const {
        company,
        location,
        status,
        skills,
        bio,
        githubUserName,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // create an temp object to store values
    const profileFields = {};

    // assign userId & other required values to the profile 
    profileFields.user = req.userId;
    profileFields.status = status;
    // cuz the skills is an String separated by {,} so here we split it into an array and get ride of space
    profileFields.skills = Array.isArray(skills)? skills : skills.split(',').map(skill => ' ' + skill.trim())

    // check if values are provided. If so, store into the temp profile
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(githubUserName) profileFields.githubUserName = githubUserName;
    // for social we need to create an inner object first
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    try {
        // find if the profile has existed, if so update it
        let profile = await Profile.findOne({user: req.userId});
        if(profile){
            profile = await Profile.findOneAndUpdate(
                { user: req.userId },
                { $set: profileFields },
                { new: true, upsert: true }
              );
            return res.status(200).json({profile});
        }

        // if not. Create a new profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.status(200).json({msg: 'new user created', profile});

    } catch (err) {
        if(err) return res.status(500).json({message: err})
    }
})

// @route   GET api/profile
// @desc    Get All prolifes
// @access  Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'gravatar']);
        return res.status(200).json(profiles)
    } catch(err) {
        if(err) throw err;
        return res.status(500).send('Server error...')
    }
})

// @route   GET api/profile/user/
// @desc    Get logged in user's profile
// @access  Private
router.get('/me', auth, async(req, res) => {
    const userId = req.userId;
    try {
        const profile = await Profile.findOne({user: userId}).populate('users', ['name', 'gravatar']);
        if(!profile) return res.status(400).json({msg: 'Profile is not existed'});
        return res.status(200).json(profile)
    } catch(err) {
        if(err) return res.status(500).json({msg: 'Server error...'});
    }
})


// @route   GET api/profile/user/:userId
// @desc    Get One profile using userId
// @access  Public
router.get('/user/:userId', async(req, res) => {
    const userId = req.params.userId;
    try {
        const profile = await Profile.findOne({user: userId}).populate('user', ['name', 'gravatar']);
        if(!profile) return res.status(400).json({message: 'Profile is not existed'});
        return res.status(200).json(profile)
    } catch(err) {
        if(err.kind == 'ObjectId') return res.status(400).json({message: 'Profile is not existed'});
        return res.status(500).send('Server error...')
    }
})

// @route   DELETE api/profile
// @desc    Delete user, profile and post of one user
// @access  Private
router.delete('/', auth, async(req, res) => {
    const userId = req.userId;
    try {
        // Delete post > first
        await Post.deleteMany({ user: userId });
        // Delete profile > second
        await Profile.findOneAndRemove({user: userId});
        // Delete user >last... cuz we need user id to delete posts and profile
        await User.findOneAndRemove({_id: userId});

        return res.json({msg: 'User deleted...'});
    } catch(err){
        if (err) res.status(500).json({msg: 'Server error...'});
    }
})


// @route   PUT api/profile/experience
// @desc    Add experience to a certain profile
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty(),
]], async(req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({msg: firstCheck.array()});

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        let profile = await Profile.findOne({user: req.userId});
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json(profile);
    } catch(err) {
        if(err) return res.status(500).json({msg: 'Server error...'});
    }

})

// @route   DELETE api/profile/experience/:_id
// @desc    Delete an experience from a profile
// @access  Private
router.delete('/experience/:_id', auth, async(req, res) => {
    const _id = req.params._id;
    try {
        const profile = await Profile.findOne({ user: req.userId});
        const newExp = profile.experience.filter( ex => ex._id != _id);
        profile.experience = newExp;
        await profile.save();
        res.json(profile)
    } catch(err) {
        if(err) return res.status(500).json({msg: 'Server error...'});
    }
})


// @route   PUT api/profile/education
// @desc    Add education to a certain profile
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty(),
]], async(req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({msg: firstCheck.array()});
    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newEducation = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({user: req.userId});
        profile.education.unshift(newEducation);
        await profile.save();
        res.json(profile);
    } catch(err){
        if(err) return res.status(500).json({msg: 'Server error...'});
    }
})

// @route   DELETE api/profile/education/:_id
// @desc    Delete an education from a profile
// @access  Private
router.delete('/education/:_id', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        const newEducation = profile.education.filter( ed => ed._id != req.params._id);
        profile.education = newEducation;
        await profile.save();
        res.json(profile);

    } catch(err) {
        if(err) res.status(500).json({message: 'Server error...'});
    }

})


// @route   GET api/profile/github/:userName
// @desc    Get user reops from github
// @access  Public

router.get('/github/:userName', async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.userName}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      };
  
      const gitHubResponse = await axios.get(uri, { headers });
      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: 'No Github profile found' });
    }
  });
  


module.exports = router;