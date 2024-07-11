import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [travelers, setTravelers] = useState('');
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTravelersChange = (e) => {
    setTravelers(e.target.value);
  };

  const fetchLlmResponse = async (content) => {
    const TOKEN = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual OpenAI API token

    const url = 'https://api.openai.com/v1/chat/completions';
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
      temperature: 0.7,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    };
    try {
      console.log('Sending request to OpenAI API:', requestBody);
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Received response from OpenAI API:', data);
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      return 'Failed to generate response';
    }
  };

  const handleGenerateItinerary = async (e) => {
    e.preventDefault();
    if (!location || !duration || !travelers) {
      alert('Please fill in all the fields before generating the itinerary.');
      return;
    }
    const content = `Design a holiday itinerary for ${travelers} going to ${location} for the duration of ${duration}`;
    const response = await fetchLlmResponse(content);
    if (response === 'Failed to generate response') {
      alert('Failed to generate itinerary. Please try again.');
    } else {
      navigate('/itinerary', { state: { itinerary: response, travelers, location, duration } });
    }
  };

  const handleGeneratePackingList = async (e) => {
    e.preventDefault();
    if (!location || !duration || !travelers) {
      alert('Please fill in all the fields before generating the packing list.');
      return;
    }
    const content = `Provide a packing list for a holiday itinerary for ${travelers} going to ${location} for the duration of ${duration}, please collected it whit numbers`;
    const response = await fetchLlmResponse(content);
    if (response === 'Failed to generate response') {
      alert('Failed to generate packing list. Please try again.');
    } else {
      navigate('/packing-list', { state: { packingList: response, travelers, location, duration } });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo-title">
          <div className="logo">
            <h1>Travel.AI</h1>
            <p>AI Travel Planner</p>
          </div>
        </div>
        <div className="info-contact">
          <div className='button'>
            <Link to="/info-contact" className="info-button">Info / Contact</Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className='generate-here-title'>
            <h2>Generate here</h2>
        </div>
        <div className="input-section">
          <div className="input-group">
            <div className="label-div">
              <label>I want to go to</label>
            </div>
            <input type="text" placeholder="write here.." value={location} onChange={handleLocationChange} />
          </div>
          <div className="input-group">
            <div className="label-div">
              <label>For</label>
            </div>
            <input type="text" placeholder="write here.." value={duration} onChange={handleDurationChange} />
          </div>
          <div className="input-group">
            <div className="label-div">
              <label>With</label>
            </div>
            <input type="text" placeholder="write here.." value={travelers} onChange={handleTravelersChange} />
          </div>
        </div>
        <div className="button-section">
          <button className='main-button' onClick={handleGenerateItinerary}>Itinerary</button>
          <button className='main-button' onClick={handleGeneratePackingList}>Packing List</button>
        </div>
      </main>

      <footer className="footer">
        <p>Travel for pleasure with Travel.AI</p>
      </footer>
    </div>
  );
}

export default Home;
