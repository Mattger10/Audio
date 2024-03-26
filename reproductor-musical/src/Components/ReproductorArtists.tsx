import React, { useState, useRef, useEffect } from "react";
import { Box, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Slider from "@mui/material/Slider";
import artists from "./artists.json";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";


interface ReproductorArtistsProps {
  seleccionar: string;

}

interface Song {
  name: string;
  number: string;
  duration: string;
  artists_evolved: string[];
  album: string;
  song_url: string;
  icon?: string;
}

const ReproductorArtists: FunctionComponent<ReproductorArtistsProps> = ({
  seleccionar,

}) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [autoPlayNext, setAutoPlayNext] = useState(false);
  const songs = artists.flatMap((cancion) => cancion.songs);
  const findSelectedSongIndex = (songName: string): number => {
    return songs.findIndex((song) => song.songName === songName);
  };

  const [, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isRepeatMode, setIsRepeatMode] = useState(false);
  const [isShuffleMode, setIsShuffleMode] = useState(false);
  const [, setCurrentRandomIndex] = useState(-1);
  const [currentArtist, setCurrentArtist] = useState<string>("");
  const [, setCurrentSongData1] =
    useState<Partial<Song> | null>(null);



  useEffect(() => {
    if (seleccionar) {
      playSelectedSong(seleccionar);
      const selectedSongData = songs.find(
        (song) => song.songName === seleccionar
      );
      if (selectedSongData) {
        setCurrentArtist(selectedSongData.artists_evolved.join(", "));
      }
    }
  }, [seleccionar]);


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setCurrentTime(currentTime);
      setDuration(duration);
      const progressValue = (currentTime / duration) * 100;
      setSliderValue(progressValue);
      if (currentTime >= duration - 1) {
        playNextSong();
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  const playNextSong = () => {
    if (isShuffleMode) {
      playRandomSong();
    } else if (isRepeatMode) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      const currentSongData = songs[currentSongIndex];
      if (currentSongData) {
        let nextSongIndex = -1;
        for (
          let i = currentSongIndex + 1;
          i < currentSongIndex + songs.length;
          i++
        ) {
          const nextIndex = i % songs.length;
          const nextSong = songs[nextIndex];
          if (
            nextSong.artists_evolved.join(", ") ===
            currentSongData.artists_evolved.join(", ")
          ) {
            nextSongIndex = nextIndex;
            break;
          }
        }
        if (nextSongIndex !== -1) {
          setCurrentSongIndex(nextSongIndex);
          setAutoPlayNext(true);
        }
      }
    }
  };

  const playPreviousSong = () => {
    const currentSongData = songs[currentSongIndex];
    if (currentSongData) {
      let prevSongIndex = -1;
      for (
        let i = currentSongIndex - 1 + songs.length;
        i > currentSongIndex - songs.length;
        i--
      ) {
        const prevIndex = i % songs.length;
        const prevSong = songs[prevIndex];
        if (
          prevSong.artists_evolved.join(", ") ===
          currentSongData.artists_evolved.join(", ")
        ) {
          prevSongIndex = prevIndex;
          break;
        }
      }

      if (prevSongIndex !== -1) {
        setCurrentSongIndex(prevSongIndex);
        setAutoPlayNext(true);
      }
    }
  };

  const handleSongEnd = () => {
    playNextSong();
  };

  useEffect(() => {
    setIsPlaying(autoPlayNext);
  }, [autoPlayNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, isPlaying]);

  const playSelectedSong = (songName: string) => {
    const selectedSongIndex = findSelectedSongIndex(songName);
    setCurrentSongIndex(selectedSongIndex);
    setAutoPlayNext(true);
  };

  useEffect(() => {
    if (seleccionar) {
      playSelectedSong(seleccionar);
    }
  }, [seleccionar]);



  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = progressBarRef.current;
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const progressBarWidth = rect.width;
      const clickX = e.clientX - rect.left;
      const percentage = (clickX / progressBarWidth) * 100;
      const currentTime = (duration * percentage) / 100;

      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime);
      setSliderValue(percentage);
    }
  };

  const playRandomSong = () => {
    const currentArtistSongs = songs.filter(
      (song) => song.artists_evolved.join(", ") === currentArtist
    );
    if (currentArtistSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentArtistSongs.length);
      setCurrentSongData1(currentArtistSongs[randomIndex]);
      setCurrentSongIndex(songs.indexOf(currentArtistSongs[randomIndex]));
      setAutoPlayNext(true);
    }
  };

  const [isVisible, setIsVisible] = useState(true); // Nuevo estado para controlar la visibilidad

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const currentSongData = songs[currentSongIndex];

  if (currentSongData) {
    return (
      <Box  >
        
        {isVisible && (
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              height: "100%",
              top: "0%",
              left: "0%",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                position: "fixed",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Img
                src={currentSongData.icon}
                alt={currentSongData.artista}
               
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="white"
                  fontWeight={500}
                  sx={{ fontSize: "25px" }}
                >
                  {currentSongData.artista}{" "}
                  {/* Muestra el nombre del artista */}
                </Typography>
                <Typography noWrap sx={{ color: "#ffee04", fontSize: "20px" }}>
                  <b>{currentSongData.songName}</b>{" "}
                  {/* Muestra el nombre de la canción */}
                </Typography>
                <Typography
                  noWrap
                  letterSpacing={-0.25}
                  sx={{ color: "white" }}
                >
                  {currentSongData.album} {/* Muestra el nombre del álbum */}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Box
       onClick={handleToggleVisibility}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <Widget sx={{ width: "auto",}} >
            {currentSongData && (
              <Slider
                aria-label="time-indicator"
                size="small"
                ref={progressBarRef}
                value={sliderValue}
                onClick={handleProgressBarClick}
                sx={{
                  color: "#ffee04",
                  height: 4,
                  width: "100%",
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,

                    "&::before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {},
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: -1,
              }}
            >
              <IconButton>
                <RepeatIcon
                  onClick={() => setIsRepeatMode((prevMode) => !prevMode)}
                  fontSize="large"
                  sx={{ color: isRepeatMode ? "#ed215e" : "#fff" }}
                />
              </IconButton>

              <IconButton aria-label="previous song">
                <SkipPreviousIcon
                  onClick={playPreviousSong}
                  fontSize="large"
                  sx={{ color: "#ffee04" }}
                />
              </IconButton>
              <IconButton aria-label="toggle play">
                {isPlaying ? (
                  <PauseRounded
                    onClick={togglePlay}
                    sx={{ fontSize: "3rem", color: "#ffee04" }}
                  />
                ) : (
                  <PlayArrowRounded
                    onClick={togglePlay}
                    sx={{ fontSize: "3rem", color: "#ffee04" }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="next song">
                <SkipNextIcon
                  fontSize="large"
                  onClick={playNextSong}
                  sx={{ color: "#ffee04" }}
                />
              </IconButton>
              <IconButton>
                <ShuffleIcon
                  fontSize="large"
                  onClick={() => {
                    if (isShuffleMode) {
                      setIsShuffleMode(false);
                      setCurrentRandomIndex(-1);
                    } else {
                      setIsShuffleMode(true);
                    }
                  }}
                  sx={{ color: isShuffleMode ? "#ed215e" : "#ccc" }}
                />
              </IconButton>
            </Box>
            <audio
              ref={audioRef}
              src={currentSongData?.song_url || ""}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleSongEnd}
            />
          </Widget>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default ReproductorArtists;

const Widget = styled("div")(() => ({
  padding: 16,
  borderRadius: 0,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor: "transparent",
  backdropFilter: "blur(40px)",
}));

const Img = styled("img")(() => ({
  width: "500px",
  height: "500px",
  "@media (max-width: 768px)": {
    width: "250px", 
    height: "250px",
  },
}));
