"use client"

import React, { useState } from "react"
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Divider,
  Button,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material"
import { Notifications, School, Forum, Star, CheckCircle, Event } from "@mui/icons-material"

const NotificationBell = ({ count = 5 }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const open = Boolean(anchorEl)
  const id = open ? "notifications-popover" : undefined

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "course",
      title: "New lesson available",
      message: 'A new lesson has been added to "Introduction to React"',
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "forum",
      title: "New reply to your discussion",
      message: "Sarah Johnson replied to your question about React Hooks",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "achievement",
      title: "Badge earned!",
      message: 'You earned the "Fast Learner" badge',
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "course",
      title: "Course completed",
      message: 'Congratulations! You completed "UI/UX Design Principles"',
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "event",
      title: "Upcoming live session",
      message: "Don't miss the live Q&A session tomorrow at 3 PM",
      time: "1 day ago",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <School />
      case "forum":
        return <Forum />
      case "achievement":
        return <Star />
      case "event":
        return <Event />
      default:
        return <Notifications />
    }
  }

  const getColor = (type) => {
    switch (type) {
      case "course":
        return theme.palette.primary.main
      case "forum":
        return theme.palette.secondary.main
      case "achievement":
        return theme.palette.warning.main
      case "event":
        return theme.palette.info.main
      default:
        return theme.palette.grey[500]
    }
  }

  const filteredNotifications =
    activeTab === 0
      ? notifications
      : activeTab === 1
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.read)

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick} size="large" color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
            borderRadius: 2,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Tab label="All" />
          <Tab
            label="Unread"
            icon={unreadCount > 0 ? <Badge badgeContent={unreadCount} color="error" sx={{ mr: 1 }} /> : null}
            iconPosition="start"
          />
          <Tab label="Read" />
        </Tabs>

        {filteredNotifications.length > 0 ? (
          <>
            <List sx={{ p: 0 }}>
              {filteredNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      px: 2,
                      py: 1.5,
                      backgroundColor: notification.read ? "transparent" : alpha(theme.palette.primary.main, 0.04),
                      transition: "background-color 0.2s",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ bgcolor: alpha(getColor(notification.type), 0.1), color: getColor(notification.type) }}
                      >
                        {getIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="subtitle2" component="span">
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: "error.main",
                                ml: 1,
                              }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span" color="text.primary" sx={{ display: "block" }}>
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < filteredNotifications.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, textAlign: "center" }}>
              <Button variant="text" fullWidth>
                View All Notifications
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CheckCircle sx={{ fontSize: 48, color: "success.main", mb: 2, opacity: 0.7 }} />
            <Typography variant="h6" gutterBottom>
              All caught up!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You have no {activeTab === 1 ? "unread" : "read"} notifications.
            </Typography>
          </Box>
        )}
      </Popover>
    </>
  )
}

export default NotificationBell

