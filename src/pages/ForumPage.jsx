"use client"

import React from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Chip,
  IconButton,
} from "@mui/material"
import { Search, Forum as ForumIcon, Help, Build, Work, ArrowForward, Add } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useCourses } from "../contexts/CourseContext"
import { useAuth } from "../contexts/AuthContext"

const ForumPage = () => {
  const navigate = useNavigate()
  const { forumCategories, forumThreads } = useCourses()
  const { currentUser } = useAuth()

  // Get recent threads
  const recentThreads = [...forumThreads]
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, 5)

  // Get popular threads
  const popularThreads = [...forumThreads]
    .sort((a, b) => {
      return b.views - a.views
    })
    .slice(0, 5)

  const getCategoryIcon = (icon) => {
    switch (icon) {
      case "forum":
        return <ForumIcon />
      case "help":
        return <Help />
      case "build":
        return <Build />
      case "work":
        return <Work />
      default:
        return <ForumIcon />
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Discussion Forum
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Connect with fellow learners, ask questions, and share your knowledge.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search discussions..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Add />}
              onClick={() => (currentUser ? null : navigate("/login"))}
            >
              Start New Discussion
            </Button>
          </Grid>
        </Grid>

        {/* Categories */}
        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 3 }}>
          Categories
        </Typography>
        <Grid container spacing={3}>
          {forumCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
                onClick={() => navigate(`/forum/category/${category.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      {getCategoryIcon(category.icon)}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>
                    <Chip label={`${category.threadCount} Threads`} size="small" color="primary" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Recent & Popular Discussions */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Recent Discussions
            </Typography>
            <Card>
              <List disablePadding>
                {recentThreads.map((thread, index) => (
                  <React.Fragment key={thread.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => navigate(`/forum/${thread.id}`)}
                      secondaryAction={
                        <IconButton edge="end" aria-label="view thread">
                          <ArrowForward />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={thread.authorAvatar} alt={thread.author} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={thread.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {thread.author}
                            </Typography>
                            {` — ${thread.date} • ${thread.replies} replies • ${thread.views} views`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button variant="outlined" fullWidth>
                  View All Recent Discussions
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Popular Discussions
            </Typography>
            <Card>
              <List disablePadding>
                {popularThreads.map((thread, index) => (
                  <React.Fragment key={thread.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => navigate(`/forum/${thread.id}`)}
                      secondaryAction={
                        <IconButton edge="end" aria-label="view thread">
                          <ArrowForward />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={thread.authorAvatar} alt={thread.author} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={thread.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {thread.author}
                            </Typography>
                            {` — ${thread.date} • ${thread.replies} replies • ${thread.views} views`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button variant="outlined" fullWidth>
                  View All Popular Discussions
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ForumPage

