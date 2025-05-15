const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

// Define Verse schema
const verseSchema = new mongoose.Schema({
  book: String,
  chapter: Number,
  verse: Number,
  text: String,
});

const Verse = mongoose.model('Verse', verseSchema);

// API endpoint to fetch verses
app.get('/api/bible/:book/:chapter', async (req, res) => {
  const { book, chapter } = req.params;
  try {
    const verses = await Verse.find({
      book,
      chapter: Number(chapter),
    }).sort('verse');
    res.json(verses);  // Ensure this returns an array of verses
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
