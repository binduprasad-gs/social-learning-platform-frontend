"use client"

import { useState, useEffect } from "react"
import { Typography, Box } from "@mui/material"

const AnimatedNumber = ({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  variant = "h4",
  color = "primary",
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame
    const startValue = displayValue
    const endValue = Number(value)

    const updateValue = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smoother animation
      const easeOutQuad = (progress) => 1 - (1 - progress) * (1 - progress)
      const easedProgress = easeOutQuad(progress)

      setDisplayValue(Math.floor(startValue + (endValue - startValue) * easedProgress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue)
      }
    }

    animationFrame = requestAnimationFrame(updateValue)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Typography variant={variant} color={color} {...props}>
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </Typography>
    </Box>
  )
}

export default AnimatedNumber

