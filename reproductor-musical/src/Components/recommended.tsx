import * as React from "react";
import { Typography, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import recommendedData from "./recommended.json";
import styled from "styled-components";

interface RecommendedProps {
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const Recommended: React.FunctionComponent<RecommendedProps> = ({
  handleSelectSong,
}) => {
  const allSongs = recommendedData.find((songs) => songs.songs);
  // const songs = allSongs ? allSongs.songs : [];
  const [verTodasLasCanciones, setVerTodasLasCanciones] = React.useState(false);
  const [, setShowReproductor] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  // Function to format artist names using Intl.ListFormat('es').format
  

  const [favoritos, setFavoritos] = React.useState<string[]>(() => {
    // Recuperar el estado de favoritos del localStorage al cargar el componente
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });

  // const getShareUrl = (song: string) => {
  //   // Aquí debes obtener la URL de la canción según la lógica de tu aplicación.
  //   // Por ejemplo, si las canciones tienen una URL guardada en el objeto `song`, puedes hacer:
  //   const selectedSong = songs.find((item) => item.songName === song);
  //   return selectedSong ? selectedSong.song_url : "";
  // };

  // const handleShareOnWhatsApp = (song: string) => {
  //   const urlToShare = getShareUrl(song);
  //   if (urlToShare) {
  //     const textToShare = `Escucha esta canción: ${urlToShare}`;
  //     const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
  //       textToShare
  //     )}`;
  //     window.open(whatsappShareUrl, "_blank");
  //   }
  // };

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
    // Guardar el estado de favoritos en el localStorage al actualizarlo
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const handlePlayPause = (url: string, song: string, index: number) => {
    handleSelectSong(song, url, index);
    setShowReproductor(true);
  };

  if (allSongs) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "5rem",
          marginTop: "0rem",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "70%",
            "@media (max-width: 768px)": {
              width: "100%", //
            },
          }}
        >
          {recommendedData[0].songs.map((song, index) => {
            return verTodasLasCanciones || index < 10 ? (
              <StyledList key={index}>
                <StyledListItem key={index}>
                  <StyledImage src={song.icon} alt="" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between", // Agregamos esto para colocar el icono a la derecha
                      alignItems: "center", // Mantenemos la alineación vertical al centro
                      width: "90%", // Establecemos el ancho completo para ocupar toda la fila
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "10px", paddingBottom: "10px" }}>
                      <Typography
                        sx={{
                          color: "#ccc",
                          fontSize: "25px",
                          "@media screen and (max-width: 768px)": {
                            fontSize: "14px",
                          },
                        }}
                      >
                        {song.songName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#ccc",
                          fontSize: "15px",
                          
                          "@media screen and (max-width: 768px)": {
                            fontSize: "10px",
                          },
                        }}
                      >
                        {song.artista}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {favoritos.includes(song.songName) ? (
                        <FavoriteIcon
                          color="secondary"
                          sx={{
                            marginLeft: "1.5rem",
                            color: "#ffee04",
                            cursor: "pointer",
                            fontSize: "35px",
                            "@media (max-width: 768px)": {
                              fontSize: "25px",
                            },
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
                            fontSize: "35px",
                            "@media (max-width: 768px)": {
                              fontSize: "25px",
                            },
                          }}
                          onClick={() => handleToggleFavorito(song.songName)}
                        />
                      )}
                      <PlayCircleOutlineIcon
                        onClick={() =>
                          handlePlayPause(song.song_url, song.songName, index)
                        }
                        sx={{
                          marginLeft: "2rem",
                          cursor: "pointer",
                          fontSize: "35px",
                          color: "white",
                          "&:hover": {
                            color: "#ffee04", // Cambiar el color a tu preferencia cuando el cursor esté sobre el ícono
                          },
                          "@media (max-width: 768px)": {
                            fontSize: "25px",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <audio
                    ref={audioRef}
                    controls
                    style={{ display: "none" }}
                  ></audio>
                </StyledListItem>
              </StyledList>
            ) : null;
          })}
          <ContainerButton>
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
          </ContainerButton>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default Recommended;

const StyledImage = styled.img`
  width: 50px;
  height: 50px; /* Ajusta el valor según sea necesario */
  margin-right: 30px; /* Espacio entre la imagen y el texto */
  border-radius: 5px; 
  @media screen and (max-width: 768px) {
    width: 35px;
  height: 35px; /* Ajusta el valor según sea necesario */
  },
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar elementos horizontalmente */
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding: 20px; /* Ajusta el valor según sea necesario */
  padding-left: 30px;
  border: 1px solid #ccc;
  border-radius: 20px; 
  
  @media screen and (max-width: 768px) {
    width: 85%;
    padding-left: 10px;
    height: 1rem;
  },
`;

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
