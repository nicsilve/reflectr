const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mood_checker_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mood Entry Schema
const moodEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  moodRating: { type: Number, required: true },
  thoughts: { type: String },
  activities: { type: String },
});

// Create Mood Entry Model
const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);

// API Routes
app.get('/api/moodEntries', async (req, res) => {
  try {
    const moodEntries = await MoodEntry.find().sort({ date: -1 });
    res.json(moodEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/moodEntries', async (req, res) => {
  try {
    const { moodRating, thoughts, activities } = req.body;
    const newMoodEntry = new MoodEntry({
      moodRating,
      thoughts,
      activities,
    });
    await newMoodEntry.save();
    res.json(newMoodEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
