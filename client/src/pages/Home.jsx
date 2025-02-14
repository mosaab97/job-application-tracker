import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
        <Navbar />
        <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Gradient background
            padding: 3,
        }}
        >
        <Container maxWidth="md">
            <Paper
            elevation={3}
            sx={{
                padding: 4,
                textAlign: 'center',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
            }}
            >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Job Application Tracker
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ color: '#555', marginBottom: 4 }}>
                Stay organized and never miss a job opportunity. Track your applications, interviews, and offers all in one place.
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={handleLoginClick}
                sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
                fontSize: '1.1rem',
                padding: '10px 30px',
                }}
            >
                Get Started
            </Button>
            </Paper>
        </Container>
        </Box>
    </>
  );
};

export default Home;