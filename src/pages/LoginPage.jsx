"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Container,
} from "@mui/material"
import { Google, Facebook, Twitter, Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, currentUser } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // If user is already logged in, redirect to home
  if (currentUser) {
    navigate("/")
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    const success = login(formData.email, formData.password)

    if (success) {
      navigate("/")
    } else {
      setError("Invalid email or password")
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Log in to continue your learning journey
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            autoFocus
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right", mt: 1, mb: 3 }}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" color="primary" size="large" sx={{ mb: 3 }}>
            Log In
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <IconButton sx={{ bgcolor: "#DB4437", color: "white", "&:hover": { bgcolor: "#C53929" } }}>
              <Google />
            </IconButton>
            <IconButton sx={{ bgcolor: "#4267B2", color: "white", "&:hover": { bgcolor: "#365899" } }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ bgcolor: "#1DA1F2", color: "white", "&:hover": { bgcolor: "#0c85d0" } }}>
              <Twitter />
            </IconButton>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} LearnSocial. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}

export default LoginPage

