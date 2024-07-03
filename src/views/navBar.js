import React, { useEffect, useState } from "react";
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
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  MoreHoriz as MoreHorizIcon,
  Home as HomeIcon,
  Checklist as ChecklistIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Movie as MovieIcon,
} from "@mui/icons-material";

import { ContextMenu } from "../components";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Outlet } from "react-router-dom";
import { removeItem } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeSentence } from "../lib/functions";

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

const initialNavbarOptions = [
  { label: "Home", icon: <HomeIcon />, path: "/dashboard/home" },
  {
    label: "My Lists",
    icon: <ChecklistIcon />,
    path: "/dashboard/mylist",
  },
];

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [collapseStates, setCollapseStates] = React.useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [navbarOptions, setNavbarOptions] = useState(initialNavbarOptions);
  const savedMovies = useSelector((state) => state.savedMovies);

  useEffect(() => {
    console.log("HERE 116", Object.keys(savedMovies).length, auth.email);
    if (Object.keys(savedMovies).length && auth.email) {
      let userMovieList = savedMovies[auth.email];
      if (userMovieList) {
        let dummyInitialNavbarOptions = [...initialNavbarOptions];
        let nestedItem = userMovieList.map((item) => {
          return {
            label: item.title,
            icon: <MovieIcon />,
            path: `/dashboard/mylist?title=${item.title}`,
          };
        });
        if (nestedItem.length) {
          dummyInitialNavbarOptions[1]["nestedItems"] = nestedItem;
        }
        setNavbarOptions((prevValue) => dummyInitialNavbarOptions);
      } else {
        let dummyInitialNavbarOptions = [...initialNavbarOptions];
        delete dummyInitialNavbarOptions[1]["nestedItems"];
        setNavbarOptions((prevValue) => dummyInitialNavbarOptions);
      }
    }
  }, [savedMovies, auth.email]);

  useEffect(() => {
    if (!open) {
      setCollapseStates({});
    }
  }, [open]);

  useEffect(() => {
    if (Object.keys(collapseStates).length && open === false) {
      setOpen(true);
    }
  }, [collapseStates]);

  const menuOptions = [
    {
      label: "Logout",
      action: () => {
        dispatch({
          type: "LOGOUT",
          payload: { isAuthenticated: false, email: null },
        });
        removeItem("auth");
      },
    },
  ];

  const toggleDrawer = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleCollapseClick = (index) => {
    setCollapseStates((prevState) => ({
      [index]: !prevState[index],
    }));
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "flex" } }}>
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
        <List sx={{ height: "80%", overflowY: "scroll" }}>
          {navbarOptions.map((navOption, index) =>
            navOption.nestedItems ? (
              <Box key={navOption.label}>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleCollapseClick(index)}
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
                    {collapseStates[index] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={collapseStates[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {navOption.nestedItems.map((nestedItem) => (
                      <ListItemButton
                        key={nestedItem.label}
                        sx={{ pl: 4 }}
                        onClick={() => navigate(nestedItem.path)}
                      >
                        {nestedItem.icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 3,
                              justifyContent: "center",
                            }}
                          >
                            {nestedItem.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={capitalizeSentence(nestedItem.label)}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItem
                key={navOption.label}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(navOption.path)}
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
                    sx={{ display: open ? "" : "none" }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
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
                <Stack sx={{ flexDirection: "row", gap: "10px", width: "85%" }}>
                  <AccountCircleIcon sx={{ color: "#0000008A" }} />
                  <Tooltip title={auth.email}>
                    <Typography noWrap>{auth.email}</Typography>
                  </Tooltip>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          [theme.breakpoints.down("sm")]: { marginLeft: "40px" },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
