import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import { connectionsData } from '../data'; // Initial data if local storage is empty
import './view.css';

const ViewConnections = () => {
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [applicantID, setApplicantID] = useState("");

    useEffect(() => {
        // Load connections from local storage or initialize it
        const storedConnections = JSON.parse(localStorage.getItem('connections'));
        if (storedConnections) {
            setConnections(storedConnections);
        } else {
            // If there's no stored data, initialize with the default data
            localStorage.setItem('connections', JSON.stringify(connectionsData));
            setConnections(connections);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredConnections(connections); // Update filtered connections on initial load
    }, [connections]);

    const handleDelete = (id) => {
        const updatedConnections = connections.filter(conn => conn.ID !== id);
        setConnections(updatedConnections);
        updateLocalStorage(updatedConnections); // Update local storage after deletion
    };

    const updateLocalStorage = (updatedConnections) => {
        localStorage.setItem('connections', JSON.stringify(updatedConnections));
    };

    // Function to parse date in DD-MM-YYYY format
    const parseDate = (dateString) => {
        const parts = dateString.split("-");
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD format
    };

    // Function to filter connections by date range and applicant ID
    const filterConnections = () => {
        let filtered = connections;

        // Filter by Applicant ID
        if (applicantID) {
            filtered = filtered.filter(conn => conn.ID.toString() === applicantID);
        }

        // Filter by Date Range
        if (startDate || endDate) {
            filtered = filtered.filter(conn => {
                const dateOfApplication = parseDate(conn.Date_of_Application); // Convert to Date object
                const start = startDate ? parseDate(startDate) : null; // Convert to Date if startDate is not empty
                const end = endDate ? parseDate(endDate) : null; // Convert to Date if endDate is not empty

                // Ensure proper comparison, accounting for null values
                const afterStart = start ? dateOfApplication >= start : true;
                const beforeEnd = end ? dateOfApplication <= end : true;

                return afterStart && beforeEnd;
            });
        }

        return filtered;
    };

    const handleFilter = () => {
        const filtered = filterConnections();
        setFilteredConnections(filtered);
    };

    return (
        <div className="container">
            <h2>View Connections</h2>

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by Applicant Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Applicant ID"
                    value={applicantID}
                    onChange={(e) => setApplicantID(e.target.value)}
                />

                <label>Start Date: </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label>End Date: </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <button onClick={handleFilter}>
                    Apply Filters
                </button>
            </div>

            <UserTable connections={filteredConnections.filter(conn =>
                conn.Applicant_Name && conn.Applicant_Name.toLowerCase().includes(searchTerm.toLowerCase())
            )} onDelete={handleDelete} />
        </div>
    );
};

export default ViewConnections;
