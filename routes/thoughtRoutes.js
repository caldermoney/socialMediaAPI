const express = require('express');
const User = require('../models/user');
const Thought = require('../models/thought');
const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // GET a single thought by its _id
  router.get('/:thoughtId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST a new thought
  router.post('/', async (req, res) => {
    try {
      const newThought = new Thought(req.body);
      const savedThought = await newThought.save();
  
      // Push the created thought's _id to the associated user's thoughts array
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: savedThought._id } },
        { new: true }
      );
  
      res.status(201).json(savedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // PUT to update a thought by its _id
  router.put('/:thoughtId', async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE to remove a thought by its _id
  router.delete('/:thoughtId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST to add a reaction to a thought
  router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE to remove a reaction from a thought
  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought or reaction not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;