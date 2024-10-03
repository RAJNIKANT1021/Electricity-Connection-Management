import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewConnections from './pages/ViewConnections';
import UserDetail from './pages/UserDetail'; // Import the new UserDetail component
import AddUserForm from './components/AddUserForm';
import Home from './pages/Home'; 
import { connectionsData } from './data';
import Charts from './components/Charts';

const App = () => {

  
  const [connections, setConnections] = useState(() => {
    const storedData = localStorage.getItem('connectionsData');
    return storedData ? JSON.parse(storedData) : connectionsData;
});
  const addUser = (user) => {
    user.ID = connections.length + 1; // Assign new ID
    setConnections(prev => [...prev, user]);
  };
    return (
        <Router>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
                <Route path="/view-connections" element={<ViewConnections />} />
                <Route path="/add-user" element={<AddUserForm onAddUser={addUser} />} />
                <Route path="/user-detail/:id" element={<UserDetail />} /> {/* Route for user details */}
            </Routes>
        </Router>
    );
};

export default App;
