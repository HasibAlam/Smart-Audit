import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CodeOffTwoToneIcon from '@mui/icons-material/CodeOffTwoTone';
import { Link } from 'react-router-dom';

// Define the main navigation links
const pages = ['Home', 'Request an Audit', 'Search History'];

// Define the user settings links (if needed)
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  // State to manage the navigation menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Handle opening the navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Handle closing the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to bottom, #F08080, #582794)',
        borderBottom: '2px solid #DB7093',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeOffTwoToneIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontSize: '32px',
              color: '#FF0000',
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#DB7093',
              textDecoration: 'none',
              fontSize: '24px',
            }}
          >
            Dead-Lock
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#ffffff',
                  '&:hover': {
                    color: '#ff5733',
                  },
                  fontFamily: 'Roboto Condensed, sans-serif',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '18px',
                }}
                component={Link}
                to={
                  page === 'Request an Audit'
                    ? '/audit'
                    : page === 'Search History'
                    ? '/history.js'
                    : '/'
                }
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>{/* ... (User menu and other contents) */}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
