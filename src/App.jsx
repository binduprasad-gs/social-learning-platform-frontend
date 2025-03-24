"use client"
import { Routes, Route } from "react-router-dom"
import { Box } from "@mui/material"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailsPage from "./pages/CourseDetailsPage"
import ForumPage from "./pages/ForumPage"
import ThreadPage from "./pages/ThreadPage"
import ProfilePage from "./pages/ProfilePage"
import ProgressPage from "./pages/ProgressPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="forum/:threadId" element={<ThreadPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Box>
  )
}

export default App

