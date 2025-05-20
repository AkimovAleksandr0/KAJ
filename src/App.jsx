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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null);

    const openTestDriveModal = (carId) => {
        setCurrentCarId(carId);
        setIsModalOpen(true);
    };

    const closeTestDriveModal = () => {
        setIsModalOpen(false);
        setCurrentCarId(null);
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" exact element={<CarList onTestDrive={openTestDriveModal} />} />
                        <Route path="/add-car" element={<AddCarForm />} />
                        <Route path="/media" element={<MediaPage />} />
                    </Routes>
                </main>
                <Footer />
                <TestDriveModal isOpen={isModalOpen} onClose={closeTestDriveModal} carId={currentCarId} />
            </div>
        </Router>
    );
};

export default App;