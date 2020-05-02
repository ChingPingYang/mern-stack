const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult} = require('express-validator');

// @route   POST api/post
// @desc    create a post
// @access  Private
router.post('/', [auth, [
    check('text', 'Content is required.').not().isEmpty()
]], async (req,res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({message: firstCheck.array()});
    try {
        const user = await User.findById(req.userId).select('-password');
        const post = new Post({
            user: req.userId,
            name: user.name,
            text: req.body.text,
            avatar: user.gravatar
        })
        await post.save();
        res.json(post);
    } catch(err) {
        if(err) res.status(500).json({message: 'Server error...'});
    }
    
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        return res.json(posts);
    } catch(err){ 
        if(err) res.status(500).json({message: 'Server error...'});
    }
})

// @route   GET api/posts/:postId
// @desc    Get one post by _id
// @access  Private
router.get('/:postId', auth, async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        const user = await User.find().select('_id');
        const existUser = user.map(user => user._id)
        if(!post) return res.status(404).json({message: 'Post not found.'});
        return res.json({post, existUser});
    } catch(err){ 
        if(err.kind === 'ObjectId') {
            res.status(404).json({message: 'Post not found.'});
        } else {
            res.status(500).json({message: 'Server error...'});
        }
    }
})

// @route   DELETE api/posts/:postId
// @desc    Delete one post
// @access  Private
router.delete('/:postId', auth, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        //Bring in the post
        const post = await Post.findById(postId);
        //Check if there's a post
        if(!post) return res.status(404).json({msg: 'Post not found.'});
        //Check if the post belongs to this user
        if(post.user.toString() !== userId) return res.status(401).json({msg: 'Only the owner can delete it.'});

        //after checking we can now remove this post
        await post.remove();
        res.json({msg: 'Post is deleted'});

    } catch(err){ 
        if(err.kind === 'ObjectId') {
            res.status(404).json({message: 'Post not found.'});
        } else {
            res.status(500).json({message: 'Server error...'});
        }
    }
})

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put('/like/:postId', auth, async(req, res) => {
    const postId = req.params.postId;
    try {
        // Get the post
        const post = await Post.findById(postId);
        // Check if the post has been liked by this user
        if(post.likes.filter(post => post.user.toString() === req.userId).length > 0) {
            return res.status(403).json({msg: 'You have liked this post before.'})
        };
        // Add like object to the array
        post.likes.unshift({user: req.userId});
        // Save the post again
        await post.save();
        res.json(post.likes);
    } catch(err){
        if(err) res.status(500).json({msg: 'server err'});
    }
})

// @route   PUT api/posts/unlike/:postId
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:postId', auth, async(req, res) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const post = await Post.findById(postId);
        //Get the index of post
        const postIndext = post.likes.map(post => post.user.toString()).indexOf(userId);
        //If postIndext < 0, means the user hasn't liked the post
        if(postIndext < 0) return res.status(403).json({msg: "You haven't liked the post..."});
        //remove the like
        post.likes.splice(postIndext, 1);
        await post.save();
        res.json(post.likes);
    } catch(err) {
        if(err) res.status(500).json({msg: 'server err'});
    }
})

// @route   PUT api/posts/comment/:postId
// @desc    Create a comment
// @access  Private
router.post('/comment/:postId', [auth, [
    check('text', 'comment is required').not().isEmpty()
]], async(req ,res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(403).json({msg: firstCheck.array()});
    try {
        const user = await User.findById(req.userId).select('-password');
        const post = await Post.findById(req.params.postId);
        const newComment = {
            user: req.userId,
            text: req.body.text,
            name: user.name,
            avatar: user.gravatar
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post)
    } catch(err) {
        if(err) res.status(500).json({msg: 'server err'});
    }
})

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:postId/:commentId', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        //Check if comment exist
        const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId);
        if(!comment) return res.status(404).json({msg: 'No comment existed'});
        //Check if the person is the comment creater
        if(comment.user.toString() !== req.userId) res.status(403).json({msg: 'This user did not create the comment.'});

        //find the index of comment 
        const commentIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);
        post.comments.splice(commentIndex, 1);
        
        await post.save()
        res.json(post);
    } catch(err) {
        if(err) res.status(500).json({msg: 'server err'});
    }
})


module.exports = router;