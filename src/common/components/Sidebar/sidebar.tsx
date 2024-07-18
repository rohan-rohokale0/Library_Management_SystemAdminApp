import { useState, useEffect } from "react";
import {
  alpha,
  Card,
  CssBaseline,
  Grid,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
<<<<<<< HEAD
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupIcon from "@mui/icons-material/Group";
=======
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";

>>>>>>> c15612441099735efb99d0579d648bc62145fd0a
const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  // height: "91.8vh",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  // height: "91.8vh",
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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






export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  var [selectedRoutes, setRoute] = React.useState(0);
  var [currentUser, setCurrentUser] = useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleDrawerOpen = () => {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const currentUsers =  localStorage.getItem('Users');
    if (currentUsers != null) {
      const userInfoParsed = JSON.parse(currentUsers);
      debugger
    

      setCurrentUser(userInfoParsed);
      console.log(currentUser)
    }

    debugger

    if (location.pathname == "/home/dashboard") {
      setRoute(0);
    } else if (
      location.pathname == "/home/category-list" ||
      location.pathname == "/home/add-category"
    ) {
      setRoute(1);
<<<<<<< HEAD
    } else if (location.pathname == "/home/user-list") {
      setRoute(5);
=======
    } else if (
      location.pathname == "/home/category-list" ||
      location.pathname == "/home/add-category"
    ) {
      setRoute(2);
>>>>>>> c15612441099735efb99d0579d648bc62145fd0a
    }
    else if( location.pathname == "/home/product-list" ||  location.pathname == "/home/add-product" )
    {
      setRoute(3);
    }
  });

  const navigateToPage = (value: any) => {
    if (value == 0) {
      navigate("/home/dashboard");
    } else if (value == 1) {
      navigate("/home/category-list");
    } else if (value == 3) {
      navigate("/home/product-list");
    }
    else if (value == 5) {
      navigate("/home/user-list");
    }
  };

<<<<<<< HEAD
  const data = [
    { text: "Dashbaord", icon: <DashboardIcon /> },
    { text: "Category", icon: <CategoryIcon /> },
    { text: "Book", icon: <Inventory2Icon /> },
    { text: "Order", icon: <ShoppingCartCheckoutIcon /> },
    // { text: "View Bill", icon: <ReceiptIcon /> },
    { text: "Users", icon: <GroupIcon /> },
  ];
=======
  const getPlatformIcon = (iconName: any): any => {
    switch (iconName) {
      case "DashboardIcon":
        return <DashboardIcon />;
      case "StorefrontIcon":
        return <StorefrontIcon />;
      case "CategoryIcon":
        return <CategoryIcon />;
      case "ProductionQuantityLimitsTwoToneIcon":
        return (
          <ProductionQuantityLimitsTwoToneIcon></ProductionQuantityLimitsTwoToneIcon>
        );
      default:
        return <DashboardIcon />; // or return null if you don't have it
    }
  };
>>>>>>> c15612441099735efb99d0579d648bc62145fd0a

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Library Mangement System
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <p>{currentUser?.firstName} {currentUser?.lastName}</p>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Drawer variant="permanent" sx={{ height: "20vh" }} open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
<<<<<<< HEAD
        <Grid container spacing={40}>
          <Grid item xs={40}>
            <List>
              {data.map((item, index) => (
                <ListItem
                  className={selectedRoutes == index ? "active" : ""}
                  key={item.text}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    setRoute(index);
                    navigateToPage(index);
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
=======
        <Divider />
        <List>
          {[
            { name: "Dashboard", iconName: "DashboardIcon" },
            { name: "Merchant", iconName: "StorefrontIcon" },
            { name: "Category", iconName: "CategoryIcon" },
            {
              name: "Product",
              iconName: "ProductionQuantityLimitsTwoToneIcon",
            },
          ].map((text, index) => (
            <ListItem
              className={selectedRoutes == index ? "active" : ""}
              key={text.name}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                setRoute(index);
                navigateToPage(index);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {getPlatformIcon(text.iconName)}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
>>>>>>> c15612441099735efb99d0579d648bc62145fd0a
      </Drawer>
      {/* <div style={{ width: "100%", paddingLeft: "30px", paddingTop: "25px", paddingBottom: "25px" }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </div> */}

      <Box component="main" sx={{ flexGrow: 8, p: 3 }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
