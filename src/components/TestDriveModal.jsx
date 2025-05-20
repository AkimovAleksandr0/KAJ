// Modal component for scheduling a test drive, handling form submission and displaying results.
import React, { useEffect, useRef, useState } from 'react';

const TestDriveModal = ({ isOpen, onClose, carId }) => {
    // State variables for form inputs and modal status
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [TestDriveDate, setTestDriveDate] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [testDriveCar, setTestDriveCar] = useState(null);
    const modalRef = useRef(null);

    // Effect to close modal when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, modalRef, onClose]);

    // Handle form submission to schedule test drive
    const handleSubmit = (e) => {
        e.preventDefault();

        let foundCar;
        try {
            const carsData = localStorage.getItem('cars');
            if (!carsData) {
                throw new Error('No cars data found in localStorage');
            }
            const cars = JSON.parse(carsData);
            foundCar = cars.find(car => car.id === carId);
            setTestDriveCar(foundCar);
        } catch (error) {
            console.error('Error retrieving car data:', error);
            setMessage('Error: Unable to retrieve car data.');
            setIsSuccess(false);
            onClose();
            setIsResultOpen(true);
            return;
        }

        if (foundCar) {
            setMessage(`Thank you, ${name}! Your Test Drive request for the ${foundCar.name} on ${TestDriveDate} has been received. We will contact you at ${email}.`);
            setIsSuccess(true);
        } else {
            console.warn(`Car with ID ${carId} not found in localStorage.`);
            setMessage('Car not found.');
            setIsSuccess(false);
        }
        onClose();
        setIsResultOpen(true);
    };

    // Download test drive confirmation as a text file
    const handleDownloadConfirmation = () => {
        const carName = testDriveCar ? testDriveCar.name : 'Unknown Car';

        const confirmationText = `
Test Drive Confirmation
Name: ${name}
Email: ${email}
Date: ${TestDriveDate}
Car: ${carName}
        `.trim();

        const blob = new Blob([confirmationText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test_drive_confirmation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isOpen && !isResultOpen) return null;

    return (
        <div className="modal">
            {isOpen && (
                <div className="modal-content" ref={modalRef}>
                    <div className="modal-header">
                        <h2>Test Drive</h2>
                        <span className="close-modal" onClick={onClose}>×</span>
                    </div>
                    <form id="testdrive-form" onSubmit={handleSubmit}>
                        <label htmlFor="testdrive-name">Your Name:</label>
                        <input type="text" id="testdrive-name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label htmlFor="testdrive-email">Your Email:</label>
                        <input type="email" id="testdrive-email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="testdrive-date">Test Drive Date:</label>
                        <input type="date" id="testdrive-date" value={TestDriveDate} onChange={(e) => setTestDriveDate(e.target.value)} required />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}

            {isResultOpen && (
                <div className="modal-content" ref={modalRef}>
                    <div className="modal-header">
                        <h2>{isSuccess ? 'Success' : 'Error'}</h2>
                    </div>
                    <p>{message}</p>
                    {isSuccess && (
                        <button onClick={handleDownloadConfirmation} className="btn">Download Confirmation</button>
                    )}
                    <button onClick={() => setIsResultOpen(false)} className="btn">Close</button>
                </div>
            )}
        </div>
    );
};

export default TestDriveModal;