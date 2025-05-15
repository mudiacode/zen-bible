import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import BibleViewer from './components/BibleViewer';
import Favourites from './components/Favourites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/bible" element={<BibleViewer />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
