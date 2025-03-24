"use client"

import React from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Container,
  Paper,
  Divider,
} from "@mui/material"
import {
  CheckCircle,
  PlayCircleOutline,
  AccessTime,
  EmojiEvents,
  TrendingUp,
  CalendarToday,
  Forum,
} from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"
import { useCourses } from "../contexts/CourseContext"

const ProgressPage = () => {
  const { currentUser } = useAuth()
  const { courses } = useCourses()

  const enrolledCourses = courses.filter((course) => currentUser.enrolledCourses.includes(course.id))

  // Calculate overall progress
  const totalLessons = enrolledCourses.reduce((total, course) => total + course.lessons.length, 0)

  const completedLessons = currentUser.completedLessons.length

  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Calculate course-specific progress
  const courseProgress = enrolledCourses.map((course) => {
    const totalCourseLessons = course.lessons.length
    const completedCourseLessons = currentUser.completedLessons.filter((lessonId) =>
      lessonId.startsWith(course.id),
    ).length

    const progress = totalCourseLessons > 0 ? Math.round((completedCourseLessons / totalCourseLessons) * 100) : 0

    return {
      ...course,
      progress,
      completedLessons: completedCourseLessons,
      totalLessons: totalCourseLessons,
    }
  })

  // Mock activity data
  const recentActivity = [
    { type: "lesson_completed", course: "Introduction to React", lesson: "Components and Props", date: "2 days ago" },
    { type: "course_started", course: "UI/UX Design Principles", date: "1 week ago" },
    { type: "badge_earned", badge: "Fast Learner", date: "2 weeks ago" },
    { type: "forum_post", topic: "How to optimize React performance?", date: "3 weeks ago" },
  ]

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Learning Progress
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track your course completion and learning achievements.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Overall Progress */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Progress
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {overallProgress}% Complete
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {completedLessons} of {totalLessons} lessons completed
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={overallProgress} sx={{ height: 10, borderRadius: 5 }} />

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {enrolledCourses.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Courses Enrolled
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {completedLessons}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lessons Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {currentUser.badges.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Badges Earned
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hours Spent
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Typography variant="h6" gutterBottom>
            Course Progress
          </Typography>
          {courseProgress.length > 0 ? (
            courseProgress.map((course) => (
              <Card key={course.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="subtitle1" gutterBottom>
                        {course.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {course.progress}% Complete
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.completedLessons} of {course.totalLessons} lessons
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AccessTime fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {course.duration}
                          </Typography>
                        </Box>
                        <Chip
                          label={course.progress === 100 ? "Completed" : "In Progress"}
                          color={course.progress === 100 ? "success" : "primary"}
                          size="small"
                          icon={course.progress === 100 ? <CheckCircle /> : <PlayCircleOutline />}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Recent Lessons
                  </Typography>
                  <List dense disablePadding>
                    {course.lessons.slice(0, 3).map((lesson) => {
                      const isCompleted = currentUser.completedLessons.includes(lesson.id)
                      return (
                        <ListItem key={lesson.id} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {isCompleted ? (
                              <CheckCircle color="success" fontSize="small" />
                            ) : (
                              <PlayCircleOutline color="action" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={lesson.title}
                            secondary={lesson.duration}
                            primaryTypographyProps={{
                              variant: "body2",
                              color: isCompleted ? "text.secondary" : "text.primary",
                              sx: isCompleted ? { textDecoration: "line-through" } : {},
                            }}
                            secondaryTypographyProps={{ variant: "caption" }}
                          />
                        </ListItem>
                      )
                    })}
                  </List>
                </CardContent>
              </Card>
            ))
          ) : (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1" paragraph>
                You haven't enrolled in any courses yet.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enroll in courses to track your progress.
              </Typography>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Learning Streak */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmojiEvents color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Learning Streak</Typography>
              </Box>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h3" color="primary">
                  7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Days in a row
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: index < 7 ? "primary.main" : "action.disabled",
                      color: "white",
                    }}
                  >
                    {day}
                  </Box>
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary" align="center">
                Keep learning daily to maintain your streak!
              </Typography>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List disablePadding>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                          {activity.type === "lesson_completed" && <CheckCircle />}
                          {activity.type === "course_started" && <PlayCircleOutline />}
                          {activity.type === "badge_earned" && <EmojiEvents />}
                          {activity.type === "forum_post" && <Forum />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          activity.type === "lesson_completed"
                            ? `Completed lesson: ${activity.lesson}`
                            : activity.type === "course_started"
                              ? `Started course: ${activity.course}`
                              : activity.type === "badge_earned"
                                ? `Earned badge: ${activity.badge}`
                                : `Posted in forum: ${activity.topic}`
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {activity.course && `${activity.course} • `}
                            </Typography>
                            {activity.date}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Learning Goals</Typography>
              </Box>
              <List disablePadding>
                {[
                  { goal: "Complete React course", deadline: "2 weeks", progress: 65 },
                  { goal: "Build 3 projects", deadline: "1 month", progress: 33 },
                  { goal: "Post in forum weekly", deadline: "Ongoing", progress: 100 },
                ].map((goal, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={goal.goal}
                        secondary={
                          <React.Fragment>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                              <CalendarToday fontSize="small" sx={{ mr: 0.5, fontSize: 14, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">
                                Deadline: {goal.deadline}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <LinearProgress
                                variant="determinate"
                                value={goal.progress}
                                sx={{ height: 6, borderRadius: 3, flex: 1, mr: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {goal.progress}%
                              </Typography>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProgressPage

