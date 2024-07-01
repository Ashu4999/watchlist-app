import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  MoreHoriz as MoreHorizIcon,
  Home as HomeIcon,
  Checklist as ChecklistIcon,
} from "@mui/icons-material";

import { ContextMenu } from "../components";
import { HomePage } from "../views";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-srart",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuOptions = [
  { label: "Logout", action: () => console.log("Logout clicked") },
];

const navbarOptions = [
  { label: "Home", icon: <HomeIcon />, path: "/home" },
  { label: "My Lists", icon: <ChecklistIcon />, path: "/mylists" },
];

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ height: "10%" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              width: "100%",
              opacity: open ? 1 : 0,
              color: theme.palette.primary.main,
              fontWeight: 800,
              fontSize: "1.75rem",
            }}
          >
            WatchLists
          </Typography>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ height: "80%" }}>
          {navbarOptions.map((navOption, index) => (
            <ListItem
              key={navOption.label}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {navOption.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {navOption.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={navOption.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <DrawerFooter>
          <Stack
            sx={{
              border: "1px solid #0000008A",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {!open ? (
              <AccountCircleIcon sx={{ width: "100%", color: "#0000008A" }} />
            ) : (
              <>
                <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                  <AccountCircleIcon sx={{ color: "#0000008A" }} />
                  <Typography>GUEST</Typography>
                </Stack>
                <ContextMenu
                  buttonLabel={
                    <IconButton sx={{ padding: 0 }}>
                      <MoreHorizIcon />
                    </IconButton>
                  }
                  menuOptions={menuOptions}
                />
              </>
            )}
          </Stack>
        </DrawerFooter>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HomePage />
      </Box>
    </Box>
  );
}
