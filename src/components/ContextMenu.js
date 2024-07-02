import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';

function ContextMenu({ buttonLabel, menuOptions }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {buttonLabel}
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuOptions.map((option, index) => (
                    <MenuItem key={index} onClick={() => {
                        handleClose();
                        option.action();
                    }}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default ContextMenu;
