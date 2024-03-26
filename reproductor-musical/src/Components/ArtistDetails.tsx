import  { FunctionComponent} from "react";
import { useParams } from "react-router-dom";
import artistas from "./artists.json";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MusicTable from "./music-table";

interface Song {
  songName: string;
  duration: string;
  number: string;
  artists_evolved: string[];
  artista: string;
  icon: string;
  album: string;
  song_url: string;
}

interface ArtistasDetailsProps {
  onPlaySong: (song: Song) => void;
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const ArtistasDetails: FunctionComponent<ArtistasDetailsProps> = ({
  handleSelectSong,
}) => {
  const { id } = useParams<{ id: string }>();
  const artistaIndex = parseInt(id || "0"); // Si id es undefined, se asigna "0" como valor predeterminado
  const artista = artistas[artistaIndex];



  return (
    <div>
      <Container>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            justifyContent: "center",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Img src={artista.photo_url} alt="" />
        </Box>
        <Content>
          <Box sx={{ display: "flex", textAlign: "center" }}>
            <Typography
              color="#ffee04"
              sx={{
                fontSize: "46px",
                fontWeight: 500,
                wordWrap: "break-word", // Para permitir el salto de palabras largas
                overflowWrap: "break-word", // Para forzar el salto de palabras largas
                "@media screen and (max-width: 768px)": {
                  fontSize: "25px",
                },
              }}
            >
              {artista.name}
            </Typography>
          </Box>
          <Typography
            color="#545864"
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              wordWrap: "break-word", // Para permitir el salto de palabras largas
              overflowWrap: "break-word", // Para forzar el salto de palabras largas
              "@media screen and (max-width: 768px)": {
                fontSize: "25px",
              },
            }}
          >
            {artista.genre.join(", ")}
          </Typography>
          <Typography
            color="white"
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "start",
              mt: 2,
              fontSize: "16px",
              marginBottom: "50px",
              padding: "10px",
              "@media screen and (max-width: 768px)": {
                fontSize: "20px",
              },
            }}
          >
            {artista.bio}
          </Typography>
          <ButtonContainer>
            <Button
              variant="contained"
              sx={{
                border: "2px solid #ffee04",
                backgroundColor: "#ffee04",
                color: "black",
                padding: "4px 30px 4px 30px",
                borderRadius: "30px",
                ":hover": {
                  backgroundColor: "#ffee04",
                  boxShadow: "1px 1px 10px 2px #black",
                },
              }}
            >
              <VolumeUpIcon
                fontSize="small"
                sx={{ marginRight: "10px", marginLeft: "-0.5rem" }}
              />
              PLAY ALL
            </Button>

            <Button
              variant="contained"
              sx={{
                border: "2px solid #ffee04",
                backgroundColor: "#ffee04",
                color: "black",
                padding: "5px 5px 5px 5px",
                borderRadius: "50px",
                borderRadiusTop: "30px",
                ":hover": {
                  backgroundColor: "#ffee04",
                  boxShadow: "1px 1px 10px 2px #black",
                },
              }}
            >
              <FavoriteBorderIcon />
            </Button>
          </ButtonContainer>
        </Content>
      </Container>
      <MusicTable
        seleccionar={artista.name}
        handleSelectSong={handleSelectSong}
      />
    </div>
  );
};

export default ArtistasDetails;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start; /* Alinea los botones a la izquierda */
  margin-bottom: 20px;
  gap: 20px;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "20vh",
  padding: "200px",
  gap: "30px",
  paddingTop: "0px",
  marginTop: "2rem",
  "@media screen and (max-width: 768px)": {
    display: "flex",
    flexDirection: "column",
    padding: "0px",
    marginBottom: "0rem",
    height: "auto",
  },
}));

const Img = styled("img")(() => ({
  filter: "grayscale(40%)",
  width: "350px",
  height: "350px",
  borderRadius: "10px",
  "&:hover": {
    filter: "grayscale(0%)", // Al hacer hover, mostrar en color
  },
  "@media screen and (max-width: 768px)": {
    width: "20rem",
    height: "auto",
  },
}));
