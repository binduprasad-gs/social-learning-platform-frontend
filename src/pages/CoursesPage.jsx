"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Stack,
} from "@mui/material"
import { Search, FilterList } from "@mui/icons-material"
import { useCourses } from "../contexts/CourseContext"
import CourseCard from "../components/courses/CourseCard"

const CoursesPage = () => {
  const { courses } = useCourses()
  const [searchTerm, setSearchTerm] = useState("")
  const [level, setLevel] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [page, setPage] = useState(1)
  const coursesPerPage = 6

  // Get all unique tags from courses
  const allTags = [...new Set(courses.flatMap((course) => course.tags))]
  const [selectedTags, setSelectedTags] = useState([])

  // Filter courses based on search, level, and tags
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = level === "" || course.level === level
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => course.tags.includes(tag))

    return matchesSearch && matchesLevel && matchesTags
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") {
      return b.enrolledCount - a.enrolledCount
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "price-low") {
      return a.price - b.price
    } else if (sortBy === "price-high") {
      return b.price - a.price
    }
    return 0
  })

  // Pagination
  const indexOfLastCourse = page * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage)

  const handleChangePage = (event, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
    setPage(1)
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Discover a wide range of courses to enhance your skills and knowledge.
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="level-select-label">Level</InputLabel>
              <Select
                labelId="level-select-label"
                id="level-select"
                value={level}
                label="Level"
                onChange={(e) => {
                  setLevel(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <FilterList sx={{ mr: 1 }} />
          <Typography variant="body2">Filter by tags:</Typography>
        </Box>
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            color={selectedTags.includes(tag) ? "primary" : "default"}
            variant={selectedTags.includes(tag) ? "filled" : "outlined"}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      {/* Course Grid */}
      {currentCourses.length > 0 ? (
        <Grid container spacing={4}>
          {currentCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6">No courses found matching your criteria.</Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters.
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack spacing={2} sx={{ mt: 4, mb: 2, alignItems: "center" }}>
          <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" size="large" />
        </Stack>
      )}
    </Container>
  )
}

export default CoursesPage

