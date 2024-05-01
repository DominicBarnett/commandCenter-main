const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/commandCenterDatabase', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const Game = require('./models/Game');

// Create a new game
app.post('/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).send(newGame);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all games
app.get('/games', async (req, res) => {
  const includeDeleted = req.query.includeDeleted === 'true'; // Check for a query param 'includeDeleted'
  try {
    const query = includeDeleted ? {deleted: true} : { deleted: false}; // If includeDeleted is true, fetch all users, otherwise only non-deleted
    const games = await Game.find(query);
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get specific game
app.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const game = req.body;
  try {
      const updatedGame = await Game.findByIdAndUpdate(id, game, { new: true });
      if (!updatedGame) {
          return res.status(404).send({ message: 'game not found' });
      }
      res.send(updatedGame);
  } catch (error) {
      res.status(400).send({ message: 'Error updating game', error: error });
  }
});

app.delete('/games/:id', async (req, res) => {
  try {
      const updatedGame = await Game.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
      if (!updatedGame) {
          return res.status(404).json({ message: 'Game not found' });
      }
      res.json(updatedGame);
  } catch (error) {
      res.status(400).json({ message: "Error deleting game", error: error });
  }
});

// Additional routes for updating and deleting games can be added here

const Participation = require('./models/Participation');

// Add a participant to a game
app.post('/participations', async (req, res) => {
  try {
    const participation = new Participation(req.body);
    await participation.save();
    res.status(201).send(participation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all participations for a game
app.get('/participations', async (req, res) => {
  try {
    const participations = await Participation.find({});
    res.send(participations);
  } catch (error) {
    res.status(500).send(error);
  }
});

const User = require('./models/User');

app.get('/users', async (req, res) => {
  const includeDeleted = req.query.includeDeleted === 'true'; // Check for a query param 'includeDeleted'
  try {
      const query = includeDeleted ? {} : { deleted: false }; // If includeDeleted is true, fetch all users, otherwise only non-deleted
      const users = await User.find(query);
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  try {
      const user = await User.findByIdAndUpdate(id, { name, role }, { new: true, runValidators: true });
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
  } catch (error) {
      res.status(400).send({ message: 'Error updating user', error: error });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
  } catch (error) {
      res.status(400).json({ message: "Error deleting user", error: error });
  }
});

console.log('******************************')
console.log('commandCenter is ready')
console.log('******************************')
console.log('Current available APIs:')
console.log(app._router.stack.map(r => {
  if (r.route) {
      return Object.getOwnPropertyNames(r.route.methods)[0].toUpperCase() + ' ' + r.route.path          
  }
  return null; // Filter out middleware or other non-route entries
}).filter(item => item !== null));

