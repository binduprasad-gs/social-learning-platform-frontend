import { Button, CircularProgress, Box } from "@mui/material"

const LoadingButton = ({
  loading = false,
  loadingText = "Please wait...",
  children,
  disabled,
  startIcon,
  ...props
}) => {
  return (
    <Button disabled={loading || disabled} startIcon={loading ? null : startIcon} {...props}>
      {loading ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
          {loadingText || children}
        </Box>
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton

