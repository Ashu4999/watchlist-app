// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            dark: '#e16059', // Darker red
            main: '#f33f40',
            light: '#f6cac7'
        },
        white: "#fff"
    },
});

export default theme;
