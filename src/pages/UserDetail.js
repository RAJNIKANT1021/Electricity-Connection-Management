import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connectionsData as defaultConnectionsData } from '../data'; // Use a default source for data
import './UserDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Load the data from localStorage or fallback to default connectionsData
    const [connections, setConnections] = useState(() => {
        const savedConnections = localStorage.getItem('connections');
        return savedConnections ? JSON.parse(savedConnections) : defaultConnectionsData;
    });

    // Find the user details based on ID from localStorage or default data
    const userFromData = connections.find(conn => conn.ID.toString() === id);

    // Initialize state for form data and editing state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userFromData);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // Track if confirmation is needed

    // Save data to local storage when formData or isEditing changes
    useEffect(() => {
        if (isEditing) {
            localStorage.setItem(`user_${id}`, JSON.stringify(formData));
        }
    }, [formData, isEditing, id]);

    // Handle input changes with validation
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "Load_Applied" && parseInt(value) > 200) {
            alert('Load Applied cannot exceed 200 kV.');
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Enable edit mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Save data and exit edit mode
    const handleSave = () => {
        setShowConfirmationPopup(true); // Show confirmation before saving
    };

    // Confirm save and update data in localStorage
    const confirmSave = () => {
        setIsEditing(false);

        // Update the specific connection in the connections array
        const updatedConnections = connections.map(conn =>
            conn.ID.toString() === id ? formData : conn
        );

        // Save the updated connections array to localStorage
        setConnections(updatedConnections);
        localStorage.setItem('connections', JSON.stringify(updatedConnections));

        // Clear individual user data from localStorage after saving
        localStorage.removeItem(`user_${id}`);
        setShowConfirmationPopup(false);
    };

    // Ask confirmation before navigating back if unsaved changes exist
    const handleBack = () => {
        if (isEditing) {
            setShowConfirmationPopup(true); // Show popup if unsaved changes exist
        } else {
            navigate(-1);
        }
    };

    if (!formData) {
        return <div>User not found</div>; // Handle case when user is not found
    }

    return (
        <div className="user-detail">
            {showConfirmationPopup && (
                <div className="popup-active">
                    <div className="popup-content">
                        <h3>Save Changes</h3>
                        <p>Are you sure you want to save the changes?</p>
                        <div className="popup-buttons1">
                            <button className="popup-button1" onClick={() => setShowConfirmationPopup(false)}>Cancel</button>
                            <button className="popup-button1" onClick={confirmSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='btngrp'>
                <button className="back-button" onClick={handleBack}>Back</button>
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                ) : (
                    <button className="save-button" onClick={handleSave}>Save</button>
                )}
            </div>

            <h2>User Details</h2>

            <div className="form-container">
                <div className="form-column">
                    <div className="form-group">
                        <label>ID:</label>
                        <input type="text" value={formData.ID} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Applicant Name:</label>
                        <input
                            type="text"
                            name="Applicant_Name"
                            value={formData.Applicant_Name}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <input
                            type="text"
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>District:</label>
                        <input
                            type="text"
                            name="District"
                            value={formData.District}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input
                            type="text"
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                </div>

                <div className="form-column">
                    <div className="form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="State"
                            value={formData.State}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pincode:</label>
                        <input
                            type="text"
                            name="Pincode"
                            value={formData.Pincode}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Load Applied:</label>
                        <input
                            type="text"
                            name="Load_Applied"
                            value={formData.Load_Applied}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Application:</label>
                        <input
                            type="text"
                            name="Date_of_Application"
                            value={formData.Date_of_Application}
                            readOnly // Prevent changing Date of Application
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
