import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCarForm = () => {
    const [carName, setCarName] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carPrice, setCarPrice] = useState('');
    const [transmission, setTransmission] = useState('???');
    const [doors, setDoors] = useState('');
    const [engine, setEngine] = useState('');
    const [fuelConsumption, setFuelConsumption] = useState('');
    const [color, setColor] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!carName.trim()) {
            alert('Название автомобиля обязательно для заполнения.');
            return;
        }

        const parsedDoors = doors ? parseInt(doors, 10) : "???";
        const parsedFuelConsumption = fuelConsumption ? parseFloat(fuelConsumption) : "???";
        const parsedCarYear = carYear ? parseInt(carYear, 10) : "???";
        const parsedCarPrice = carPrice ? parseFloat(carPrice) : "???";
        const parsedKilometers = kilometers ? parseInt(kilometers, 10) : "???";

        const imageName = imageFile ? imageFile.name : "default.jpg";

        const newCar = {
            id: Date.now(),
            name: carName,
            year: parsedCarYear,
            price: parsedCarPrice,
            image: `images/${imageName}`,
            transmission: transmission,
            doors: parsedDoors,
            engine: engine || "???",
            fuelConsumption: parsedFuelConsumption,
            color: color || "???",
            kilometers: parsedKilometers,
        };

        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.push(newCar);
        localStorage.setItem('cars', JSON.stringify(cars));

        navigate('/');
    };

    return (
        <section>
            <form id="add-car-form" onSubmit={handleSubmit}>
                <label htmlFor="car-name">Car Name:</label>
                <input
                    type="text"
                    id="car-name"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    required
                />

                <label htmlFor="car-year">Year:</label>
                <input
                    type="number"
                    id="car-year"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                />

                <label htmlFor="car-price">Price:</label>
                <input
                    type="number"
                    id="car-price"
                    value={carPrice}
                    onChange={(e) => setCarPrice(e.target.value)}
                />

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

                <label htmlFor="doors">Doors:</label>
                <input
                    type="number"
                    id="doors"
                    value={doors}
                    onChange={(e) => setDoors(e.target.value)}
                />

                <label htmlFor="engine">Engine:</label>
                <input
                    type="text"
                    id="engine"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                />

                <label htmlFor="fuel-consumption">Fuel Consumption (L/100km):</label>
                <input
                    type="number"
                    id="fuel-consumption"
                    value={fuelConsumption}
                    onChange={(e) => setFuelConsumption(e.target.value)}
                    step="0.1"
                />

                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                <label htmlFor="kilometers">Kilometers:</label>
                <input
                    type="number"
                    id="kilometers"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                />

                {}
                <label htmlFor="car-image" className="upload-button upload-file-button">
                    {imageFile ? imageFile.name : "Choose file in path ../images/.jpg"}
                </label>
                <input
                    type="file"
                    id="car-image"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    style={{ display: 'none' }}
                />

                <button type="submit">Add Car</button>
            </form>
        </section>
    );
};

export default AddCarForm;