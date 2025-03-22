import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
            <Toolbar>
                {/* לוגו */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        MyApp
                    </Link>
                </Typography>

                {/* קישורים */}
                <Box>
                    <Button color="inherit" component={Link} to="login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="register">
                        Register
                    </Button>
                    <Button color="inherit" component={Link} to="upload">
                        uploud1
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;