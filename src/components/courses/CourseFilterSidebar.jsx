"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import { ExpandMore, FilterAlt, RestartAlt } from "@mui/icons-material"

const CourseFilterSidebar = ({
  onFilterChange,
  initialFilters = {},
  categories = [],
  instructors = [],
  tags = [],
  ...props
}) => {
  const theme = useTheme()

  const [filters, setFilters] = useState({
    priceRange: initialFilters.priceRange || [0, 100],
    rating: initialFilters.rating || 0,
    categories: initialFilters.categories || [],
    instructors: initialFilters.instructors || [],
    levels: initialFilters.levels || [],
    tags: initialFilters.tags || [],
    duration: initialFilters.duration || [],
  })

  const handlePriceChange = (event, newValue) => {
    setFilters({
      ...filters,
      priceRange: newValue,
    })
  }

  const handleRatingChange = (event, newValue) => {
    setFilters({
      ...filters,
      rating: newValue,
    })
  }

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]

    setFilters({
      ...filters,
      [category]: newValues,
    })
  }

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: [0, 100],
      rating: 0,
      categories: [],
      instructors: [],
      levels: [],
      tags: [],
      duration: [],
    }

    setFilters(resetFilters)

    if (onFilterChange) {
      onFilterChange(resetFilters)
    }
  }

  const levels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ]

  const durations = [
    { value: "short", label: "Short (< 3 hours)" },
    { value: "medium", label: "Medium (3-6 hours)" },
    { value: "long", label: "Long (> 6 hours)" },
  ]

  return (
    <Box sx={{ p: 2, ...props.sx }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FilterAlt color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Accordion defaultExpanded elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={5}
              marks={[
                { value: 0, label: "$0" },
                { value: 50, label: "$50" },
                { value: 100, label: "$100+" },
              ]}
              sx={{ mt: 4 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                ${filters.priceRange[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${filters.priceRange[1]}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Rating */}
      <Accordion defaultExpanded elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={filters.rating} onChange={handleRatingChange} precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {filters.rating > 0 ? `${filters.rating} & up` : "Any rating"}
              </Typography>
            </Box>

            {[4, 3, 2, 1].map((rating) => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox
                    checked={filters.rating <= rating}
                    onChange={() => handleRatingChange(null, rating)}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={rating} readOnly size="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">& up</Typography>
                  </Box>
                }
                sx={{ display: "block", my: 0.5 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Categories */}
      <Accordion defaultExpanded elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup sx={{ px: 1 }}>
            {categories.map((category) => (
              <FormControlLabel
                key={category.value}
                control={
                  <Checkbox
                    checked={filters.categories.includes(category.value)}
                    onChange={() => handleCheckboxChange("categories", category.value)}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant="body2">{category.label}</Typography>
                    <Chip
                      label={category.count}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>
                }
                sx={{ display: "block", my: 0.5 }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Instructors */}
      <Accordion elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Instructors
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup sx={{ px: 1 }}>
            {instructors.map((instructor) => (
              <FormControlLabel
                key={instructor.value}
                control={
                  <Checkbox
                    checked={filters.instructors.includes(instructor.value)}
                    onChange={() => handleCheckboxChange("instructors", instructor.value)}
                    size="small"
                  />
                }
                label={instructor.label}
                sx={{ display: "block", my: 0.5 }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Level */}
      <Accordion elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Level
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup sx={{ px: 1 }}>
            {levels.map((level) => (
              <FormControlLabel
                key={level.value}
                control={
                  <Checkbox
                    checked={filters.levels.includes(level.value)}
                    onChange={() => handleCheckboxChange("levels", level.value)}
                    size="small"
                  />
                }
                label={level.label}
                sx={{ display: "block", my: 0.5 }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Duration */}
      <Accordion elevation={0} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Duration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup sx={{ px: 1 }}>
            {durations.map((duration) => (
              <FormControlLabel
                key={duration.value}
                control={
                  <Checkbox
                    checked={filters.duration.includes(duration.value)}
                    onChange={() => handleCheckboxChange("duration", duration.value)}
                    size="small"
                  />
                }
                label={duration.label}
                sx={{ display: "block", my: 0.5 }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Tags */}
      <Accordion elevation={0} sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Tags
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag.value}
                label={tag.label}
                size="small"
                variant={filters.tags.includes(tag.value) ? "filled" : "outlined"}
                color={filters.tags.includes(tag.value) ? "primary" : "default"}
                onClick={() => handleCheckboxChange("tags", tag.value)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleResetFilters} startIcon={<RestartAlt />}>
          Reset
        </Button>
      </Box>
    </Box>
  )
}

export default CourseFilterSidebar

