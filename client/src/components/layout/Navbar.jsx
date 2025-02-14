import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Tracker
        </Typography>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;