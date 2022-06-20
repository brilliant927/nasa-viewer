import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CollectionDetails from './pages/CollectionDetails';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<CollectionDetails />} />
      </Routes>
    </Router>

  );
}

export default App;
