import './index.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { getAllIncidents, deleteIncident } from './incidentService';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const response = await getAllIncidents();
            setIncidents(response.data);
        } catch (error) {
            console.error("Error fetching incidents:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIncident(id);
            fetchIncidents(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting incident:", error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);  // Navigate to the update page with the incident ID
    };

    return (
        <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Incident List</h2>
            <ul className="space-y-4">
                {incidents.length > 0 ? (
                    incidents.map(incident => (
                        <li 
                            key={incident.id} 
                            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
                            onClick={() => handleUpdate(incident.id)}  // Trigger navigation on click
                        >
                            <div>
                                <strong className="text-lg font-medium text-gray-900">{incident.name}</strong>
                                <p className="text-gray-700">{incident.incidentNature}</p>
                            </div>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation();  // Prevent click event from bubbling to the list item
                                    handleDelete(incident.id);
                                }} 
                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-600">No incidents available.</li>
                )}
            </ul>
        </div>
    );
};

export default IncidentList;
