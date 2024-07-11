import './App.css';
import { Link } from 'react-router-dom';

function InfoContact() {
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
            <Link to="/" className="home-button">Home</Link>
          </div>
        </div>
      </header>

      <main className="info-contact-main">
        <div className="info">
          <h1>Travel.AI - AI Travel Planner</h1>
          <p>Introducing Travel.AI, your ultimate AI-powered travel planner! Our platform simplifies travel planning by creating personalized itineraries and comprehensive packing lists tailored to your unique needs.</p>

          <h2>Itinerary Planning</h2>
          <p>Travel.AI curates daily activities, attractions, and dining options based on your destination, travel dates, and interests. Enjoy a seamless travel experience with optimized schedules and personalized recommendations.</p>

          <h2>Packing List</h2>
          <p>Generate customized packing lists based on your destination, trip duration, and activities. Ensure you have all essentials, from clothing and toiletries to travel documents and tech gadgets, tailored to your specific needs.</p>

          <h2>Why Choose Travel.AI?</h2>
          <ul>
            <li><strong>Personalized Recommendations</strong>: Tailored suggestions based on your travel profile.</li>
            <li><strong>Comprehensive Planning</strong>: Covers flights, accommodations, activities, and dining.</li>
            <li><strong>Efficiency and Convenience</strong>: Automated tools save you time and effort.</li>
            <li><strong>User-Friendly Interface</strong>: Easily navigate and customize your plans.</li>
          </ul>

          <p>Experience effortless travel planning with Travel.AI and embark on unforgettable journeys with confidence and ease.</p>

        </div>
        <div className="contact">
          <h3>Send email</h3>
          <div className='email-text'>
            <input type="text" placeholder="write here.." />
          </div>
          <div className='send-button-div'>
            <button className="send-button">Send</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Travel for pleasure with Travel.AI</p>
      </footer>
    </div>
  );
}

export default InfoContact;
