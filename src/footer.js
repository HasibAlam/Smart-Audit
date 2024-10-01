import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CodeOffTwoTone } from '@mui/icons-material';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headingStyle = {
  color: '#FFFFFF',
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const memberNameStyle = {
  marginRight: '150px', // Add spacing between member names
  color: '#FFA500', // Change text color to orange
};

const largerIconStyle = {
  fontSize: '48px',
};

const gradientBackgroundStyle = {
  background: 'linear-gradient(to bottom,#810d69, #582794 )',
  padding: '20px',
};

const orangeTextStyle = {
  color: '#FFA500', // Change text color to orange
};

const dividerStyle = {
  borderTop: '1px solid #FFFFFF', // Change border color to white (#FFFFFF)
};

export default function DenseMenu() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Paper style={gradientBackgroundStyle} id="contact-us">
        <div style={containerStyle}>
          {/* Section 1: Heading */}
          <Typography variant="h5" style={headingStyle}>
            Contact  Hasib Alam
          </Typography> 

          {/* Section 2: Message */}
          <Typography variant="body1" style={headingStyle}>
            Thanks for visiting. I would love your feedback.
          </Typography>

          {/* Section 3: CodeOff Icon */}
          <MenuList dense style={columnStyle}>
            <MenuItem>
              <ListItemIcon>
                <CodeOffTwoTone style={largerIconStyle} />
              </ListItemIcon>
              <ListItemText style={orangeTextStyle}>
                Dead-Lock
              </ListItemText>
            </MenuItem>

            {/* Section 4: GitHub */}
            <MenuItem>
              <ListItemIcon>
                <GitHubIcon style={orangeTextStyle} />
              </ListItemIcon>
              <a href="https://github.com/HasibAlam" target="_blank" rel="noopener noreferrer">
                <ListItemText primary="GitHub" style={memberNameStyle} />
              </a>
            </MenuItem>

            {/* Section 5: Email */}
            <MenuItem>
              <ListItemIcon>
                <EmailIcon style={orangeTextStyle} />
              </ListItemIcon>
              <a href="mailto:hasibalamsadat2001@gmail.com">
                <ListItemText primary="Email" style={memberNameStyle} />
              </a>
            </MenuItem>

            {/* Section 6: LinkedIn */}
            <MenuItem>
              <ListItemIcon>
                <LinkedInIcon style={orangeTextStyle} />
              </ListItemIcon>
              <a href="https://www.linkedin.com/in/hasib-alam-b58987214" target="_blank" rel="noopener noreferrer">
                <ListItemText primary="LinkedIn" style={memberNameStyle} />
              </a>
            </MenuItem>
          </MenuList>

          {/* Add a horizontal line at the beginning of the footer */}
          <Divider style={dividerStyle} />
        </div>
      </Paper>
    </ThemeProvider>
  );
}
