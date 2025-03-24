"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Container,
  Paper,
  TextField,
  IconButton,
} from "@mui/material"
import { School, Edit, Badge, Forum, Bookmark, Settings, CheckCircle } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"
import { useCourses } from "../contexts/CourseContext"
import CourseCard from "../components/courses/CourseCard"

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const { courses } = useCourses()
  const [activeTab, setActiveTab] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    bio: "Passionate learner interested in web development and design.",
    location: "New York, USA",
    website: "https://example.com",
  })

  const enrolledCourses = courses.filter((course) => currentUser.enrolledCourses.includes(course.id))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleEditProfile = () => {
    setEditMode(!editMode)
  }

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    setEditMode(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const badges = [
    { id: "fast-learner", name: "Fast Learner", icon: <School /> },
    { id: "discussion-starter", name: "Discussion Starter", icon: <Forum /> },
  ]

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  sx={{ width: 120, height: 120, mb: 2, mx: "auto" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 0,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.default" },
                  }}
                  onClick={handleEditProfile}
                >
                  <Edit />
                </IconButton>
              </Box>

              {editMode ? (
                <Box component="form" sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSaveProfile}>
                    Save Profile
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {profileData.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {profileData.bio}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Email:</strong> {currentUser.email}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Location:</strong> {profileData.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Website:</strong> {profileData.website}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Joined:</strong> January 2023
                    </Typography>
                  </Box>
                  <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 2 }} onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Badge color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Badges Earned</Typography>
              </Box>
              <Grid2 container spacing={2}>
                {badges.map((badge) => (
                  <Grid2 item xs={6} key={badge.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 48,
                          height: 48,
                          mx: "auto",
                          mb: 1,
                        }}
                      >
                        {badge.icon}
                      </Avatar>
                      <Typography variant="subtitle2">{badge.name}</Typography>
                    </Paper>
                  </Grid2>
                ))}
              </Grid2>
              <Button fullWidth variant="text" sx={{ mt: 2 }}>
                View All Badges
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="profile tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<School />} label="My Courses" />
              <Tab icon={<Forum />} label="Discussions" />
              <Tab icon={<Bookmark />} label="Bookmarks" />
              <Tab icon={<Settings />} label="Settings" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Enrolled Courses
              </Typography>
              {enrolledCourses.length > 0 ? (
                <Grid2 container spacing={3}>
                  {enrolledCourses.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id}>
                      <CourseCard course={course} />
                    </Grid>
                  ))}
                </Grid2>
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" paragraph>
                    You haven't enrolled in any courses yet.
                  </Typography>
                  <Button variant="contained" color="primary" href="/courses">
                    Browse Courses
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                My Discussions
              </Typography>
              <List>
                {[1, 2, 3].map((item) => (
                  <React.Fragment key={item}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={`https://mui.com/static/images/avatar/${item}.jpg`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Discussion Title ${item}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {`Forum Category ${item}`}
                            </Typography>
                            {` — Posted 2 week${item !== 1 ? "s" : ""} ago • ${item * 3} replies`}
                          </React.Fragment>
                        }
                      />
                      <Chip
                        label={item === 1 ? "Active" : "Resolved"}
                        color={item === 1 ? "primary" : "success"}
                        size="small"
                      />
                    </ListItem>
                    {item < 3 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                View All Discussions
              </Button>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Bookmarked Content
              </Typography>
              <List>
                {[1, 2, 3].map((item) => (
                  <React.Fragment key={item}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{item % 2 === 0 ? <School /> : <Forum />}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          item % 2 === 0
                            ? `Course Lesson: Advanced Topic ${item}`
                            : `Discussion: Important Question ${item}`
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {item % 2 === 0 ? `From Course ${item}` : `In Forum Category ${item}`}
                            </Typography>
                            {` — Bookmarked ${item} day${item !== 1 ? "s" : ""} ago`}
                          </React.Fragment>
                        }
                      />
                      <IconButton edge="end">
                        <Bookmark color="primary" />
                      </IconButton>
                    </ListItem>
                    {item < 3 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                View All Bookmarks
              </Button>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Notification Preferences
                </Typography>
                <Grid2 container spacing={2}>
                  {["Course updates", "Forum replies", "New messages", "Promotions"].map((item) => (
                    <Grid2 item xs={12} sm={6} key={item}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2">{item}</Typography>
                        <Chip label="Enabled" color="success" size="small" icon={<CheckCircle />} />
                      </Box>
                    </Grid2>
                  ))}
                </Grid2>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Edit Preferences
                </Button>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Privacy Settings
                </Typography>
                <Grid2 container spacing={2}>
                  {["Profile visibility", "Show online status", "Allow messages from non-connections"].map((item) => (
                    <Grid2 item xs={12} key={item}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2">{item}</Typography>
                        <Chip
                          label={item === "Allow messages from non-connections" ? "Disabled" : "Enabled"}
                          color={item === "Allow messages from non-connections" ? "default" : "success"}
                          size="small"
                        />
                      </Box>
                    </Grid2>
                  ))}
                </Grid2>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Edit Privacy
                </Button>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Account Actions
                </Typography>
                <Grid2 container spacing={2}>
                  <Grid2 item xs={12} sm={6}>
                    <Button fullWidth variant="outlined" color="primary">
                      Change Password
                    </Button>
                  </Grid2>
                  <Grid2 item xs={12} sm={6}>
                    <Button fullWidth variant="outlined" color="error">
                      Delete Account
                    </Button>
                  </Grid2>
                </Grid2>
              </Paper>
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default ProfilePage

