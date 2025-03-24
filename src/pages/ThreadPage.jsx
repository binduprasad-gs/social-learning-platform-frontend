"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Paper,
  Divider,
  Chip,
  IconButton,
  Container,
  Breadcrumbs,
  Link,
  Alert,
} from "@mui/material"
import { ThumbUp, ThumbDown, Reply, Bookmark, BookmarkBorder, ArrowBack } from "@mui/icons-material"
import { useCourses } from "../contexts/CourseContext"
import { useAuth } from "../contexts/AuthContext"

const ThreadPage = () => {
  const { threadId } = useParams()
  const navigate = useNavigate()
  const { getForumThread, getForumCategory } = useCourses()
  const { currentUser } = useAuth()

  const thread = getForumThread(threadId)

  const [replyText, setReplyText] = useState("")
  const [bookmarked, setBookmarked] = useState(false)

  if (!thread) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h5">Thread not found</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/forum")}>
            Back to Forum
          </Button>
        </Box>
      </Container>
    )
  }

  const category = getForumCategory(thread.categoryId)

  const handleSubmitReply = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return

    // In a real app, this would send the reply to the server
    alert("Reply submitted: " + replyText)
    setReplyText("")
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/forum")} sx={{ mb: 2 }}>
          Back to Forum
        </Button>

        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate("/forum")
            }}
          >
            Forum
          </Link>
          {category && (
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/forum/category/${category.id}`)
              }}
            >
              {category.title}
            </Link>
          )}
          <Typography color="text.primary">{thread.title}</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={thread.authorAvatar} alt={thread.author} sx={{ width: 48, height: 48, mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">{thread.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Posted on {thread.date}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setBookmarked(!bookmarked)}>
              {bookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
            </IconButton>
          </Box>

          <Typography variant="h5" gutterBottom>
            {thread.title}
          </Typography>

          <Typography variant="body1" paragraph>
            {thread.content}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
            <Box>
              <Chip label={category ? category.title : "General"} size="small" color="primary" sx={{ mr: 1 }} />
              <Chip label={`${thread.views} views`} size="small" variant="outlined" />
            </Box>
            <Box>
              <IconButton size="small">
                <ThumbUp fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <ThumbDown fontSize="small" />
              </IconButton>
              <Button startIcon={<Reply />} size="small" onClick={() => document.getElementById("reply-box").focus()}>
                Reply
              </Button>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h6" gutterBottom>
          {thread.comments.length} Replies
        </Typography>

        {thread.comments.map((comment) => (
          <Paper key={comment.id} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Avatar src={comment.authorAvatar} alt={comment.author} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2">{comment.author}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.date}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {comment.content}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  <IconButton size="small">
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ThumbDown fontSize="small" />
                  </IconButton>
                  <Button startIcon={<Reply />} size="small">
                    Reply
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}

        <Divider sx={{ my: 4 }} />

        {currentUser ? (
          <Box component="form" onSubmit={handleSubmitReply}>
            <Typography variant="h6" gutterBottom>
              Add Your Reply
            </Typography>
            <TextField
              id="reply-box"
              fullWidth
              multiline
              rows={4}
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" disabled={!replyText.trim()}>
              Post Reply
            </Button>
          </Box>
        ) : (
          <Alert severity="info">
            Please{" "}
            <Link
              href="/login"
              onClick={(e) => {
                e.preventDefault()
                navigate("/login")
              }}
            >
              log in
            </Link>{" "}
            to reply to this discussion.
          </Alert>
        )}
      </Box>
    </Container>
  )
}

export default ThreadPage

