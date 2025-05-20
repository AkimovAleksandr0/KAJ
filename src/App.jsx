// Main App component that sets up routing and manages the test drive modal state
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CarList from './components/CarList';
import AddCarForm from './components/AddCarForm.jsx';
import TestDriveModal from './components/TestDriveModal.jsx';
import './App.css';
import MediaPage from "./components/MediaPage.jsx";

const App = () => {
    // State for managing the test drive modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null);

    // Function to open the test drive modal with the selected car ID
    const openTestDriveModal = (carId) => {
        setCurrentCarId(carId);
        setIsModalOpen(true);
    };

    // Function to close the test drive modal and reset the car ID
    const closeTestDriveModal = () => {
        setIsModalOpen(false);
        setCurrentCarId(null);
    };

    return (
        // Router component to handle client-side routing
        <Router>
            <div className="App">
                <Header />
                <main>
                    {/* Routes for different pages */}
                    <Routes>
                        <Route path="/" exact element={<CarList onTestDrive={openTestDriveModal} />} />
                        <Route path="/add-car" element={<AddCarForm />} />
                        <Route path="/media" element={<MediaPage />} />
                    </Routes>
                </main>
                <Footer />
                {/* Test drive modal component */}
                <TestDriveModal isOpen={isModalOpen} onClose={closeTestDriveModal} carId={currentCarId} />
            </div>
        </Router>
    );
};

export default App;