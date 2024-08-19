import React, { useEffect, useState } from 'react';
import { getIncidentById, updateIncident } from './incidentService';
import { useParams } from 'react-router-dom';


const UpdateIncident = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState({
        name: '',
        time: new Date().toISOString().slice(0, 16),
        contactInfo: '',
        incidentNature: '',
        equipmentOrPersonsInvolved: '',
        locationInvolved: '',
        incidentDetection: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        fetchIncident();
    }, []);

    const validate = () => {
        let errors = {};
        if (!incident.name.trim()) errors.name = "Caller Name is required";
        if (incident.name.length > 50) errors.name = "Caller Name cannot exceed 50 characters";

        if (!incident.time) errors.time = "Time of Incident is required";

        if (!incident.contactInfo.trim()) errors.contactInfo = "Contact Info is required";
        if (incident.contactInfo.length > 50) errors.contactInfo = "Contact Info cannot exceed 50 characters";

        if (!incident.incidentNature.trim()) errors.incidentNature = "Nature of Incident is required";
        if (incident.incidentNature.length > 100) errors.incidentNature = "Nature of Incident cannot exceed 100 characters";

        if (!incident.equipmentOrPersonsInvolved.trim()) errors.equipmentOrPersonsInvolved = "Equipment or Persons Involved is required";
        if (incident.equipmentOrPersonsInvolved.length > 100) errors.equipmentOrPersonsInvolved = "Equipment or Persons Involved cannot exceed 100 characters";

        if (!incident.locationInvolved.trim()) errors.locationInvolved = "Location Involved is required";
        if (incident.locationInvolved.length > 100) errors.locationInvolved = "Location Involved cannot exceed 100 characters";

        if (!incident.incidentDetection.trim()) errors.incidentDetection = "Incident Detection is required";
        if (incident.incidentDetection.length > 100) errors.incidentDetection = "Incident Detection cannot exceed 100 characters";

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const fetchIncident = async () => {
        const response = await getIncidentById(id);
        setIncident(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncident({ ...incident, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
        await updateIncident(id, incident);
        setMessage('Incident updated successfully!');
            setMessageType('success');
        }catch (error) {
            setMessage('Failed to create incident. Please try again.');
            setMessageType('error');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-lg p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Create Incident</h2>

            {message && (
                <div
                    className={`mb-4 p-4 rounded-md text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Caller Name</label>
                    <input
                        type="text"
                        name="name"
                        value={incident.name}
                        onChange={handleChange}
                        maxLength="50"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Time of Incident</label>
                    <input
                        type="datetime-local"
                        name="time"
                        value={incident.time}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Contact Info</label>
                    <input
                        type="text"
                        name="contactInfo"
                        value={incident.contactInfo}
                        onChange={handleChange}
                        maxLength="50"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contactInfo ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contactInfo && <p className="mt-1 text-sm text-red-500">{errors.contactInfo}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Nature of Incident</label>
                    <input
                        type="text"
                        name="incidentNature"
                        value={incident.incidentNature}
                        onChange={handleChange}
                        maxLength="100"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.incidentNature ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.incidentNature && <p className="mt-1 text-sm text-red-500">{errors.incidentNature}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Equipment or Persons Involved</label>
                    <input
                        type="text"
                        name="equipmentOrPersonsInvolved"
                        value={incident.equipmentOrPersonsInvolved}
                        onChange={handleChange}
                        maxLength="100"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.equipmentOrPersonsInvolved ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.equipmentOrPersonsInvolved && <p className="mt-1 text-sm text-red-500">{errors.equipmentOrPersonsInvolved}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Location Involved</label>
                    <input
                        type="text"
                        name="locationInvolved"
                        value={incident.locationInvolved}
                        onChange={handleChange}
                        maxLength="100"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.locationInvolved ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.locationInvolved && <p className="mt-1 text-sm text-red-500">{errors.locationInvolved}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700">Incident Detection</label>
                    <input
                        type="text"
                        name="incidentDetection"
                        value={incident.incidentDetection}
                        onChange={handleChange}
                        maxLength="100"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.incidentDetection ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.incidentDetection && <p className="mt-1 text-sm text-red-500">{errors.incidentDetection}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateIncident;
