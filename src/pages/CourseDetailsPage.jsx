"use client"

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Rating,
  Paper,
  Container,
  Alert,
  Snackbar,
} from "@mui/material"
import {
  PlayCircleOutline,
  Description,
  Forum,
  Assessment,
  CheckCircle,
  AccessTime,
  Person,
  Star,
  School,
} from "@mui/icons-material"
import { useCourses } from "../contexts/CourseContext"
import { useAuth } from "../contexts/AuthContext"

const CourseDetailsPage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { getCourse } = useCourses()
  const { currentUser, enrollCourse } = useAuth()
  const course = getCourse(courseId)

  const [activeTab, setActiveTab] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  if (!course) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h5">Course not found</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/courses")}>
            Back to Courses
          </Button>
        </Box>
      </Container>
    )
  }

  const isEnrolled = currentUser && currentUser.enrolledCourses.includes(courseId)

  const handleEnroll = () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    enrollCourse(courseId)
    setOpenSnackbar(true)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Course Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {course.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={course.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {course.rating.toFixed(1)} ({course.enrolledCount.toLocaleString()} students)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
              <Typography variant="body2">Instructor: {course.instructor}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
              <Typography variant="body2">Duration: {course.duration}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <School fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
              <Typography variant="body2">Level: {course.level}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            {course.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Box sx={{ mb: 4 }}>
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              style={{
                width: "100%",
                borderRadius: 8,
                maxHeight: 400,
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Overview" icon={<Description />} iconPosition="start" />
              <Tab label="Curriculum" icon={<PlayCircleOutline />} iconPosition="start" />
              <Tab label="Discussion" icon={<Forum />} iconPosition="start" />
              <Tab label="Reviews" icon={<Star />} iconPosition="start" />
            </Tabs>

            <Box sx={{ p: 3, border: 1, borderColor: "divider", borderTop: 0, borderRadius: "0 0 8px 8px" }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    About This Course
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {course.description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This comprehensive course will take you from beginner to advanced level. You'll learn through
                    practical examples and hands-on projects that reinforce the concepts covered in each lesson.
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    What You'll Learn
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      "Master core concepts and principles",
                      "Build real-world projects",
                      "Learn best practices and patterns",
                      "Gain practical skills for your career",
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CheckCircle color="primary" fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Course Content
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.lessons.length} lessons • {course.duration} total
                  </Typography>

                  <List disablePadding>
                    {course.lessons.map((lesson, index) => (
                      <React.Fragment key={lesson.id}>
                        {index > 0 && <Divider component="li" />}
                        <ListItem
                          sx={{
                            py: 1.5,
                            backgroundColor: index % 2 === 0 ? "background.default" : "transparent",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <PlayCircleOutline color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={lesson.title}
                            secondary={`${lesson.duration}`}
                            primaryTypographyProps={{ variant: "body1" }}
                            secondaryTypographyProps={{ variant: "body2" }}
                          />
                          {currentUser && currentUser.completedLessons.includes(lesson.id) ? (
                            <Chip label="Completed" size="small" color="success" icon={<CheckCircle />} />
                          ) : (
                            <Chip
                              label={index === 0 || isEnrolled ? "Start" : "Locked"}
                              size="small"
                              color={index === 0 || isEnrolled ? "primary" : "default"}
                              variant={index === 0 || isEnrolled ? "filled" : "outlined"}
                              disabled={!isEnrolled && index !== 0}
                            />
                          )}
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Course Discussions
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Join the conversation with fellow students and instructors.
                  </Typography>

                  {isEnrolled ? (
                    <Box>
                      {/* Sample discussions */}
                      {[1, 2, 3].map((item) => (
                        <Paper key={item} sx={{ p: 2, mb: 2 }}>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Avatar src={`https://mui.com/static/images/avatar/${item}.jpg`} />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2">Question about lesson {item}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Posted by Student {item} • 2 days ago
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                I'm having trouble understanding the concept in lesson {item}. Can someone explain it in
                                simpler terms?
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <Button size="small">Reply</Button>
                                <Button size="small">See Replies (3)</Button>
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info">Enroll in this course to participate in discussions.</Alert>
                  )}
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Student Reviews
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box sx={{ mr: 3, textAlign: "center" }}>
                      <Typography variant="h3">{course.rating.toFixed(1)}</Typography>
                      <Rating value={course.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {course.enrolledCount} students
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1
                        return (
                          <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>
                              {star}
                            </Typography>
                            <Star fontSize="small" sx={{ color: "warning.main", mx: 0.5 }} />
                            <Box
                              sx={{
                                flex: 1,
                                height: 8,
                                mx: 1,
                                bgcolor: "grey.200",
                                borderRadius: 1,
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  height: "100%",
                                  width: `${percentage}%`,
                                  bgcolor: "warning.main",
                                  borderRadius: 1,
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {percentage}%
                            </Typography>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>

                  {/* Sample reviews */}
                  {[1, 2, 3].map((item) => (
                    <Paper key={item} sx={{ p: 2, mb: 2 }}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Avatar src={`https://mui.com/static/images/avatar/${item + 3}.jpg`} />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2">Student Name {item}</Typography>
                            <Rating value={6 - item} precision={0.5} readOnly size="small" />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Posted {item} month{item !== 1 ? "s" : ""} ago
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {item === 1
                              ? "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand."
                              : item === 2
                                ? "Great content and well-structured lessons. I've learned a lot and can apply these skills in my work."
                                : "Solid course with good examples. Some sections could be more in-depth, but overall it's worth the investment."}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Enrollment Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 20 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                ${course.price.toFixed(2)}
              </Typography>

              {isEnrolled ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => navigate("/progress")}
                >
                  Continue Learning
                </Button>
              ) : (
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                30-Day Money-Back Guarantee
              </Typography>

              <Typography variant="h6" gutterBottom>
                This course includes:
              </Typography>

              <List disablePadding>
                {[
                  { icon: <PlayCircleOutline />, text: `${course.lessons.length} on-demand video lessons` },
                  { icon: <Description />, text: "Downloadable resources" },
                  { icon: <Assessment />, text: "Practice exercises" },
                  { icon: <Forum />, text: "Discussion forum access" },
                  { icon: <CheckCircle />, text: "Certificate of completion" },
                ].map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ variant: "body2" }} />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                <Avatar src={course.instructorAvatar} alt={course.instructor} sx={{ width: 48, height: 48, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2">{course.instructor}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course Instructor
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Successfully enrolled in {course.title}!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default CourseDetailsPage

