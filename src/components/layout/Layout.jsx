"use client"

import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  Divider,
} from "@mui/material"
import { Menu as MenuIcon, Home, School, Forum, BarChart, Person, Logout, Settings } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useAuth } from "../../contexts/AuthContext"
import Footer from "./Footer"

const Layout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleProfileMenuClose()
    navigate("/login")
  }

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Courses", icon: <School />, path: "/courses" },
    { text: "Forum", icon: <Forum />, path: "/forum" },
    { text: "Progress", icon: <BarChart />, path: "/progress" },
    { text: "Profile", icon: <Person />, path: "/profile" },
  ]

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          LearnSocial
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? "primary.contrastText" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            LearnSocial
          </Typography>
          {currentUser ? (
            <>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile")
                    handleProfileMenuClose()
                  }}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/settings")
                    handleProfileMenuClose()
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate("/register")} sx={{ ml: 1 }}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Responsive drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? drawerOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
              mt: { xs: 0, sm: "64px" },
              height: { xs: "100%", sm: "calc(100% - 64px)" },
              position: { xs: "fixed", sm: "static" },
            },
            display: { xs: drawerOpen ? "block" : "none", sm: "block" },
            "& .MuiBackdrop-root": {
              display: { sm: "none" },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 250px)` },
            minHeight: "calc(100vh - 64px - 100px)", // Adjust for AppBar and Footer
          }}
        >
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default Layout

