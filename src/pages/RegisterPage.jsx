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
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { Google, Facebook, Twitter, Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, currentUser } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions")
      return
    }

    const success = register(formData.name, formData.email, formData.password)

    if (success) {
      navigate("/")
    } else {
      setError("Email already in use")
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
            Create an Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join our learning community today
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
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            autoFocus
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
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

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControlLabel
            control={
              <Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} color="primary" />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link href="#" variant="body2">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" variant="body2">
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 3 }}
            disabled={!agreeTerms}
          >
            Sign Up
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
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" variant="body2">
                Log in
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

export default RegisterPage

