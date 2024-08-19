import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentList from './IncidentList';
import CreateIncident from './CreateIncident';
import UpdateIncident from './UpdateIncident';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<IncidentList />} />
            <Route path="/create" element={<CreateIncident />} />
            <Route path="/update/:id" element={<UpdateIncident />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
