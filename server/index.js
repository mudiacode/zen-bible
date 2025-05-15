require('dotenv').config(); // ✅ This loads .env into process.env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

const verseSchema = new mongoose.Schema({
  book: String,
  chapter: Number,
  verse: Number,
  text: String,
});
const Verse = mongoose.model('Verse', verseSchema);

app.get('/api/bible/:book/:chapter', async (req, res) => {
  const { book, chapter } = req.params;
  try {
    const verses = await Verse.find({ book, chapter: Number(chapter) }).sort('verse');
    res.json(verses);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
