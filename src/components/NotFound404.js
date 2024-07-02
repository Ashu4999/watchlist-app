import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles";

const NotFound404 = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Stack spacing={1} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.white, padding: "1.5rem", borderRadius: 1 }}>
                <Typography>Oops!</Typography>
                <Typography>Page Not Found</Typography>
                <Link className="link" to="/login">Go to login</Link>
            </Stack>
        </Box>
    )
}

export default NotFound404;