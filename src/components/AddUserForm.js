import React, { useState, useEffect } from 'react';
import { connectionsData } from '../data'; 
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css'; 
import './AddUserForm.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddUserForm = () => {
    const [userData, setUserData] = useState({
        Applicant_Name: '',
        Gender: '',
        District: '',
        State: '',
        Pincode: '',
        Ownership: '',
        GovtID_Type: 'AADHAR',
        ID_Number: '',
        Category: 'Commercial',
        Load_Applied: '',
        Date_of_Application: '',
        Status: 'Pending',
    });

    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        const storedConnections = localStorage.getItem('connections');
        if (!storedConnections) {
            localStorage.setItem('connections', JSON.stringify(connectionsData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleOpenPopup = () => {
        const errors = [];
        if (!userData.Applicant_Name) errors.push("Applicant Name is required.");
        if (!userData.Date_of_Application) errors.push("Date of Application is required.");
        if (userData.Load_Applied > 200) errors.push("Load Applied cannot exceed 200 kV.");

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error)); 
            return;
        }

        setOpenPopup(true);
        document.body.classList.add('popup-open'); 
    };

    const handleSubmit = () => {
        const existingConnections = JSON.parse(localStorage.getItem('connections')) || [];
        const newID = existingConnections.length ? existingConnections[existingConnections.length - 1].ID + 1 : 1;

        const newUserWithID = { ...userData, ID: newID };
        const updatedConnections = [...existingConnections, newUserWithID];

        localStorage.setItem('connections', JSON.stringify(updatedConnections));

        setUserData({
            Applicant_Name: '',
            Gender: '',
            District: '',
            State: '',
            Pincode: '',
            Ownership: '',
            GovtID_Type: 'AADHAR',
            ID_Number: '',
            Category: 'Commercial',
            Load_Applied: '',
            Date_of_Application: '',
            Status: 'Pending',
        });

        toast.success("User added successfully!"); 
        setOpenPopup(false);
        document.body.classList.remove('popup-open');
    };

    return (
        <div>
            <ToastContainer /> 
            <form className="add-user-form">
                <h2>Add User</h2>

                <div className="form-container">
                    {/* First Column */}
                    <div className="form-column"> 
                        <div className="form-group">
                            <label htmlFor="Applicant_Name">Applicant Name</label>
                            <input
                                type="text"
                                name="Applicant_Name"
                                id="Applicant_Name"
                                value={userData.Applicant_Name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Gender">Gender</label>
                            <input
                                type="text"
                                name="Gender"
                                id="Gender"
                                value={userData.Gender}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="District">District</label>
                            <input
                                type="text"
                                name="District"
                                id="District"
                                value={userData.District}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="State">State</label>
                            <input
                                type="text"
                                name="State"
                                id="State"
                                value={userData.State}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Pincode">Pincode</label>
                            <input
                                type="number"
                                name="Pincode"
                                id="Pincode"
                                value={userData.Pincode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="form-column"> 
                        <div className="form-group">
                            <label htmlFor="Ownership">Ownership</label>
                            <input
                                type="text"
                                name="Ownership"
                                id="Ownership"
                                value={userData.Ownership}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="GovtID_Type">Government ID Type</label>
                            <select
                                name="GovtID_Type"
                                id="GovtID_Type"
                                value={userData.GovtID_Type}
                                onChange={handleChange}
                            >
                                <option value="AADHAR">AADHAR</option>
                                <option value="PAN">PAN</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ID_Number">ID Number</label>
                            <input
                                type="number"
                                name="ID_Number"
                                id="ID_Number"
                                value={userData.ID_Number}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Category">Category</label>
                            <select
                                name="Category"
                                id="Category"
                                value={userData.Category}
                                onChange={handleChange}
                            >
                                <option value="Commercial">Commercial</option>
                                <option value="Residential">Residential</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Load_Applied">Load Applied (max 200 kV)</label>
                            <input
                                type="number"
                                name="Load_Applied"
                                id="Load_Applied"
                                value={userData.Load_Applied}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Date_of_Application">Date of Application</label>
                            <input
                                type="date"
                                name="Date_of_Application"
                                id="Date_of_Application"
                                value={userData.Date_of_Application}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div> 
                </div> 

                <button type="button" onClick={handleOpenPopup} className="submit-button"> 
                    Add User
                </button>
            </form>

            <Popup 
                open={openPopup} 
                onClose={() => { setOpenPopup(false); document.body.classList.remove('popup-open'); }}
                modal 
                nested 
            >
                {(close) => ( 
                    <div className="modal">
                        <h2>Confirm Submission</h2>
                        <p>Are you sure you want to add this user?</p>
                        <button onClick={handleSubmit}>Yes</button>
                        <button onClick={() => { close(); document.body.classList.remove('popup-open'); }}>No</button>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default AddUserForm;