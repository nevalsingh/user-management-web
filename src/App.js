import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/layout/NavBar';
import HomePage from './views/HomePage/HomePage';
import SearchPage from './views/SearchPage/SearchPage';
import CaptureForm from './views/CaptureForm/CaptureForm';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Container component="main" sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/capture" element={<CaptureForm />} />
        </Routes>
        <ToastContainer />
      </Container>
    </Router>
  );
}

export default App;
