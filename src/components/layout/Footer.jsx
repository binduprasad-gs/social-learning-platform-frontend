import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material"
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[900],
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              LearnSocial
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: "grey.400" }}>
              Empowering learners worldwide with interactive courses and a supportive community.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/courses" color="inherit" display="block" sx={{ mb: 1 }}>
              Courses
            </Link>
            <Link href="/forum" color="inherit" display="block" sx={{ mb: 1 }}>
              Forum
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
            <Link href="/help" color="inherit" display="block" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link href="/privacy" color="inherit" display="block">
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 4, backgroundColor: "grey.800" }} />
        <Typography variant="body2" color="text.secondary" align="center" sx={{ color: "grey.500" }}>
          © {new Date().getFullYear()} LearnSocial. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

