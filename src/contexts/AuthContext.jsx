"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock user data
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      enrolledCourses: ["1", "3"],
      completedLessons: ["1-1", "1-2", "3-1"],
      badges: ["fast-learner", "discussion-starter"],
    },
  ]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock login functionality
    const user = mockUsers.find((user) => user.email === email && user.password === password)

    if (user) {
      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password

      setCurrentUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const register = (name, email, password) => {
    // Mock register functionality
    const userExists = mockUsers.some((user) => user.email === email)

    if (userExists) {
      return false
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
      avatar: `https://mui.com/static/images/avatar/${Math.floor(Math.random() * 8) + 1}.jpg`,
      enrolledCourses: [],
      completedLessons: [],
      badges: [],
    }

    mockUsers.push(newUser)

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password

    setCurrentUser(userWithoutPassword)
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  const enrollCourse = (courseId) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...currentUser.enrolledCourses, courseId],
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  const completeLessons = (lessonId) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      completedLessons: [...currentUser.completedLessons, lessonId],
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    enrollCourse,
    completeLessons,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

