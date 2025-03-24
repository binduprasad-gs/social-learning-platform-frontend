"use client"
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, Button, Avatar, Stack } from "@mui/material"
import { AccessTime, Person, Star } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ course }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia component="img" height="160" image={course.thumbnail} alt={course.title} />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {course.tags.slice(0, 2).map((tag, index) => (
            <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
          ))}
          {course.tags.length > 2 && <Chip label={`+${course.tags.length - 2}`} size="small" variant="outlined" />}
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.2,
            height: "2.4em",
          }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "4.5em",
          }}
        >
          {course.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar src={course.instructorAvatar} alt={course.instructor} sx={{ width: 24, height: 24, mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {course.instructor}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 2,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
            {course.duration}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Person fontSize="small" sx={{ mr: 0.5 }} />
            {course.enrolledCount.toLocaleString()}
          </Box>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating value={course.rating} precision={0.1} readOnly size="small" icon={<Star fontSize="inherit" />} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {course.rating.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
          <Typography variant="h6" color="primary.main">
            ${course.price.toFixed(2)}
          </Typography>
          <Button variant="contained" size="small" onClick={() => navigate(`/courses/${course.id}`)}>
            View Course
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CourseCard

