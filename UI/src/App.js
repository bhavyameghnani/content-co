import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e60028',
    },
    secondary: {
      main: '#a3001f',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
