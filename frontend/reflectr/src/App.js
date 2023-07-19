import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [moodRating, setMoodRating] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [activities, setActivities] = useState('');

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    try {
      const response = await axios.get('/api/moodEntries');
      setMoodEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitMoodEntry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/moodEntries', {
        moodRating,
        thoughts,
        activities,
      });
      setMoodEntries([response.data, ...moodEntries]);
      setMoodRating('');
      setThoughts('');
      setActivities('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="content-container">
        <h1 className="app-title">Mood Checker</h1>
        <form onSubmit={submitMoodEntry} className="mood-form">
          <label className="form-label">Mood Rating:</label>
          <input
            type="number"
            value={moodRating}
            onChange={(e) => setMoodRating(e.target.value)}
            className="form-input"
            min="1"
            max="10"
            required
          />
          <label className="form-label">Thoughts:</label>
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            className="form-input"
          ></textarea>
          <label className="form-label">Activities:</label>
          <textarea
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            className="form-input"
          ></textarea>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        <h2 className="entries-title">Mood Entries</h2>
        <ul className="entries-list">
          {moodEntries.map((entry) => (
            <li key={entry._id} className="entry-item">
              <p className="entry-date">
                Date: {new Date(entry.date).toLocaleString()}
              </p>
              <p className="entry-rating">
                Mood Rating: {entry.moodRating}
              </p>
              <p className="entry-thoughts">Thoughts: {entry.thoughts}</p>
              <p className="entry-activities">
                Activities: {entry.activities}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default App;
