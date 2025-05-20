import React, { useState, useEffect } from 'react';
import CarItem from './CarItem';

const CarList = ({ onTestDrive }) => {
    const [cars, setCars] = useState([]);
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false); // Track drag state

    useEffect(() => {
        const _cars = JSON.parse(localStorage.getItem('cars')) || [];
        setCars(_cars);
    }, []);

    const saveCards = (newCars) => {
        setCars(newCars);
        localStorage.setItem('cars', JSON.stringify(newCars));
    };

    const handleDelete = (id) => {
        const updatedCars = cars.filter(car => car.id !== id);
        saveCards(updatedCars);
    };

    // Handle file upload (for both drag-and-drop and file input)
    const handleFileUpload = (file) => {
        if (file) {
            setFileName(file.name);

            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);

                    if (Array.isArray(parsedData)) {
                        saveCards(parsedData); // Update the cars state
                    } else {
                        alert("Invalid JSON format. Expected an array of cars.");
                    }
                } catch (error) {
                    console.log(error)
                    alert("Error parsing JSON file. Please ensure the file is valid.");
                }
            };

            fileReader.onerror = () => {
                alert("Error reading file. Please try again.");
            };
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleSaveToJSON = () => {
        const jsonString = JSON.stringify(cars, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cars.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <section>
            <h2>Car List</h2>
            <div id="upload-section">
                <label htmlFor="file-input" className="upload-button">
                    Choose JSON
                </label>
                <input
                    type="file"
                    id="file-input"
                    accept=".json"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
                <button className="upload-button" onClick={handleSaveToJSON}>
                    Save JSON
                </button>
            </div>
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {isDragging ? "Drop the file here..." : <p>{cars.length === 0 ? (
                        <p>No cars available. Upload a JSON file to get started.</p>
                    ) : (fileName) || "No file chosen"}</p>}
            </div>
            <div className="car-list">
                {
                    cars.map(car => (
                        <CarItem key={car.id} car={car} onDelete={handleDelete} onTestDrive={onTestDrive} />
                    )
                )}
            </div>
        </section>
    );
};

export default CarList;