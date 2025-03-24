"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  CardActionArea,
  CardActions,
  Collapse,
  useTheme,
  alpha,
} from "@mui/material"
import {
  AccessTime,
  Person,
  Star,
  Bookmark,
  BookmarkBorder,
  Share,
  ExpandMore as ExpandMoreIcon,
  School,
  SignalCellularAlt,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const EnhancedCourseCard = ({ course, variant = "default", ...props }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    setBookmarked(!bookmarked)
  }

  const handleShare = (e) => {
    e.stopPropagation()
    // Share functionality would go here
    alert(`Sharing course: ${course.title}`)
  }

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`)
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return theme.palette.success.main
      case "Intermediate":
        return theme.palette.warning.main
      case "Advanced":
        return theme.palette.error.main
      default:
        return theme.palette.info.main
    }
  }

  // Compact variant for grid layouts
  if (variant === "compact") {
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
          ...props.sx,
        }}
      >
        <CardActionArea onClick={handleCardClick}>
          <Box sx={{ position: "relative" }}>
            <CardMedia component="img" height="140" image={course.thumbnail} alt={course.title} />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                gap: 0.5,
              }}
            >
              <Tooltip title={bookmarked ? "Remove bookmark" : "Bookmark course"}>
                <IconButton
                  size="small"
                  onClick={handleBookmark}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  {bookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                </IconButton>
              </Tooltip>
            </Box>
            <Chip
              label={course.level}
              size="small"
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                bgcolor: alpha(getLevelColor(course.level), 0.9),
                color: "white",
                fontWeight: 500,
              }}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 600,
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

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src={course.instructorAvatar} alt={course.instructor} sx={{ width: 24, height: 24, mr: 1 }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {course.instructor}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mb: 1,
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTime fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                <Typography variant="caption">{course.duration}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SignalCellularAlt
                  fontSize="small"
                  sx={{ mr: 0.5, fontSize: 16, color: getLevelColor(course.level) }}
                />
                <Typography variant="caption">{course.level}</Typography>
              </Box>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating value={course.rating} precision={0.1} readOnly size="small" icon={<Star fontSize="inherit" />} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {course.rating.toFixed(1)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                ({course.enrolledCount.toLocaleString()})
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ pt: 0, justifyContent: "space-between" }}>
          <Typography variant="subtitle1" color="primary.main" fontWeight={600}>
            ${course.price.toFixed(2)}
          </Typography>
          <Button size="small" variant="contained" color="primary" onClick={handleCardClick}>
            View
          </Button>
        </CardActions>
      </Card>
    )
  }

  // List variant for horizontal layouts
  if (variant === "list") {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          },
          ...props.sx,
        }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "stretch",
            height: "100%",
          }}
          onClick={handleCardClick}
        >
          <Box sx={{ position: "relative", width: { xs: "100%", sm: 240 }, flexShrink: 0 }}>
            <CardMedia
              component="img"
              sx={{
                height: { xs: 180, sm: "100%" },
                objectFit: "cover",
              }}
              image={course.thumbnail}
              alt={course.title}
            />
            <Chip
              label={course.level}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                bgcolor: alpha(getLevelColor(course.level), 0.9),
                color: "white",
                fontWeight: 500,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
              <Typography variant="h6" component="div" gutterBottom>
                {course.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar src={course.instructorAvatar} alt={course.instructor} sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {course.instructor}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {course.description}
              </Typography>

              <Stack
                direction="row"
                spacing={3}
                sx={{
                  mb: 1,
                  color: "text.secondary",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{course.duration}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <School fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{course.lessons.length} lessons</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Person fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{course.enrolledCount.toLocaleString()} students</Typography>
                </Box>
              </Stack>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={course.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {course.rating.toFixed(1)}
                </Typography>
              </Box>
            </CardContent>

            <Box sx={{ display: "flex", alignItems: "center", px: 2, pb: 1 }}>
              {course.tags.slice(0, 3).map((tag, index) => (
                <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} variant="outlined" />
              ))}
              {course.tags.length > 3 && (
                <Chip label={`+${course.tags.length - 3}`} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
              )}
            </Box>
          </Box>
        </CardActionArea>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            justifyContent: { xs: "space-between", sm: "center" },
            alignItems: { xs: "center", sm: "flex-end" },
            p: 2,
            pl: { xs: 2, sm: 0 },
            borderLeft: { xs: "none", sm: `1px solid ${theme.palette.divider}` },
            borderTop: { xs: `1px solid ${theme.palette.divider}`, sm: "none" },
            minWidth: { sm: 150 },
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            ${course.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: { xs: 0, sm: 2 } }}>
            <Button variant="contained" color="primary" onClick={handleCardClick} size="small">
              View Course
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <Tooltip title={bookmarked ? "Remove bookmark" : "Bookmark course"}>
                <IconButton size="small" onClick={handleBookmark}>
                  {bookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Share course">
                <IconButton size="small" onClick={handleShare}>
                  <Share />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Card>
    )
  }

  // Default card variant
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
        ...props.sx,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="180" image={course.thumbnail} alt={course.title} />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
          }}
        >
          <Tooltip title={bookmarked ? "Remove bookmark" : "Bookmark course"}>
            <IconButton
              size="small"
              onClick={handleBookmark}
              sx={{
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              {bookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Share course">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={{
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
        <Chip
          label={course.level}
          size="small"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: alpha(getLevelColor(course.level), 0.9),
            color: "white",
            fontWeight: 500,
          }}
        />
      </Box>

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
          <Button variant="contained" size="small" onClick={handleCardClick}>
            View Course
          </Button>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <Button size="small" onClick={handleCardClick}>
          Learn More
        </Button>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="subtitle2">
            Course Content:
          </Typography>
          <Typography paragraph variant="body2">
            {course.lessons.length} lessons • Total duration: {course.duration}
          </Typography>
          <Typography paragraph variant="body2">
            {course.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default EnhancedCourseCard

