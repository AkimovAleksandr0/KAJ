import React from 'react';

const CarItem = ({ car, onDelete, onTestDrive }) => {
    const handleDownloadJSON = () => {
        if (!car) {
            alert('Car data is not available.');
            return;
        }

        const carData = JSON.stringify(car, null, 2);

        const blob = new Blob([carData], { type: 'application/json' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;

        a.download = `${car.name ? car.name.replace(/\s+/g, '_') : 'car'}_data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="car-item">
            {/* Display car details */}
            <h3>{car.name}</h3>
            <img src={car.image} alt={car.name} className="car-image" />
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Doors:</strong> {car.doors}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Fuel Consumption:</strong> {car.fuelConsumption}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Kilometers:</strong> {car.kilometers} km</p>

            {}
            <button className="delete-button" onClick={() => onDelete(car.id)}>Delete</button>
            <button onClick={() => onTestDrive(car.id)}>Test Drive</button>
            <button className="download-button" onClick={handleDownloadJSON}>Download JSON</button>
        </div>
    );
};

export default CarItem;