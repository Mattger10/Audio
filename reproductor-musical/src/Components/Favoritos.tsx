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
import rocknacional from "./Rocknacional.json";
import recommended from "./recommended.json";
import artistas from "./artists.json";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

export interface CancionFavorita {
  songName: string;
  song_url: string;
  icon?: string; // Haz que la propiedad 'icon' sea opcional
  artists_evolved: string[];
  album: string; // Agrega aquí cualquier otra información que necesites para el reproductor
  number: string;
  duration: string;
}

interface FavoritosProps {
  mostrarTabla: boolean;
  handleSelect: (song: string) => void;
}

const Favoritos: React.FunctionComponent<FavoritosProps> = ({
  handleSelect,
  mostrarTabla,
}) => {
  const [selectedSong, setSelectedSong] = React.useState<string | null>(null);
  const [favoritos, setFavoritos] = React.useState<string[]>(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const allSongs = [
    ...rocknacional[0].songs,
    ...recommended[0].songs,
    ...artistas.flatMap((artista) => artista.songs),
  ];

  const cancionesFavoritas = allSongs.filter((song) =>
    favoritos.includes(song.songName)
  );

  const handleToggleFavorito = (songName: string) => {
    if (favoritos.includes(songName)) {
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((song) => song !== songName)
      );
    } else {
      setFavoritos((prevFavoritos) => [...prevFavoritos, songName]);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  };

  React.useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const [mostrarReproductorFavoritos, setMostrarReproductorFavoritos] =
    React.useState(false);

  const handlePlayPause = (song: string) => {
    handleSelect(song);
    setMostrarReproductorFavoritos(true);
  };

  const handleCloseReproductor = () => {
    setMostrarReproductorFavoritos(false);
  };

  if (cancionesFavoritas.length === 0) {
    return (
      <Typography
        sx={{
          color: "white",
          fontSize: "38px",
          marginTop: "20rem",
          fontFamily: "font2",
        }}
      >
        No hay favoritos seleccionados
        <HeartBrokenIcon
          sx={{
            position: "absolute",
            fontSize: "38px",
            marginTop: "0.6rem",
            marginLeft: "1rem",
            color: "#ed215e",
          }}
        />
      </Typography>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "5rem",
          marginTop: "2rem",
        }}
      >
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
              {cancionesFavoritas.map((song, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ImgIcon width={40} height={40} src={song.icon} alt="" />
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
                          onClick={() => handleToggleFavorito(song.songName)}
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
                          onClick={() => handleToggleFavorito(song.songName)}
                        />
                      )}
                      <PlayCircleOutlineIcon
                        onClick={() => handlePlayPause(song.song_url)}
                        sx={{
                          marginLeft: "2rem",
                          cursor: "pointer",
                          fontSize: 20,
                          color: "white",
                          "&:hover": {
                            color: "#ffee04", // Cambiar el color a tu preferencia cuando el cursor esté sobre el ícono
                          },
                        }}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};

export default Favoritos;

const ImgIcon = styled("img")(() => ({}));
