import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, styled, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import recommendedData from "./recommended.json";
import rocknacional from "./Rocknacional.json";
import Favoritos from "./Favoritos";

interface RockNacionalProps {
  mostrarTabla: boolean;
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const RockNacional: React.FunctionComponent<RockNacionalProps> = ({
  mostrarTabla,
  handleSelectSong,
}) => {
  const allSongs = rocknacional.find((songs) => songs.songs);
  const songs = allSongs ? allSongs.songs : [];
  const [verTodasLasCanciones, setVerTodasLasCanciones] = React.useState(false);
  const [showReproductorRock, setShowReproductorRock] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  // Function to format artist names using Intl.ListFormat('es').format
  const formatArtists = (artists: string[]) => {
    const listFormat = new Intl.ListFormat("es", {
      style: "long",
      type: "conjunction",
    });
    return listFormat.format(artists);
  };

  const [favoritos, setFavoritos] = React.useState<string[]>(() => {
    // Recuperar el estado de favoritos del localStorage al cargar el componente
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });

  const handleToggleFavorito = (songName: string) => {
    if (favoritos.includes(songName)) {
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((song) => song !== songName)
      );
    } else {
      setFavoritos((prevFavoritos) => [...prevFavoritos, songName]);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const handlePlayPause = (url: string, song: string, index: number) => {
    handleSelectSong(song, url, index);
    setShowReproductorRock(true);
  };

  if (allSongs) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "5rem",
          marginTop: "2rem",
        }}
      >
        {mostrarTabla ? (
          <TableContainer
            component={Paper}
            sx={{
              width: "80%",
              padding: "0px",
              backgroundColor: "transparent",
              border: "1px solid white",
              "@media screen and (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ color: "white" }}>#</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "white" }}>CANCIONES</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ color: "white" }}>ARTISTA</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography sx={{ color: "white" }}>ALBUM</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Typography sx={{ color: "white" }}>DURACIÓN</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rocknacional[0].songs.map((song, index) => {
                  return verTodasLasCanciones || index < 10 ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ImgIcon
                            width={40}
                            height={40}
                            src={song.icon}
                            alt=""
                          />
                          <Typography
                            sx={{
                              marginLeft: "2rem",
                              marginTop: "0rem",
                              color: "white",
                            }}
                          >
                            {song.number}
                          </Typography>

                          {favoritos.includes(song.songName) ? (
                            <FavoriteIcon
                            color="secondary"
                            sx={{
                              marginLeft: "1.5rem",
                              color: "#ffee04",
                              cursor: "pointer",
                              fontSize: 20,
                            }}
                              onClick={() =>
                                handleToggleFavorito(song.songName)
                              }
                            />
                          ) : (
                            <FavoriteBorderIcon
                            color="secondary"
                            sx={{
                              marginLeft: "1.5rem",
                              color: "#ccc",
                              cursor: "pointer",
                              fontSize: 20,
                            }}
                              onClick={() =>
                                handleToggleFavorito(song.songName)
                              }
                            />
                          )}

                          <PlayCircleOutlineIcon
                             sx={{
                              marginLeft: "2rem",
                              cursor: "pointer",
                              fontSize: 20,
                              color: "white",
                              "&:hover": {
                                color: "#ffee04", // Cambiar el color a tu preferencia cuando el cursor esté sobre el ícono
                              },
                            }}
                            onClick={() =>
                              handlePlayPause(
                                song.song_url,
                                song.songName,
                                index
                              )
                            }
                          />
                          <audio
                            ref={audioRef}
                            controls
                            style={{ display: "none" }}
                          ></audio>
                        </Box>
                      </TableCell>
                      <TableCell align="left" sx={{ color: "white" }}>
                      {song.songName}
                    </TableCell>
                    <TableCell align="left" sx={{ color: "white" }}>
                      {song.artista}
                    </TableCell>
                    <TableCell align="left" sx={{ color: "white" }}>
                      {song.album}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {song.duration}
                    </TableCell>
                    </TableRow>
                  ) : null;
                })}
              </TableBody>
            </Table>

            <ContainerButton>
              {songs.length > 5 ? (
                <StyledButton
                  onClick={() => setVerTodasLasCanciones(!verTodasLasCanciones)}
                  sx={{ marginTop: "1rem" }}
                >
                  {verTodasLasCanciones ? (
                    <Typography sx={{ letterSpacing: "0.2rem" }}>
                      Mostrar menos
                      <KeyboardArrowUpIcon
                        sx={{
                          position: "absolute",
                          marginLeft: "0.5rem",
                          marginTop: "-0.1rem",
                          fontSize: 25,
                        }}
                      />
                    </Typography>
                  ) : (
                    <Typography sx={{ letterSpacing: "0.2rem" }}>
                      Mostrar más
                      <KeyboardArrowDownIcon
                        sx={{
                          position: "absolute",
                          marginLeft: "0.5rem",
                          marginTop: "-0.1rem",
                          fontSize: 25,
                        }}
                      />
                    </Typography>
                  )}
                </StyledButton>
              ) : null}
            </ContainerButton>
          </TableContainer>
        ) : null}
      </Box>
    );
  } else {
    return null;
  }
};

export default RockNacional;

const ImgIcon = styled("img")(() => ({}));

const StyledButton = styled(Button)(() => ({
  color: "#fff",
  ":hover": {
    backgroundColor: "transparent",
  },
}));

const ContainerButton = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "5rem",
}));

const Container = styled("div")(() => ({
  marginBottom: "10rem",
}));
