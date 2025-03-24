"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Avatar,
  Stack,
  Divider,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Fade,
  Grow,
  Slide,
} from "@mui/material"
import {
  School,
  Forum,
  BarChart,
  Star,
  People,
  TrendingUp,
  PlayArrow,
  ArrowForward,
  Lightbulb,
  DevicesOther,
  SupportAgent,
  Groups,
  CheckCircle,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useCourses } from "../contexts/CourseContext"
import EnhancedCourseCard from "../components/courses/EnhancedCourseCard"
import AnimatedNumber from "../components/common/AnimatedNumber"
import FeatureCard from "../components/common/FeatureCard"
import SearchBar from "../components/common/SearchBar"

const HomePage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { courses } = useCourses()
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const featuredCourses = courses.slice(0, 3)
  const popularCourses = [...courses].sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 3)
  const newCourses = [...courses]
    .sort((a, b) => new Date(b.date || Date.now()) - new Date(a.date || Date.now()))
    .slice(0, 3)

  const displayedCourses = activeTab === 0 ? featuredCourses : activeTab === 1 ? popularCourses : newCourses

  const stats = [
    { icon: <School />, value: "100+", label: "Courses", color: "primary" },
    { icon: <People />, value: "10,000+", label: "Students", color: "secondary" },
    { icon: <Star />, value: "4.8", label: "Average Rating", color: "warning" },
    { icon: <TrendingUp />, value: "85%", label: "Completion Rate", color: "success" },
  ]

  const features = [
    {
      icon: <Lightbulb fontSize="large" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience in their fields.",
      color: "primary",
    },
    {
      icon: <DevicesOther fontSize="large" />,
      title: "Learn Anywhere",
      description: "Access your courses on any device, anytime, anywhere with our responsive platform.",
      color: "secondary",
    },
    {
      icon: <SupportAgent fontSize="large" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team.",
      color: "info",
    },
    {
      icon: <Groups fontSize="large" />,
      title: "Community Learning",
      description: "Connect with fellow learners and enhance your knowledge through collaboration.",
      color: "success",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UX Designer",
      avatar: "https://mui.com/static/images/avatar/2.jpg",
      content:
        "The courses on this platform have completely transformed my career. I went from a beginner to a professional UX designer in just a few months.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
      content:
        "The quality of instruction is outstanding. The instructors explain complex concepts in a way that's easy to understand and apply in real-world scenarios.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "https://mui.com/static/images/avatar/4.jpg",
      content:
        "I love the community aspect of this platform. Being able to discuss concepts with other learners has enhanced my understanding and expanded my professional network.",
    },
  ]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "auto", md: 600 },
          overflow: "hidden",
          bgcolor: "primary.dark",
          color: "white",
          mb: 8,
          borderRadius: { xs: 0, md: 4 },
          boxShadow: { xs: "none", md: "0 10px 30px rgba(0,0,0,0.1)" },
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
            zIndex: 1,
          }}
        />

        {/* Background pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 2,
            py: { xs: 6, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Typography
                    component="h1"
                    variant="h2"
                    color="inherit"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      lineHeight: 1.2,
                    }}
                  >
                    Learn, Connect, Grow
                  </Typography>
                  <Typography
                    variant="h5"
                    color="inherit"
                    paragraph
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      maxWidth: 600,
                      textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  >
                    Join our community of learners and unlock your potential with interactive courses and collaborative
                    learning.
                  </Typography>

                  <Box sx={{ mb: 4, maxWidth: 500 }}>
                    <SearchBar
                      placeholder="Search for courses, topics, or skills..."
                      fullWidth
                      size="large"
                      variant="filled"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        "& .MuiInputBase-root": {
                          color: "white",
                          "&::placeholder": {
                            color: "rgba(255,255,255,0.7)",
                          },
                        },
                        "& .MuiInputAdornment-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate("/courses")}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                        boxShadow: "0 8px 20px rgba(245,0,87,0.3)",
                      }}
                    >
                      Explore Courses
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      onClick={() => navigate("/register")}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Join Now
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
              <Grow in={isVisible} timeout={1500}>
                <Box
                  sx={{
                    position: "relative",
                    height: 400,
                  }}
                >
                  <Box
                    component="img"
                    src="/placeholder.svg?height=400&width=600"
                    alt="Students learning"
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 4,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      transform: "perspective(1000px) rotateY(-10deg)",
                      transition: "transform 0.5s",
                      "&:hover": {
                        transform: "perspective(1000px) rotateY(-5deg) translateY(-10px)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      right: -20,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      bgcolor: "secondary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" fontWeight="bold">
                        50%
                      </Typography>
                      <Typography variant="body2">OFF</Typography>
                      <Typography variant="caption" sx={{ display: "block" }}>
                        Limited Time
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, mt: { xs: -4, md: -6 }, position: "relative", zIndex: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Slide direction="up" in={isVisible} timeout={500 + index * 200}>
                  <Card
                    elevation={4}
                    sx={{
                      textAlign: "center",
                      p: 3,
                      height: "100%",
                      backgroundColor: "background.paper",
                      borderRadius: 4,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: `${stat.color}.main`,
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                          color: theme.palette[stat.color].main,
                          width: 56,
                          height: 56,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                    </Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        color: `${stat.color}.main`,
                      }}
                    >
                      <AnimatedNumber value={stat.value} />
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Why Choose LearnSocial
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
              Our platform offers a unique learning experience with features designed to help you succeed.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={isVisible} timeout={1000 + index * 300}>
                  <Box>
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      color={feature.color}
                      variant="light"
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              Explore Our Courses
            </Typography>
            <Button variant="outlined" onClick={() => navigate("/courses")} endIcon={<ArrowForward />}>
              View All
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  minWidth: 100,
                },
              }}
            >
              <Tab label="Featured" />
              <Tab label="Popular" />
              <Tab label="New" />
            </Tabs>
          </Box>

          <Grid container spacing={4}>
            {displayedCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <EnhancedCourseCard course={course} variant="compact" />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ mb: 8, py: 6, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 4 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                What Our Students Say
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
                Hear from our community of learners about their experiences with our platform.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={testimonial.id}>
                  <Fade in={isVisible} timeout={1000 + index * 300}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            paragraph
                            sx={{
                              fontStyle: "italic",
                              color: "text.secondary",
                              position: "relative",
                              "&:before": {
                                content: '"""',
                                position: "absolute",
                                left: -15,
                                top: -15,
                                fontSize: "3rem",
                                color: alpha(theme.palette.primary.main, 0.1),
                                fontFamily: "Georgia, serif",
                              },
                            }}
                          >
                            {testimonial.content}
                          </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Community Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Join Our Learning Community
              </Typography>
              <Typography variant="body1" paragraph>
                Connect with fellow learners, participate in discussions, and enhance your learning experience through
                collaboration.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Engage in meaningful discussions"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Get help from peers and instructors"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Share your knowledge and experiences"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/forum")}
                startIcon={<Forum />}
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Explore Forum
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Recent Discussions
                </Typography>
                {[1, 2, 3].map((item) => (
                  <Box key={item}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 2 }}>
                      <Avatar src={`https://mui.com/static/images/avatar/${item}.jpg`} />
                      <Box>
                        <Typography variant="subtitle2">How to master React hooks?</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Started by John Doe • 2 days ago • 8 replies
                        </Typography>
                      </Box>
                    </Box>
                    {item < 3 && <Divider />}
                  </Box>
                ))}
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/forum")}
                  sx={{ mt: 2 }}
                >
                  View All Discussions
                </Button>

                {/* Decorative elements */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    zIndex: 0,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Track Progress Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  component="img"
                  src="/placeholder.svg?height=400&width=600"
                  alt="Progress tracking"
                  sx={{
                    width: "100%",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0,0,0,0.3)",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": {
                        bgcolor: "white",
                      },
                      width: 64,
                      height: 64,
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Track Your Learning Progress
              </Typography>
              <Typography variant="body1" paragraph>
                Monitor your course completion, earn badges, and visualize your learning journey with our intuitive
                progress tracking tools.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Chip icon={<CheckCircle />} label="Visual progress indicators" color="primary" sx={{ mr: 1 }} />
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Chip icon={<CheckCircle />} label="Achievement badges and rewards" color="primary" sx={{ mr: 1 }} />
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Personalized learning recommendations"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/progress")}
                startIcon={<BarChart />}
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                View Progress Dashboard
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mb: 8 }}>
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Ready to Start Your Learning Journey?
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                maxWidth: 700,
                mx: "auto",
                mb: 4,
                opacity: 0.9,
              }}
            >
              Join thousands of students who are already learning and growing with our platform. Get started today!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(245,0,87,0.3)",
              }}
            >
              Sign Up Now
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage

