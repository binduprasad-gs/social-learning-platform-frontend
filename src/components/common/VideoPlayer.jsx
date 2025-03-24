"use client"

import { useState, useRef, useEffect } from "react"
import { Box, IconButton, Slider, Typography, Paper, Stack, useTheme, alpha } from "@mui/material"
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  FullscreenRounded,
  Forward10,
  Replay10,
  ClosedCaption,
  ClosedCaptionDisabled,
  Speed,
} from "@mui/icons-material"

const VideoPlayer = ({
  src,
  poster,
  title,
  autoPlay = false,
  controls = true,
  width = "100%",
  height = "auto",
  ...props
}) => {
  const theme = useTheme()
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [captionsEnabled, setCaptionsEnabled] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showPlaybackRates, setShowPlaybackRates] = useState(false)

  const hideControlsTimer = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onEnded = () => {
      setPlaying(false)
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  useEffect(() => {
    if (autoPlay) {
      handlePlay()
    }
  }, [autoPlay])

  const handlePlay = () => {
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleSeek = (event, newValue) => {
    videoRef.current.currentTime = newValue
    setCurrentTime(newValue)
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue)
    videoRef.current.volume = newValue
    setMuted(newValue === 0)
  }

  const handleMute = () => {
    setMuted(!muted)
    videoRef.current.muted = !muted
  }

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen()
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
    }

    if (playing) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const handleMouseLeave = () => {
    if (playing) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 1000)
    }
  }

  const handleSkip = (seconds) => {
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration))
  }

  const handleCaptionsToggle = () => {
    setCaptionsEnabled(!captionsEnabled)
  }

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate)
    videoRef.current.playbackRate = rate
    setShowPlaybackRates(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width,
        height,
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        bgcolor: "black",
        ...props.sx,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width="100%"
        height="100%"
        onClick={handlePlay}
        style={{ display: "block" }}
      />

      {controls && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2,
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            transition: "opacity 0.3s",
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
          }}
        >
          {title && (
            <Typography
              variant="subtitle1"
              color="white"
              sx={{
                position: "absolute",
                top: -40,
                left: 16,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </Typography>
          )}

          <Slider
            value={currentTime}
            max={duration || 100}
            onChange={handleSeek}
            aria-label="video progress"
            sx={{
              color: theme.palette.primary.main,
              height: 4,
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                transition: "0.2s",
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                },
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handlePlay} size="small" sx={{ color: "white" }}>
                {playing ? <Pause /> : <PlayArrow />}
              </IconButton>

              <IconButton onClick={() => handleSkip(-10)} size="small" sx={{ color: "white" }}>
                <Replay10 />
              </IconButton>

              <IconButton onClick={() => handleSkip(10)} size="small" sx={{ color: "white" }}>
                <Forward10 />
              </IconButton>

              <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  size="small"
                  sx={{ color: "white" }}
                >
                  {muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
                </IconButton>

                <Box
                  sx={{
                    width: showVolumeSlider ? 80 : 0,
                    overflow: "hidden",
                    transition: "width 0.2s",
                    ml: showVolumeSlider ? 1 : 0,
                  }}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <Slider
                    value={muted ? 0 : volume}
                    max={1}
                    step={0.01}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                    sx={{
                      color: "white",
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 10,
                        height: 10,
                        backgroundColor: "#fff",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${alpha("#fff", 0.16)}`,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              <Typography variant="caption" color="white" sx={{ ml: 2 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  size="small"
                  sx={{ color: "white" }}
                  onClick={() => setShowPlaybackRates(!showPlaybackRates)}
                >
                  <Speed />
                </IconButton>

                {showPlaybackRates && (
                  <Paper
                    sx={{
                      position: "absolute",
                      bottom: 40,
                      right: 0,
                      p: 1,
                      borderRadius: 1,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <Box
                        key={rate}
                        sx={{
                          px: 2,
                          py: 0.5,
                          cursor: "pointer",
                          bgcolor: playbackRate === rate ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          },
                          borderRadius: 1,
                        }}
                        onClick={() => handlePlaybackRateChange(rate)}
                      >
                        <Typography variant="body2">{rate === 1 ? "Normal" : `${rate}x`}</Typography>
                      </Box>
                    ))}
                  </Paper>
                )}
              </Box>

              <IconButton onClick={handleCaptionsToggle} size="small" sx={{ color: "white" }}>
                {captionsEnabled ? <ClosedCaption /> : <ClosedCaptionDisabled />}
              </IconButton>

              <IconButton onClick={handleFullScreen} size="small" sx={{ color: "white" }}>
                <FullscreenRounded />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Play/Pause overlay button */}
      {!playing && (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: alpha(theme.palette.common.black, 0.5),
            color: "white",
            "&:hover": {
              backgroundColor: alpha(theme.palette.common.black, 0.7),
            },
            width: 64,
            height: 64,
          }}
          onClick={handlePlay}
        >
          <PlayArrow sx={{ fontSize: 36 }} />
        </IconButton>
      )}
    </Box>
  )
}

export default VideoPlayer

