import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './UserTable.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = ({ connections, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [connectionToDelete, setConnectionToDelete] = useState(null);

    const getRowClassName = (status) => {
        switch (status) {
            case 'Approved':
                return 'row-approved';
            case 'Pending':
                return 'row-pending';
            case 'Rejected':
                return 'row-rejected';
            default:
                return '';
        }
    };

    const handleDeleteClick = (connection) => {
        if (connection.Status === 'Rejected') {
            setShowPopup(true);
            setConnectionToDelete(connection);
        } else {
            toast.error("Cannot delete connections with status other than 'Rejected'");
        }
    };

    const handleConfirmDelete = () => {
        onDelete(connectionToDelete.ID);
        setShowPopup(false);
        setConnectionToDelete(null);
    };

    return (
        <div className="table-container">
            <ToastContainer />
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {connections.map(conn => (
                        <tr key={conn.ID} className={getRowClassName(conn.Status)}>
                            <td>{conn.ID}</td>
                            <td>{conn.Applicant_Name}</td>
                            <td>{conn.Category}</td>
                            <td>{conn.Status}</td>
                            <td className="action-buttons">
                                <Link to={`/user-detail/${conn.ID}`} className="view-button">View More</Link>
                                <button onClick={() => handleDeleteClick(conn)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Popup open={showPopup} modal onClose={() => { setShowPopup(false); setConnectionToDelete(null); }}>
                {close => (
                    <div className="modal">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this connection? This action cannot be undone.</p>
                        <div className="popup-buttons">
                            <button className="confirm-delete-button" onClick={handleConfirmDelete}>Yes, Delete</button>
                            <button className="cancel-delete-button" onClick={close}>Cancel</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default UserTable;