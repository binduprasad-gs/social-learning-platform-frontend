"use client"
import { Box, Typography, Container, Paper, useTheme, alpha } from "@mui/material"

const PageBanner = ({
  title,
  subtitle,
  backgroundImage,
  height = 200,
  align = "left",
  overlay = true,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        height: height,
        mb: 4,
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : theme.palette.primary.main,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...props.sx,
      }}
      {...props}
    >
      {/* Overlay */}
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: backgroundImage
              ? `linear-gradient(to right, ${alpha(theme.palette.primary.dark, 0.85)}, ${alpha(theme.palette.primary.dark, 0.65)})`
              : `linear-gradient(to right, ${alpha(theme.palette.primary.dark, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          textAlign: align,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="white"
          gutterBottom
          sx={{
            fontWeight: 700,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h6"
            color="white"
            sx={{
              maxWidth: align === "center" ? "700px" : "600px",
              margin: align === "center" ? "0 auto" : "0",
              opacity: 0.9,
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Container>
    </Paper>
  )
}

export default PageBanner

