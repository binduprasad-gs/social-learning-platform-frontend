"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Chip,
  Fade,
  ClickAwayListener,
  useTheme,
  alpha,
} from "@mui/material"
import { Search, Close, School, Forum, Person } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const SearchBar = ({
  placeholder = "Search for courses, topics, or users...",
  width = 300,
  fullWidth = false,
  variant = "outlined",
  size = "medium",
  ...props
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  // Mock search results
  const mockResults = {
    courses: [
      { id: "1", title: "Introduction to React", type: "course" },
      { id: "3", title: "UI/UX Design Principles", type: "course" },
    ],
    discussions: [
      { id: "1", title: "How to stay motivated during online learning?", type: "discussion" },
      { id: "2", title: "Stuck on React Hooks lesson", type: "discussion" },
    ],
    users: [
      { id: "1", name: "John Doe", type: "user" },
      { id: "2", name: "Sarah Johnson", type: "user" },
    ],
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowResults(value.length > 0)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowResults(false)
  }

  const handleItemClick = (item) => {
    setShowResults(false)

    if (item.type === "course") {
      navigate(`/courses/${item.id}`)
    } else if (item.type === "discussion") {
      navigate(`/forum/${item.id}`)
    } else if (item.type === "user") {
      navigate(`/profile/${item.id}`)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <School />
      case "discussion":
        return <Forum />
      case "user":
        return <Person />
      default:
        return <Search />
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setShowResults(false)}>
      <Box sx={{ position: "relative", width: fullWidth ? "100%" : width, ...props.sx }}>
        <TextField
          fullWidth
          variant={variant}
          size={size}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm && setShowResults(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={clearSearch} edge="end" size="small">
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: theme.shape.borderRadius,
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              },
              "&.Mui-focused": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            },
          }}
        />

        {/* Search Results Dropdown */}
        <Fade in={showResults}>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              mt: 0.5,
              maxHeight: 400,
              overflowY: "auto",
              zIndex: 1000,
              display: showResults ? "block" : "none",
              borderRadius: theme.shape.borderRadius,
            }}
          >
            {/* Courses */}
            {mockResults.courses.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ px: 2, py: 1, bgcolor: "grey.100" }}>
                  Courses
                </Typography>
                <List dense disablePadding>
                  {mockResults.courses.map((item) => (
                    <ListItem
                      key={`course-${item.id}`}
                      button
                      onClick={() => handleItemClick(item)}
                      sx={{
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}
                        >
                          {getIcon(item.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Chip
                            label="Course"
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}

            {/* Discussions */}
            {mockResults.discussions.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ px: 2, py: 1, bgcolor: "grey.100" }}>
                  Discussions
                </Typography>
                <List dense disablePadding>
                  {mockResults.discussions.map((item) => (
                    <ListItem
                      key={`discussion-${item.id}`}
                      button
                      onClick={() => handleItemClick(item)}
                      sx={{
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {getIcon(item.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Chip
                            label="Discussion"
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}

            {/* Users */}
            {mockResults.users.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ px: 2, py: 1, bgcolor: "grey.100" }}>
                  Users
                </Typography>
                <List dense disablePadding>
                  {mockResults.users.map((item) => (
                    <ListItem
                      key={`user-${item.id}`}
                      button
                      onClick={() => handleItemClick(item)}
                      sx={{
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main }}>
                          {getIcon(item.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <Chip
                            label="User"
                            size="small"
                            color="info"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* No Results */}
            {searchTerm &&
              mockResults.courses.length === 0 &&
              mockResults.discussions.length === 0 &&
              mockResults.users.length === 0 && (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    No results found for "{searchTerm}"
                  </Typography>
                </Box>
              )}
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  )
}

export default SearchBar

