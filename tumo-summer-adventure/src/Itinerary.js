import React from 'react';
import './App.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Itinerary = () => {
  const location = useLocation();
  const { itinerary, travelers, location: destination, duration } = location.state || { itinerary: 'No itinerary provided' };
  const navigate = useNavigate();

  const fetchLlmResponse = async (content) => {
    const TOKEN = "Token"; // Replace with your actual OpenAI API token

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

  const handleGeneratePackingList = async () => {
    const content = `Provide a packing list for a holiday itinerary for ${travelers} going to ${destination} for the duration of ${duration}`;
    const response = await fetchLlmResponse(content);
    navigate('/packing-list', { state: { packingList: response, travelers, location: destination, duration } });
  };

  // const handleGenerateItinerary = async () => {
  //   const content = `Design a holiday itinerary for ${travelers} going to ${destination} for the duration of ${duration}`;
  //   const response = await fetchLlmResponse(content);
  //   navigate('/itinerary', { state: { itinerary: response, travelers, location: destination, duration } });
  // };

  const days = itinerary.split('Day');

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

      <main className="p-i-main">
        <div className='title-it-pl'>
          <h3>Your Itinerary</h3>
        </div>
        {/* <div className="generate-text">
          <p>{itinerary}</p>
        </div> */}

          {days.map((day, index) => (
            day.trim() && (
              <div key={index} className="day-container">
                {/* <h4>Day {index}</h4> */}
                <p>{day.trim()}</p>
              </div>
            )
          ))}


        <div className="button-section">
          <Link to="/" className="main-button">Generate again</Link>
          <button className="main-button" onClick={handleGeneratePackingList}>Packing List</button>
        </div>
      </main>

      <footer className="footer">
        <p>Travel for pleasure with Travel.AI</p>
      </footer>
    </div>
  );
};

export default Itinerary;

