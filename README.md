# 🎓 Social Learning Platform

A comprehensive, fully responsive frontend for a modern social learning platform built with React.js and Material UI (MUI). This platform enables users to browse courses, enroll in them, track their learning progress, and participate in community discussions.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **User Authentication**: Register, login, and profile management
- **Course Catalog**: Browse, filter, and search for courses
- **Course Details**: View comprehensive course information, curriculum, and reviews
- **Learning Dashboard**: Track progress across enrolled courses
- **Discussion Forum**: Participate in community discussions and get help
- **Responsive Design**: Fully optimized for all device sizes
- **Interactive UI**: Animations, transitions, and intuitive user experience
- **Rich Media Support**: Video player, image galleries, and interactive content

---

## 🛠️ Technologies Used

- **React.js**: Frontend library for building user interfaces
- **Material UI (MUI)**: React component library implementing Google's Material Design
- **React Router**: For navigation and routing
- **Context API**: For state management
- **CSS-in-JS**: Styling with MUI's styling solution

---

## 📥 Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later) or yarn (v1.22.0 or later)
- Visual Studio Code

### Step 1: Clone the Repository

```sh
git clone https://github.com/binduprasad-gs/social-learning-platform-frontend.git
cd social-learning-platform-frontend

```
### Step 2: Install Dependencies

-Using npm:

```sh
npm install

```
#### This will install all required dependencies, including:

- @mui/material
- @mui/icons-material
- @emotion/react
- @emotion/styled
- react-router-dom

### Step 3: Start the Development Server

-Using npm:
```sh
npm run dev

```
-The application will open in your default browser at http://localhost:3000.

---

## 📂 File Structure

```
plaintext
src/
├── components/         # Reusable UI components
│   ├── auth/           # Authentication related components
│   ├── common/         # Common UI elements
│   ├── courses/        # Course related components
│   ├── forum/          # Forum related components
│   └── layout/         # Layout components (header, footer, etc.)
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── CourseContext.jsx # Course data management
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── CoursesPage.jsx
│   ├── CourseDetailsPage.jsx
│   ├── ForumPage.jsx
│   ├── ThreadPage.jsx
│   ├── ProfilePage.jsx
│   ├── ProgressPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── theme.js            # MUI theme customization
├── App.jsx             # Main application component
└── main.jsx            # Entry point
```
---

## 🧩 Key Components

### Enhanced UI Components

-**AnimatedNumber**: Animated counter for statistics
-**FeatureCard**: Stylized cards for displaying features
-**SearchBar**: Advanced search functionality with dropdown results
-**LoadingButton**: Button with loading state
-**NotificationBell**: Notification system with dropdown
-**PageBanner**: Reusable page headers

### Course Components

-**EnhancedCourseCard**: Advanced course card with multiple display variants
-**CourseFilterSidebar**: Comprehensive filtering options for courses

### Forum Components

-**DiscussionEditor**: Rich text editor for forum posts with formatting options