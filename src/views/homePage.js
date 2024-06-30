import { Box, Typography, Autocomplete, TextField, Stack, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {
    BookmarkAdd as BookmarkAddIcon,
    Search as SearchIcon
} from '@mui/icons-material';

const options = ['Option 1', 'Option 2', 'Option 3'];

const WelcomeNote = () => {
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: "left", border: `1px solid ${theme.palette.primary.dark}`, padding: 2, borderRadius: 2 }}>
            <Typography variant="h4" mb={1}>
                {`Welcome to `}
                <Typography component="span" variant="h4" sx={{ color: theme.palette.primary.main }}>Watchlists</Typography>
            </Typography>
            <Typography>
                Browse movies, add them to watchlists and share them with friends.
                Just click the <BookmarkAddIcon /> to add a movie, the poster to see more details or click to mark the movie as watched.
            </Typography>
        </Box>
    );
};

const ListSearch = () => {
    return (
        <Stack sx={{ flexDirection: "row", gap: 1 }}>
            <Autocomplete
                id="search-autocomplete"
                sx={{ width: "90%" }}
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            ),
                        }}
                    />
                )}
            />
            <Button variant="contained" sx={{ width: "10%" }}>
                Search
            </Button>
        </Stack>
    );
};

const HomePage = () => {
    return (
        <Stack sx={{ gap: 5 }}>
            <WelcomeNote />
            <ListSearch />
            <h1>Home</h1>
        </Stack>
    );
};

export default HomePage;
