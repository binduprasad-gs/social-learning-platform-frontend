"use client"
import { Box, Card, CardContent, Typography, alpha, useTheme } from "@mui/material"

const FeatureCard = ({ icon, title, description, color = "primary", variant = "default", ...props }) => {
  const theme = useTheme()

  const getStyles = () => {
    switch (variant) {
      case "outlined":
        return {
          border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
          backgroundColor: "transparent",
        }
      case "filled":
        return {
          backgroundColor: theme.palette[color].main,
          color: theme.palette[color].contrastText,
        }
      case "light":
        return {
          backgroundColor: alpha(theme.palette[color].main, 0.1),
        }
      default:
        return {
          backgroundColor: theme.palette.background.paper,
        }
    }
  }

  const iconColor = variant === "filled" ? theme.palette[color].contrastText : theme.palette[color].main

  const textColor = variant === "filled" ? theme.palette[color].contrastText : undefined

  return (
    <Card
      elevation={variant === "default" ? 1 : 0}
      sx={{
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        },
        ...getStyles(),
        ...props.sx,
      }}
      {...props}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: variant === "filled" ? alpha("#fff", 0.2) : alpha(theme.palette[color].main, 0.1),
            color: iconColor,
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography variant="h6" component="h3" gutterBottom color={textColor}>
          {title}
        </Typography>

        <Typography variant="body2" color={variant === "filled" ? alpha("#fff", 0.8) : "text.secondary"}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FeatureCard

