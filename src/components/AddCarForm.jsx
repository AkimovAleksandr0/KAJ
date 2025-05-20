// Import React and the useState hook for managing component state
import React, { useState } from 'react';
// Import useNavigate from react-router-dom for navigation after form submission
import { useNavigate } from 'react-router-dom';
// Import availableImages
import { AvailableImages } from "./AvailableImages.jsx";

// Component to add a new car to the inventory
const AddCarForm = () => {
    // State variables to hold the form input values
    const [carName, setCarName] = useState('');          // Car name
    const [carYear, setCarYear] = useState('');          // Manufacturing year
    const [carPrice, setCarPrice] = useState('');        // Price
    const [transmission, setTransmission] = useState('???'); // Transmission type
    const [doors, setDoors] = useState('');              // Number of doors
    const [engine, setEngine] = useState('');            // Engine specification
    const [fuelConsumption, setFuelConsumption] = useState(''); // Fuel consumption in L/100km
    const [color, setColor] = useState('');              // Color
    const [kilometers, setKilometers] = useState('');    // Mileage in kilometers
    // const [imageFile, setImageFile] = useState(null);    // Selected image file
    const [selectedImage, setSelectedImage] = useState("default.jpg");
    const navigate = useNavigate();                      // Hook for navigation

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Check if car name is provided (required field)
        if (!carName.trim()) {
            alert('Car name cannot be empty!.');
            return;
        }

        // Parse numerical inputs, set to "???" if not provided
        const parsedDoors = doors ? parseInt(doors, 10) : "???";
        const parsedFuelConsumption = fuelConsumption ? parseFloat(fuelConsumption) : "???";
        const parsedCarYear = carYear ? parseInt(carYear, 10) : "???";
        const parsedCarPrice = carPrice ? parseFloat(carPrice) : "???";
        const parsedKilometers = kilometers ? parseInt(kilometers, 10) : "???";

        // Get image name, default to "default.jpg" if no file is selected
        // Note: This assumes the image exists in 'images/' directory; in a real app, file upload would be implemented
        const imageName = selectedImage || "default.jpg";

        // Create a new car object with the provided details
        const newCar = {
            id: Date.now(),             // Generate a unique ID using current timestamp
            name: carName,
            year: parsedCarYear,
            price: parsedCarPrice,
            image: `images/${imageName}`, // Path assumes image is in 'images/' directory
            transmission: transmission,
            doors: parsedDoors,
            engine: engine || "???",    // Set to "???" if not provided
            fuelConsumption: parsedFuelConsumption,
            color: color || "???",      // Set to "???" if not provided
            kilometers: parsedKilometers,
        };

        // Retrieve existing cars from local storage, or initialize an empty array
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.push(newCar); // Add the new car to the array
        localStorage.setItem('cars', JSON.stringify(cars)); // Save back to local storage

        navigate('/'); // Navigate back to the home page
    };

    // Render the form
    return (
        <section>
            <form id="add-car-form" onSubmit={handleSubmit}>
                {/* Car Name input (required) */}
                <label htmlFor="car-name">Car Name:</label>
                <input
                    type="text"
                    id="car-name"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    required // Enforces field completion in supporting browsers
                />

                {/* Year input */}
                <label htmlFor="car-year">Year:</label>
                <input
                    type="number"
                    id="car-year"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                />

                {/* Price input */}
                <label htmlFor="car-price">Price:</label>
                <input
                    type="number"
                    id="car-price"
                    value={carPrice}
                    onChange={(e) => setCarPrice(e.target.value)}
                />

                {/* Transmission select dropdown */}
                <label htmlFor="transmission">Transmission:</label>
                <select
                    id="transmission"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                >
                    <option value="???">???</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>

                {/* Doors input */}
                <label htmlFor="doors">Doors:</label>
                <input
                    type="number"
                    id="doors"
                    value={doors}
                    onChange={(e) => setDoors(e.target.value)}
                />

                {/* Engine input */}
                <label htmlFor="engine">Engine:</label>
                <input
                    type="text"
                    id="engine"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                />

                {/* Fuel Consumption input */}
                <label htmlFor="fuel-consumption">Fuel Consumption (L/100km):</label>
                <input
                    type="number"
                    id="fuel-consumption"
                    value={fuelConsumption}
                    onChange={(e) => setFuelConsumption(e.target.value)}
                    step="0.1" // Allows decimal values
                />

                {/* Color input */}
                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                {/* Kilometers input */}
                <label htmlFor="kilometers">Kilometers:</label>
                <input
                    type="number"
                    id="kilometers"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                />

                {/* Image selection from predefined list */}
                <label htmlFor="car-image-select">Select Image:</label>
                <select

                    id="car-image-select"
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}>
                    {AvailableImages.map((img, index) => (
                        <option key={index} value={img}>{img}</option>
                    ))}
                </select>

                {/* Image preview */}
                <div className="image-preview">
                    {selectedImage && (
                        <img
                            src={`/images/${selectedImage}`}
                            alt="Selected"
                            className="preview-image"
                        />
                    )}
                </div>

                {/* Submit button */}
                <button type="submit">Add Car</button>
            </form>
        </section>
    );
};

export default AddCarForm;