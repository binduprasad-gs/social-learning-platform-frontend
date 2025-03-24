"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material"
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Link as LinkIcon,
  Image,
  AttachFile,
  InsertEmoticon,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatColorText,
  FormatColorFill,
  TableChart,
} from "@mui/icons-material"

const DiscussionEditor = ({
  initialValue = "",
  placeholder = "Write your post here...",
  minHeight = 200,
  onSubmit,
  submitLabel = "Post",
  cancelLabel = "Cancel",
  onCancel,
  ...props
}) => {
  const theme = useTheme()
  const [content, setContent] = useState(initialValue)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null)
  const [bgColorMenuAnchor, setBgColorMenuAnchor] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit && content.trim()) {
      onSubmit(content)
    }
  }

  const handleFormatting = (format) => {
    const textarea = document.getElementById("discussion-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""
    let cursorPosition = 0

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        cursorPosition = start + 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        cursorPosition = start + 1
        break
      case "underline":
        formattedText = `__${selectedText}__`
        cursorPosition = start + 2
        break
      case "bullet":
        formattedText = selectedText
          .split("\n")
          .map((line) => `• ${line}`)
          .join("\n")
        cursorPosition = start + 2
        break
      case "number":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        cursorPosition = start + 3
        break
      case "quote":
        formattedText = `> ${selectedText.split("\n").join("\n> ")}`
        cursorPosition = start + 2
        break
      case "code":
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``
        cursorPosition = start + 4
        break
      case "link":
        setLinkDialogOpen(true)
        return
      case "image":
        setImageDialogOpen(true)
        return
      case "align-left":
        formattedText = `<div style="text-align: left">${selectedText}</div>`
        cursorPosition = start + 30
        break
      case "align-center":
        formattedText = `<div style="text-align: center">${selectedText}</div>`
        cursorPosition = start + 32
        break
      case "align-right":
        formattedText = `<div style="text-align: right">${selectedText}</div>`
        cursorPosition = start + 31
        break
      case "table":
        formattedText = `| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Cell 1 | Cell 2 | Cell 3 |\n| Cell 4 | Cell 5 | Cell 6 |`
        cursorPosition = start
        break
      default:
        formattedText = selectedText
        cursorPosition = start
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        textarea.selectionStart = start
        textarea.selectionEnd = start + formattedText.length
      } else {
        textarea.selectionStart = cursorPosition
        textarea.selectionEnd = cursorPosition
      }
    }, 0)
  }

  const handleInsertLink = () => {
    const textarea = document.getElementById("discussion-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const linkMarkdown = `[${linkText || selectedText || "link text"}](${linkUrl})`
    const newContent = content.substring(0, start) + linkMarkdown + content.substring(end)

    setContent(newContent)
    setLinkDialogOpen(false)
    setLinkUrl("")
    setLinkText("")

    // Set cursor position after inserting link
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + linkMarkdown.length
      textarea.selectionEnd = start + linkMarkdown.length
    }, 0)
  }

  const handleInsertImage = () => {
    const textarea = document.getElementById("discussion-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const imageMarkdown = `![${imageAlt || "image"}](${imageUrl})`
    const newContent = content.substring(0, start) + imageMarkdown + content.substring(end)

    setContent(newContent)
    setImageDialogOpen(false)
    setImageUrl("")
    setImageAlt("")

    // Set cursor position after inserting image
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + imageMarkdown.length
      textarea.selectionEnd = start + imageMarkdown.length
    }, 0)
  }

  const handleColorClick = (event) => {
    setColorMenuAnchor(event.currentTarget)
  }

  const handleColorClose = () => {
    setColorMenuAnchor(null)
  }

  const handleBgColorClick = (event) => {
    setBgColorMenuAnchor(event.currentTarget)
  }

  const handleBgColorClose = () => {
    setBgColorMenuAnchor(null)
  }

  const handleColorSelect = (color) => {
    const textarea = document.getElementById("discussion-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const coloredText = `<span style="color: ${color}">${selectedText}</span>`
    const newContent = content.substring(0, start) + coloredText + content.substring(end)

    setContent(newContent)
    handleColorClose()

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start
      textarea.selectionEnd = start + coloredText.length
    }, 0)
  }

  const handleBgColorSelect = (color) => {
    const textarea = document.getElementById("discussion-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const bgColoredText = `<span style="background-color: ${color}">${selectedText}</span>`
    const newContent = content.substring(0, start) + bgColoredText + content.substring(end)

    setContent(newContent)
    handleBgColorClose()

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start
      textarea.selectionEnd = start + bgColoredText.length
    }, 0)
  }

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ]

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        ...props.sx,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {props.title || "Create Post"}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box component="form" onSubmit={handleSubmit}>
        {/* Formatting Toolbar */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            p: 1,
            mb: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Tooltip title="Bold">
            <IconButton size="small" onClick={() => handleFormatting("bold")}>
              <FormatBold fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Italic">
            <IconButton size="small" onClick={() => handleFormatting("italic")}>
              <FormatItalic fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Underline">
            <IconButton size="small" onClick={() => handleFormatting("underline")}>
              <FormatUnderlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Bullet List">
            <IconButton size="small" onClick={() => handleFormatting("bullet")}>
              <FormatListBulleted fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Numbered List">
            <IconButton size="small" onClick={() => handleFormatting("number")}>
              <FormatListNumbered fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Quote">
            <IconButton size="small" onClick={() => handleFormatting("quote")}>
              <FormatQuote fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Code Block">
            <IconButton size="small" onClick={() => handleFormatting("code")}>
              <Code fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Align Left">
            <IconButton size="small" onClick={() => handleFormatting("align-left")}>
              <FormatAlignLeft fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Center">
            <IconButton size="small" onClick={() => handleFormatting("align-center")}>
              <FormatAlignCenter fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Right">
            <IconButton size="small" onClick={() => handleFormatting("align-right")}>
              <FormatAlignRight fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Text Color">
            <IconButton size="small" onClick={handleColorClick}>
              <FormatColorText fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Background Color">
            <IconButton size="small" onClick={handleBgColorClick}>
              <FormatColorFill fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Insert Link">
            <IconButton size="small" onClick={() => handleFormatting("link")}>
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Image">
            <IconButton size="small" onClick={() => handleFormatting("image")}>
              <Image fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Attach File">
            <IconButton size="small">
              <AttachFile fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Table">
            <IconButton size="small" onClick={() => handleFormatting("table")}>
              <TableChart fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Emoji">
            <IconButton size="small">
              <InsertEmoticon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Paper>

        {/* Text Editor */}
        <TextField
          id="discussion-editor"
          multiline
          fullWidth
          minRows={8}
          maxRows={20}
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: theme.shape.borderRadius,
              transition: "border-color 0.2s",
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": {
              minHeight: minHeight,
              fontFamily: "inherit",
              lineHeight: 1.6,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
          {onCancel && (
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={!content.trim()}>
            {submitLabel}
          </Button>
        </Box>
      </Box>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Link Text (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertLink} color="primary" disabled={!linkUrl}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Alt Text (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertImage} color="primary" disabled={!imageUrl}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Color Menu */}
      <Menu anchorEl={colorMenuAnchor} open={Boolean(colorMenuAnchor)} onClose={handleColorClose}>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: 224, p: 1 }}>
          {colors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 24,
                height: 24,
                m: 0.5,
                bgcolor: color,
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </Box>
      </Menu>

      {/* Background Color Menu */}
      <Menu anchorEl={bgColorMenuAnchor} open={Boolean(bgColorMenuAnchor)} onClose={handleBgColorClose}>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: 224, p: 1 }}>
          {colors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 24,
                height: 24,
                m: 0.5,
                bgcolor: color,
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => handleBgColorSelect(color)}
            />
          ))}
        </Box>
      </Menu>
    </Paper>
  )
}

export default DiscussionEditor

