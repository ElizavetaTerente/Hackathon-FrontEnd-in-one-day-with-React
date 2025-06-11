import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import TrainingList from './TrainingList';
import StatisticsPage from './StatisticsPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar bg-body-tertiary" style={{marginBottom : 30}}>
            <p style={{ fontSize: '1.5rem' ,cursor: 'pointer' }} className="col-md-2 mb-2 text-body-secondary"
               onClick={() => navigate('/')}>Hømёpage</p>
            <form className="d-flex" role="search" style={{
                fontSize: '1.5rem',
                marginRight: 100,
                visibility: location.pathname === '/' ? 'visible' : 'hidden'}}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </nav>
    );
}

function FooterBar() {
    return (
        <footer className="navbar bg-body-tertiary">
            <p className="col-md-2 mb-0 text-body-secondary">© 2024 Company, Inc</p>

            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }} className="text-body-secondary">&lt;3</p>

            <ul className="nav col-md-2 justify-content-center">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
            </ul>
        </footer>
    );
}

// Main App component
function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<TrainingList />} />
                    <Route path="/statistics/:trainingId" element={<StatisticsPage />} />
                </Routes>
                <FooterBar/>
            </div>
        </Router>
    );
}


export default App;
