"use client"

import { createContext, useContext, useState } from "react"

const CourseContext = createContext()

export const useCourses = () => useContext(CourseContext)

export const CourseProvider = ({ children }) => {
  // Mock course data
  const [courses] = useState([
    {
      id: "1",
      title: "Introduction to React",
      description: "Learn the fundamentals of React, including components, state, and props.",
      instructor: "Sarah Johnson",
      instructorAvatar: "https://mui.com/static/images/avatar/2.jpg",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      enrolledCount: 1245,
      price: 49.99,
      tags: ["Web Development", "JavaScript", "React"],
      lessons: [
        { id: "1-1", title: "Getting Started with React", duration: "45 min", videoUrl: "#" },
        { id: "1-2", title: "Components and Props", duration: "55 min", videoUrl: "#" },
        { id: "1-3", title: "State and Lifecycle", duration: "60 min", videoUrl: "#" },
        { id: "1-4", title: "Handling Events", duration: "50 min", videoUrl: "#" },
        { id: "1-5", title: "Conditional Rendering", duration: "45 min", videoUrl: "#" },
      ],
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      description: "Deep dive into advanced JavaScript concepts like closures, prototypes, and async programming.",
      instructor: "Michael Chen",
      instructorAvatar: "https://mui.com/static/images/avatar/3.jpg",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.6,
      enrolledCount: 892,
      price: 59.99,
      tags: ["Web Development", "JavaScript", "Programming"],
      lessons: [
        { id: "2-1", title: "Closures and Scope", duration: "60 min", videoUrl: "#" },
        { id: "2-2", title: "Prototypal Inheritance", duration: "55 min", videoUrl: "#" },
        { id: "2-3", title: "Async Programming", duration: "65 min", videoUrl: "#" },
        { id: "2-4", title: "ES6+ Features", duration: "70 min", videoUrl: "#" },
      ],
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      description: "Learn the core principles of UI/UX design and how to create user-friendly interfaces.",
      instructor: "Emily Rodriguez",
      instructorAvatar: "https://mui.com/static/images/avatar/4.jpg",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.9,
      enrolledCount: 1567,
      price: 69.99,
      tags: ["Design", "UI/UX", "Web Design"],
      lessons: [
        { id: "3-1", title: "Introduction to UI/UX", duration: "50 min", videoUrl: "#" },
        { id: "3-2", title: "User Research", duration: "65 min", videoUrl: "#" },
        { id: "3-3", title: "Wireframing", duration: "55 min", videoUrl: "#" },
        { id: "3-4", title: "Prototyping", duration: "70 min", videoUrl: "#" },
        { id: "3-5", title: "User Testing", duration: "60 min", videoUrl: "#" },
        { id: "3-6", title: "Design Systems", duration: "75 min", videoUrl: "#" },
      ],
    },
    {
      id: "4",
      title: "Full Stack Development with MERN",
      description: "Build complete web applications using MongoDB, Express, React, and Node.js.",
      instructor: "David Wilson",
      instructorAvatar: "https://mui.com/static/images/avatar/5.jpg",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12 weeks",
      level: "Advanced",
      rating: 4.7,
      enrolledCount: 723,
      price: 79.99,
      tags: ["Web Development", "MERN", "Full Stack"],
      lessons: [
        { id: "4-1", title: "Setting Up Your Environment", duration: "45 min", videoUrl: "#" },
        { id: "4-2", title: "Building a REST API with Express", duration: "65 min", videoUrl: "#" },
        { id: "4-3", title: "MongoDB Database Design", duration: "60 min", videoUrl: "#" },
        { id: "4-4", title: "React Frontend Development", duration: "70 min", videoUrl: "#" },
        { id: "4-5", title: "Authentication and Authorization", duration: "75 min", videoUrl: "#" },
        { id: "4-6", title: "Deployment and CI/CD", duration: "55 min", videoUrl: "#" },
      ],
    },
  ])

  // Mock forum data
  const [forumCategories] = useState([
    {
      id: "1",
      title: "General Discussion",
      description: "General topics related to learning and courses",
      threadCount: 24,
      icon: "forum",
    },
    {
      id: "2",
      title: "Course Help",
      description: "Get help with specific courses",
      threadCount: 56,
      icon: "help",
    },
    {
      id: "3",
      title: "Technical Issues",
      description: "Report and discuss technical problems",
      threadCount: 18,
      icon: "build",
    },
    {
      id: "4",
      title: "Career Advice",
      description: "Discuss career paths and opportunities",
      threadCount: 32,
      icon: "work",
    },
  ])

  const [forumThreads] = useState([
    {
      id: "1",
      categoryId: "1",
      title: "How to stay motivated during online learning?",
      author: "John Doe",
      authorAvatar: "https://mui.com/static/images/avatar/1.jpg",
      date: "2023-10-15",
      replies: 12,
      views: 345,
      content:
        "I find it challenging to stay motivated when taking online courses. What strategies do you use to keep yourself engaged and motivated throughout a course?",
      comments: [
        {
          id: "1-1",
          author: "Sarah Johnson",
          authorAvatar: "https://mui.com/static/images/avatar/2.jpg",
          date: "2023-10-16",
          content:
            "I find setting specific goals for each study session helps a lot. Also, having a dedicated study space makes a big difference!",
        },
        {
          id: "1-2",
          author: "Michael Chen",
          authorAvatar: "https://mui.com/static/images/avatar/3.jpg",
          date: "2023-10-16",
          content:
            "Try the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break. It works wonders for me.",
        },
      ],
    },
    {
      id: "2",
      categoryId: "2",
      title: "Stuck on React Hooks lesson in Introduction to React",
      author: "Emily Rodriguez",
      authorAvatar: "https://mui.com/static/images/avatar/4.jpg",
      date: "2023-10-14",
      replies: 8,
      views: 210,
      content:
        "I'm having trouble understanding the useEffect hook in the React course. Can someone explain when to use the dependency array?",
      comments: [
        {
          id: "2-1",
          author: "David Wilson",
          authorAvatar: "https://mui.com/static/images/avatar/5.jpg",
          date: "2023-10-14",
          content:
            "The dependency array tells React when to re-run the effect. If you leave it empty, the effect runs only on mount and unmount. If you include values, it runs when those values change.",
        },
      ],
    },
  ])

  const getCourse = (id) => {
    return courses.find((course) => course.id === id) || null
  }

  const getForumThread = (id) => {
    return forumThreads.find((thread) => thread.id === id) || null
  }

  const getForumCategory = (id) => {
    return forumCategories.find((category) => category.id === id) || null
  }

  const getThreadsByCategory = (categoryId) => {
    return forumThreads.filter((thread) => thread.categoryId === categoryId)
  }

  const value = {
    courses,
    forumCategories,
    forumThreads,
    getCourse,
    getForumThread,
    getForumCategory,
    getThreadsByCategory,
  }

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
}

