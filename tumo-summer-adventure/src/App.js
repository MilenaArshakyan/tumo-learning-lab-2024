import './App.css';
import Home from './home';
import Itinerary from './itinerary';
import PackingList from './packing-list';
import InfoContact from './info-contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/packing-list" element={<PackingList />} />
        <Route path="/info-contact" element={<InfoContact />} />
      </Routes>
    </Router>
  );
}

export default App;


